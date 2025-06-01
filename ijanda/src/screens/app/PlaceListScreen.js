import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { placesByCategory } from '../../services/placeService';
import PlaceItem from '../../components/PlaceItem';
import { useFavorites } from '../../context/FavoriteContext';

export default function PlaceList({ route, navigation }) {
    const { category } = route.params;
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

    // Obtener ancho pantalla para calcular columnas y tamaño tarjeta
    const { width } = useWindowDimensions();
    const CONTAINER_PADDING = 20 * 2; // padding container horizontal * 2
    const CARD_MARGIN = 10; // margen entre tarjetas
    const MAX_CARD_WIDTH = 180;

    // Calcular columnas y tamaño tarjeta
    const numColumns = Math.floor((width - CONTAINER_PADDING) / (MAX_CARD_WIDTH + CARD_MARGIN * 2)) || 1;
    const CARD_WIDTH = (width - CONTAINER_PADDING - CARD_MARGIN * 2 * numColumns) / numColumns;

    useEffect(() => {
        setLoading(true);
        placesByCategory(category.toLowerCase())
            .then(data => setPlaces(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [category]);

    const handlePlacePress = (placeId) => {
        navigation.navigate('PlaceScreen', { placeId });
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category}</Text>

            <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                columnWrapperStyle={numColumns > 1 ? { justifyContent: 'flex-start' } : undefined}
                renderItem={({ item }) => (
                    <PlaceItem
                        place={item}
                        onPress={handlePlacePress}
                        isFavoriteProp={favoriteIds.includes(item.id)}
                        onToggleFavorite={() => {
                            if (favoriteIds.includes(item.id)) {
                                removeFavorite(item.id);
                            } else {
                                addFavorite(item.id);
                            }
                        }}
                        cardSize={CARD_WIDTH}
                        margin={CARD_MARGIN}
                    />
                )}
                key={numColumns} // para forzar render al cambiar columnas
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 30, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, paddingHorizontal: 20 },
});

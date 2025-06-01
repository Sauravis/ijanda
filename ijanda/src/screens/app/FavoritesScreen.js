import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import PlaceItem from '../../components/PlaceItem';
import { useFavorites } from '../../context/FavoriteContext';
import { placesByIds } from '../../services/placeService';

const FavoritesScreen = ({ navigation }) => {
    const { favoriteIds, loading: loadingFavorites, removeFavoriteById } = useFavorites();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();
    const CONTAINER_PADDING = 20 * 2; // padding horizontal de container * 2
    const CARD_MARGIN = 10; // margen alrededor de cada tarjeta
    const MAX_CARD_WIDTH = 180;

    // Calcular columnas y tamaño tarjeta
    const numColumns = Math.floor((width - CONTAINER_PADDING) / (MAX_CARD_WIDTH + CARD_MARGIN * 2)) || 1;
    const cardSize = (width - CONTAINER_PADDING - CARD_MARGIN * 2 * numColumns) / numColumns;
    const CARD_WIDTH = (width - CONTAINER_PADDING - CARD_MARGIN * 2 * numColumns) / numColumns;

    useEffect(() => {
        const loadFavoritePlaces = async () => {
            setLoading(true);
            try {
                if (favoriteIds.length === 0) {
                    setPlaces([]);
                } else {
                    const data = await placesByIds(favoriteIds);
                    setPlaces(data);
                }
            } catch (error) {
                console.error('Error cargando lugares favoritos:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavoritePlaces();
    }, [favoriteIds]);

    const handlePlacePress = (placeId) => {
        navigation.navigate('PlaceScreen', { placeId });
    };

    const handleRemoveFavorite = async (placeId) => {
        const success = await removeFavoriteById(placeId);
        if (!success) {
            console.error('Error quitando favorito');
        }
    };

    if (loadingFavorites || loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    if (places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Favoritos</Text>
                <Text style={styles.emptyText}>No hay lugares guardados.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                    <PlaceItem
                        place={item}
                        onPress={handlePlacePress}
                        isFavoriteProp={true}
                        onRemoveFavorite={handleRemoveFavorite}
                        cardSize={CARD_WIDTH}
                        margin={CARD_MARGIN}
                    />
                )}
                key={numColumns}
                {...(numColumns > 1
                    ? { columnWrapperStyle: { justifyContent: 'flex-start', marginBottom: CARD_MARGIN * 2 } }
                    : {}
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 30, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, paddingHorizontal: 20 },
    emptyText: { textAlign: 'center', color: 'gray', marginTop: 50, fontSize: 16 },
});

export default FavoritesScreen;

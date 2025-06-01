import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { categories as getCategories } from '../services/placeService';

const iconMap = {
    Senderos: 'hiking',
    Playas: 'umbrella-beach',
    Monumentos: 'landmark',
    Gastronomía: 'utensils',
    Fiestas: 'music',
    Alojamiento: 'hotel',
};

const imageMap = {
    Senderos: require('../../assets/category/hiking.jpg'),
    Playas: require('../../assets/category/umbrella-beach.jpg'),
    Monumentos: require('../../assets/category/landmark.jpg'),
    Gastronomía: require('../../assets/category/utensils.jpg'),
    Fiestas: require('../../assets/category/music.jpg'),
    Alojamiento: require('../../assets/category/hotel.jpg'),
};

const CategoryGrid = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();
    const CARD_MARGIN = 8;
    const MAX_CARD_WIDTH = 180;
    const CONTAINER_PADDING = 40;

    const numColumns = Math.floor((width - CONTAINER_PADDING) / (MAX_CARD_WIDTH + CARD_MARGIN * 2)) || 1;
    const CARD_WIDTH = (width - CONTAINER_PADDING - CARD_MARGIN * 2 * numColumns) / numColumns;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                const mapped = data.map((item) => ({
                    ...item,
                    icon: iconMap[item.name] || 'question',
                    image: imageMap[item.name] || require('../../assets/placeholder.jpg'),
                }));
                setCategories(mapped);
            } catch (err) {
                console.error('Error cargando categorías:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    width: CARD_WIDTH,
                    height: CARD_WIDTH,
                    margin: CARD_MARGIN,
                },
            ]}
            onPress={() => onSelectCategory(item.name)}
        >
            <ImageBackground
                source={item.image}
                style={styles.image}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay}>
                    <FontAwesome5 name={item.icon} size={24} color="#fff" />
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.container}
            key={numColumns}
        />
    );
};

export default CategoryGrid;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#ccc',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    imageStyle: {
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { place } from '../../services/placeService';
import images from '../../../assets/imageMap';

export default function PlaceScreen({ route, navigation }) {
    const { placeId } = route.params;
    const [placeData, setPlaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const onChange = ({ window }) => {
            setScreenWidth(window.width);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            subscription?.remove();
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        place(placeId)
            .then(data => {
                // Normaliza el nombre de la imagen para el map
                const key = data.image.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
                data.imageRequire = images[key];
                setPlaceData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [placeId]);

    useLayoutEffect(() => {
        if (placeData && placeData.name) {
            navigation.setOptions({ title: placeData.name });
        }
    }, [navigation, placeData?.name]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    if (!placeData || Object.keys(placeData).length === 0) {
        return (
            <View style={styles.center}>
                <Text>Lugar no encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {placeData.image_url && (
                <Image
                    source={{ uri: placeData.image_url }}
                    style={[styles.image, { width: screenWidth * 0.5, height: screenWidth * 0.5 }]}
                />
            )}
            <Text style={styles.title}>{placeData.name}</Text>

            {placeData.imageRequire && (
                <Image
                    source={placeData.imageRequire}
                    style={[styles.image, { width: screenWidth * 0.5, height: screenWidth * 0.5 }]}
                />
            )}

            {placeData.category_name && (
                <View style={styles.metaRow}>
                    <FontAwesome5 name="tags" size={12} color="#888" />
                    <Text style={styles.metaText} numberOfLines={1}>
                        {placeData.category_name}
                    </Text>
                </View>
            )}

            {placeData.location && (
                <View style={styles.metaRow}>
                    <FontAwesome5 name="map-marker-alt" size={14} color="#666" />
                    <Text style={styles.metaText}>{placeData.location}</Text>
                </View>
            )}

            {placeData.description && (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Descripción</Text>
                    <Text style={styles.description}>{placeData.description}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 12,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    tag: {
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 12,
    },
    tagText: {
        fontSize: 14,
        color: '#444',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    metaText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 6,
    },
    descriptionContainer: {
        marginTop: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#444',
    },
});

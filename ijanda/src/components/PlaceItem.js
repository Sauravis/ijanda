import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoriteContext';

const PlaceItem = ({ place, onPress, onRemoveFavorite, cardSize, margin }) => {
    const { favoriteIds, addFavorite, removeFavoriteById } = useFavorites();
    const [loading, setLoading] = useState(false);

    const isFav = favoriteIds.includes(place.id);

    const toggleFavorite = async () => {
        if (loading) return;

        setLoading(true);
        try {
            if (isFav) {
                const success = await removeFavoriteById(place.id);
                if (!success) {
                    Alert.alert('Error', 'No se pudo eliminar de favoritos.');
                } else if (onRemoveFavorite) {
                    onRemoveFavorite(place.id);
                }
            } else {
                const success = await addFavorite(place.id);
                if (!success) {
                    Alert.alert('Error', 'No se pudo añadir a favoritos.');
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un problema al actualizar favoritos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, { width: cardSize, height: cardSize, margin }]}
            onPress={() => onPress(place.id)}
            activeOpacity={0.85}
        >
            <View style={styles.topRow}>
                <Text style={styles.name} numberOfLines={2}>
                    {place.name}
                </Text>
                <TouchableOpacity onPress={toggleFavorite} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" />
                    ) : (
                        <FontAwesome
                            name={isFav ? 'heart' : 'heart-o'}
                            size={20}
                            color={isFav ? '#e63946' : '#bbb'}
                        />
                    )}
                </TouchableOpacity>
            </View>

            {place.category_name ? (
                <View style={styles.infoRow}>
                    <FontAwesome5 name="tags" size={12} color="#888" />
                    <Text style={styles.metaText} numberOfLines={1}>
                        {place.category_name}
                    </Text>
                </View>
            ) : null}

            <View style={styles.infoRow}>
                <FontAwesome5 name="map-marker-alt" size={12} color="#888" />
                <Text
                    style={styles.metaText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {place.location}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PlaceItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 10,
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        flex: 1,
        marginRight: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    metaText: {
        marginLeft: 5,
        fontSize: 12,
        color: '#666',
        flexShrink: 1,
    },
});

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritePlaces, addFavorites, removeFavorite } from '../services/placeService';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserAndFavorites = async () => {
            try {
                setLoading(true);
                const userData = await AsyncStorage.getItem('user');
                if (!userData) return;
                const user = JSON.parse(userData);
                setUserId(user.id);

                const favData = await favoritePlaces(user.id);
                setFavoriteIds(favData.map(p => p.id));
            } catch (error) {
                console.error('Error cargando favoritos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserAndFavorites();
    }, []);

    const addFavorite = async (placeId) => {
        if (!userId) return false;
        const resp = await addFavorites(userId, placeId);
        if (resp.success) {
            setFavoriteIds(prev => [...prev, placeId]);
            return true;
        }
        return false;
    };

    const removeFavoriteById = async (placeId) => {
        if (!userId) return false;
        const resp = await removeFavorite(userId, placeId);
        if (resp.success) {
            setFavoriteIds(prev => prev.filter(id => id !== placeId));
            return true;
        }
        return false;
    };

    return (
        <FavoritesContext.Provider value={{ favoriteIds, loading, addFavorite, removeFavoriteById }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
    }
    return context;
}

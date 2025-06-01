import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/Home';
import AuthScreen from './src/screens/AuthScreen';
import Welcome from './src/screens/Welcome';
import PlaceListScreen from './src/screens/app/PlaceListScreen';
import PlaceScreen from './src/screens/app/PlaceScreen';
import FavoritesScreen from './src/screens/app/FavoritesScreen';
import EventsScreen from './src/screens/app/EventsScreen';
import { FavoritesProvider } from './src/context/FavoriteContext';


const Stack = createNativeStackNavigator();

function AuthStack({ setIsLoggedIn }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: true, title: 'Inicio' }}
            />
            <Stack.Screen
                name="Auth"
                options={{ headerShown: true, title: 'Autenticación' }}
            >
                {props => <AuthScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function AppStack({ setIsLoggedIn }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                options={{ headerShown: false }}
            >
                {props => <Welcome {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
                name="PlaceListScreen"
                options={{ headerShown: true, title: 'Lugares' }}
                component={PlaceListScreen}
            />
            <Stack.Screen
                name="PlaceScreen"
                options={{ headerShown: true, title: '' }}
                component={PlaceScreen}
            />
            <Stack.Screen
                name="FavoritesScreen"
                options={{ headerShown: true, title: 'Favoritos' }}
                component={FavoritesScreen}
            />
            <Stack.Screen
                name="EventsScreen"
                options={{ headerShown: true, title: 'Eventos' }}
                component={EventsScreen}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            setIsLoggedIn(!!user);
        });
    }, []);

    if (isLoggedIn === null) return null;

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <FavoritesProvider>
                    <AppStack setIsLoggedIn={setIsLoggedIn} />
                </FavoritesProvider>
            ) : (
                <AuthStack setIsLoggedIn={setIsLoggedIn} />
            )}
        </NavigationContainer>
    );
}

import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Layout from './Layout';

const iconMap = {
    Senderos: 'hiking',
    Playas: 'umbrella-beach',
    Monumentos: 'landmark',
    Gastronomía: 'utensils',
    Fiestas: 'music',
    Alojamiento: 'hotel',
};

export default function Home() {
    const navigation = useNavigation();

    return (
        <Layout>
            <View style={styles.container}>
                {/* Logo */}
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Título */}
                <Text style={styles.title}>iJanda</Text>

                {/* Iconos debajo del título */}
                <View style={styles.iconRow}>
                    {Object.entries(iconMap).map(([label, icon]) => (
                        <View style={styles.iconItem} key={label}>
                            <FontAwesome5 name={icon} size={24} color="#4CAF50" />
                        </View>
                    ))}
                </View>

                {/* Subtítulo */}
                <Text style={styles.subtitle}>Vive La Janda.</Text>

                {/* Texto descriptivo */}
                <Text style={styles.description}>Explora. Descubre. Disfruta.</Text>

                {/* Botón */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50, // mitad del width/height
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4CAF50', // opcional para decorar el borde
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#777',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconItem: {
        alignItems: 'center',
        marginHorizontal: 3, // más espacio entre iconos
    },
});

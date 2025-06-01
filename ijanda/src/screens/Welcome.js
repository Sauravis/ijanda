import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import CategoryGrid from '../components/CategoryGrid';
import { FontAwesome5 } from "@expo/vector-icons";

export default function Welcome({ setIsLoggedIn, navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        console.error('Error loading user:', e);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleCategorySelect = (categoryName) => {
    navigation.navigate('PlaceListScreen', { category: categoryName });
  };

  const header = (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        <FontAwesome5 name="umbrella-beach" size={24} color="orange" /> ¡Bienvenido a iJanda!{' '}
        <FontAwesome5 name="umbrella-beach" size={24} color="orange" />
      </Text>

      <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
        <View style={styles.headerButtonContent}>
          <FontAwesome5
            name={'sign-out-alt'}
            size={16}
            color="#FFFFF0"
          />
          <Text style={styles.headerButtonText}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const footer = (
    <Text style={styles.footerText}>© 2025 iJanda. Todos los derechos reservados.</Text>
  );

  return (
    <Layout header={header} footer={footer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Hola, {user?.username} 👋</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => goTo('FavoritesScreen')}>
            <FontAwesome5 name="heart" size={28} color="#fff" />
            <Text style={styles.iconButtonText}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => goTo('EventsScreen')}>
            <FontAwesome5 name="calendar-alt" size={28} color="#fff" />
            <Text style={styles.iconButtonText}>Eventos</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
            Elige una categoría
          </Text>
          <CategoryGrid onSelectCategory={handleCategorySelect} />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 130,
    elevation: 4, // para sombra en Android
    shadowColor: "#000", // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconButtonText: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  headerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});

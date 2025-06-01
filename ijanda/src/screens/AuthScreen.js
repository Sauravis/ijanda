import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Layout from './Layout';
import { login, register } from '../services/authService';

export default function AuthScreen({ navigation, setIsLoggedIn }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' o 'error'

    // Limpiar campos y mensajes solo al cambiar manualmente entre login/register
    useEffect(() => {
        setUserName('');
        setEmail('');
        setPassword('');
        setErrors({});
        setMessage('');
        setMessageType('');
    }, [isLogin]);

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'El correo es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Correo inválido';

        if (!password) newErrors.password = 'La contraseña es obligatoria';
        else if (password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

        if (!isLogin) {
            if (!username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
            else if (username.length < 3) newErrors.username = 'Nombre muy corto';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setMessage('');
        setMessageType('');

        try {
            if (isLogin) {
                const userData = await login(email, password);
                if (userData.success) {
                    setIsLoggedIn(true);
                    await AsyncStorage.setItem('user', JSON.stringify(userData.user));
                    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
                } else {
                    setMessage('Correo o contraseña incorrectos');
                    setMessageType('error');
                }
            } else {
                const newUser = await register(username, email, password);
                if (newUser.success) {
                    setMessage('Registro exitoso. Ahora inicia sesión');
                    setMessageType('success');
                    // No cambiamos isLogin ni limpiamos campos aquí para que usuario pueda revisar mensaje
                } else {
                    setMessage(newUser.message || 'Error al registrar usuario');
                    setMessageType('error');
                }
            }
        } catch (error) {
            setMessage('Error en autenticación: ' + error.message);
            setMessageType('error');
        }
    };

    return (
        <Layout>
            <View style={styles.container}>
                <FontAwesome5
                    name={isLogin ? 'user' : 'user-plus'}
                    size={50}
                    color="#4CAF50"
                    style={styles.iconTop}
                />
                <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</Text>

                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <FontAwesome5 name="user" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={setUserName}
                        />
                    </View>
                )}
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <View style={styles.inputContainer}>
                    <FontAwesome5 name="envelope" size={18} color="#999" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <View style={styles.inputContainer}>
                    <FontAwesome5 name="lock" size={18} color="#999" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {!!message && (
                    <Text style={messageType === 'success' ? styles.messageSuccess : styles.messageError}>
                        {message}
                    </Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <FontAwesome5
                        name={isLogin ? 'sign-in-alt' : 'user-plus'}
                        size={18}
                        color="#fff"
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Registrarse'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.toggleContainer} onPress={() => setIsLogin(!isLogin)}>
                    <FontAwesome5
                        name={isLogin ? 'user-plus' : 'sign-in-alt'}
                        size={16}
                        color="#4CAF50"
                        style={styles.toggleIcon}
                    />
                    <Text style={styles.toggle}>
                        {isLogin ? '¿No tienes cuenta? Crea una' : '¿Ya tienes cuenta? Inicia sesión'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    iconTop: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 45,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        marginLeft: 12,
    },
    messageSuccess: {
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
    },
    messageError: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonIcon: {
        marginRight: 8,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    toggleIcon: {
        marginRight: 6,
    },
    toggle: {
        color: '#4CAF50',
        fontSize: 14,
    },
});

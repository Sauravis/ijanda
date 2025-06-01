// src/services/authService.js

export async function login(email, password) {
    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Error en el login');

        return await response.json(); // datos del usuario o token
    } catch (error) {
        throw error;
    }
}

export async function register(username, email, password) {
    try {
        console.log(JSON.stringify({ username, email, password }));
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) throw new Error('Error al registrarse');

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function categories() {
    try {
        const response = await fetch('http://localhost:8000/categories', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error en el login');

        return await response.json(); // datos del usuario o token
    } catch (error) {
        throw error;
    }
}

export async function placesByCategory(name) {
    try {
        const response = await fetch(`http://localhost:8000/places?name=${encodeURIComponent(name)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al obtener lugares');

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function place(id) {
    try {
        const response = await fetch(`http://localhost:8000/place?id=${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al obtener lugares');

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function favoritePlaces(id) {
    try {
        const response = await fetch(`http://localhost:8000/favorites?id=${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al obtener lugares');

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function addFavorites(user_id, place_id) {
    try {
        const response = await fetch(`http://localhost:8000/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, place_id }),
        });

        if (!response.ok) throw new Error('Error al obtener lugares');

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Verifica si un lugar ya está en favoritos
export async function isFavorite(user_id, place_id) {
    try {
        const response = await fetch(`http://localhost:8000/favorites/check?user_id=${user_id}&place_id=${place_id}`);
        if (!response.ok) throw new Error('Error comprobando favorito');
        return await response.json(); // { is_favorite: true/false }
    } catch (error) {
        throw error;
    }
}

// Elimina un lugar de favoritos
export async function removeFavorite(user_id, place_id) {
    try {
        const response = await fetch(`http://localhost:8000/favorites`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, place_id }),
        });
        if (!response.ok) throw new Error('Error eliminando favorito');
        return await response.json(); // { success: true }
    } catch (error) {
        throw error;
    }
}

export async function placesByIds(ids) {
    const response = await fetch('http://localhost:8000/places/by-ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
        throw new Error('Error cargando lugares');
    }

    return await response.json();
}

export async function eventPlaces(date) {
    try {
        const url = date
            ? `http://localhost:8000/events?date=${encodeURIComponent(date)}`
            : 'http://localhost:8000/events';

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al obtener eventos');

        return await response.json();
    } catch (error) {
        throw error;
    }
}


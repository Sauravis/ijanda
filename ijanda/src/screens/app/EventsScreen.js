import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { eventPlaces } from '../../services/placeService';

const EventScreen = () => {
    const [selected, setSelected] = useState(null);
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowDimensions();

    useEffect(() => {
        eventPlaces()
            .then(data => setAllEvents(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (selected) {
            setLoading(true);
            eventPlaces(selected)
                .then(data => {
                    setEvents(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setEvents([]);
                    setLoading(false);
                });
        } else {
            setEvents([]);
        }
    }, [selected]);

    const markedDates = {};
    allEvents.forEach(event => {
        markedDates[event.date] = { marked: true, dotColor: 'blue' };
    });

    if (selected) {
        markedDates[selected] = {
            ...(markedDates[selected] || {}),
            selected: true,
            selectedColor: 'orange',
        };
    }

    // Definir tamaño de las tarjetas según el ancho
    const getCardWidth = () => {
        if (width > 1200) return (width - 64) / 4 - 8; // 4 tarjetas + márgenes
        if (width > 900) return (width - 48) / 3 - 8;  // 3 tarjetas
        if (width > 600) return (width - 32) / 2 - 8;  // 2 tarjetas
        return width - 32;                            // 1 tarjeta en móvil
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={day => setSelected(day.dateString)}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: 'orange',
                    todayTextColor: 'red',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'black',
                }}
            />

            {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

            {!loading && selected && (
                <View style={styles.eventDetails}>
                    <Text style={styles.title}>Eventos para {selected}:</Text>
                    {events.length === 0 ? (
                        <Text>No hay eventos para este día.</Text>
                    ) : (
                        <View style={styles.eventList}>
                            {events.map(event => (
                                <View
                                    key={event.id}
                                    style={[
                                        styles.eventItem,
                                        { width: getCardWidth() },
                                    ]}
                                >
                                    <Text style={styles.eventName}>{event.name}</Text>
                                    <Text>{event.description}</Text>
                                    <Text style={styles.placeName}>Lugar: {event.place_name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default EventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    eventDetails: {
        marginTop: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    eventList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    eventItem: {
        backgroundColor: '#e6e6e6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        marginHorizontal: 4, // control lateral
    },
    eventName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    placeName: {
        fontStyle: 'italic',
        marginTop: 4,
    },
});

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/customButton';
import CustomStatusBar from '../components/customStatusBar';

const apiUrl = 'https://stud.hosted.hr.nl/1041814/gamestores.json';

function HotspotsList({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [hotspots, setHotspots] = useState([]);
    const [isEnabled, setIsEnabled] = useState(isDarkMode);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setIsEnabled(isDarkMode);

        // Er wordt data gefetcht uit een JSON bestand die op de server van Hogeschool Rotterdam staat
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setHotspots(data))
            .catch(error => console.error(error));

        loadFavorites();
    }, [isDarkMode]);

    // Door op "View on Map" te klikken word je naar een specifieke locatie op de map gestuurd. De locatie is
    // afhankelijk van de knop van de hotspot waarop je hebt geklikt
    const navigateToStore = (item) => {
        navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude });
    };

    // Laad favorieten uit AsyncStorage
    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem('favorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Je kunt een item toevoegen aan je favorieten of juist een item verwijderen
    const toggleFavorite = async (item) => {
        let newFavorites;
        if (favorites.some(fav => fav.title === item.title)) {
            newFavorites = favorites.filter(fav => fav.title !== item.title);
        } else {
            newFavorites = [...favorites, item];
        }
        setFavorites(newFavorites);
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error(error);
        }
    };

    const isFavorite = (item) => {
        return favorites.some(fav => fav.title === item.title);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: isDarkMode ? '#111' : '#eee' }}>
            <CustomStatusBar />

            {/*Hier worden items aangemaakt. De naam en de beschrijving van de hotspot worden toegevoegd aan de lijst.*/}
            {/*Ook worden er per item twee knoppen toegevoegd: één knop voor het opslaan van favorieten en een andere*/}
            {/*knop om de specifieke locatie van de hotspot op de map te bekijken*/}
            <FlatList
                data={hotspots}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: isDarkMode ? '#222' : '#fff', marginBottom: 10, padding: 10 }}>
                        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>{item.description}</Text>
                        <View>
                            <CustomButton
                                title={isFavorite(item) ? "Remove from Favorites" : "Add as Favorite"}
                                onPress={() => toggleFavorite(item)}
                            />
                            <CustomButton
                                title="View on Map"
                                onPress={() => navigateToStore(item)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default HotspotsList;

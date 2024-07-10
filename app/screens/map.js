import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomStatusBar from '../components/customStatusBar';
import darkMapStyle from '../components/darkmodeMap';
import { ThemeContext } from '../themeContext';

function HotspotsScreen({ route, navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [isEnabled, setIsEnabled] = useState(isDarkMode);
    const [hotspots, setHotspots] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const apiUrl = 'https://stud.hosted.hr.nl/1041814/gamestores.json';

    useEffect(() => {
        setIsEnabled(isDarkMode);

        // Er wordt data gefetcht uit een JSON bestand die op de server van Hogeschool Rotterdam staat
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setHotspots(data))
            .catch(error => console.error(error));

        // Toestemming vragen om de locatie van de gebruiker te weten
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, [isDarkMode]);

    // De initial region van de gebruiker wordt ingesteld
    let initialRegion = null;
    if (route.params) {
        initialRegion = {
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        };
    } else if (location) {
        initialRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
        };
    }

    return (
        <View style={styles.container}>
            <CustomStatusBar />

            {initialRegion && (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initialRegion}
                    customMapStyle={isDarkMode ? darkMapStyle : []} // Bij dark mode zal de map donker worden
                >
                    {/*Per hotspot locatie komt een rode marker op de map te staan. Ook de gebruiker heeft
                    een marker, maar die is blauw*/}
                    {hotspots.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                    <Marker
                        coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                        title={route.params ? "Store Location" : "You are here"}
                        pinColor={route.params ? "red" : "blue"}
                    />
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default HotspotsScreen;

import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from '../components/customButton';
import CustomStatusBar from '../components/customStatusBar';
import { ThemeContext } from '../themeContext';

function HomeScreen({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [isEnabled, setIsEnabled] = useState(isDarkMode);

    useEffect(() => {
        setIsEnabled(isDarkMode);
    }, [isDarkMode]);

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#eee' }]}>
            <CustomStatusBar />

            <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
                Welcome to
            </Text>
            <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#333' : '#ddd' }]}>
                Gamestore Finder
            </Text>
            <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
                Discover game stores near you with our hotspot locator. Whether you're searching for the latest releases,
                retro classics, or gaming gear, we've got you covered.
            </Text>

            <CustomButton
                title="Go to Map"
                onPress={() => navigation.navigate('Map')}
            />
            <CustomButton
                title="List of Hotspots"
                onPress={() => navigation.navigate('List of Hotspots')}
            />
            <CustomButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
        fontStyle: "italic",
        width: '100%',
        padding: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        width: '90%',
        textAlign: 'center',
    },
});

export default HomeScreen;

import React, { useContext, useState, useEffect } from 'react';
import {Text, View, Switch, StatusBar, StyleSheet} from 'react-native';
import { ThemeContext } from '../themeContext';
import CustomButton from "../components/customButton";
import CustomStatusBar from '../components/customStatusBar';

function SettingsScreen({ navigation }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get theme and font size from context
    const [isEnabled, setIsEnabled] = useState(isDarkMode);

    useEffect(() => {
        setIsEnabled(isDarkMode);
    }, [isDarkMode]);

    // Dit zorgt ervoor dat dark mode in- en uitgeschakeld kan worden
    const handleToggleSwitch = () => {
        toggleTheme();
        setIsEnabled(!isEnabled);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#eee' }]}>
            <CustomStatusBar />
            <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>
                Change the layout
            </Text>

            {/*Deze code laat met tekst de huidige mode zien op het scherm*/}
            <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
                Current theme: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>

            <CustomButton
                title="Go Back"
                onPress={() => navigation.navigate('Home')}
            />

            {/*Deze code voegt een switch toe die ervoor zorgt dat je dark mode kan in- of uitschakelen*/}
            <Switch
                onValueChange={handleToggleSwitch}
                value={isEnabled}
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
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default SettingsScreen;

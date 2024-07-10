import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Haal opgeslagen dark mode voorkeur op uit AsychStorage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedDarkMode = await AsyncStorage.getItem('@dark_mode');
                if (savedDarkMode !== null) {
                    setIsDarkMode(JSON.parse(savedDarkMode));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadSettings();
    }, []);

    // Toggle functie om dark mode aan of uit te schakelen
    const toggleTheme = async () => {
        try {
            const newDarkMode = !isDarkMode;
            setIsDarkMode(newDarkMode);
            await AsyncStorage.setItem('@dark_mode', JSON.stringify(newDarkMode));
        } catch (e) {
            console.error(e);
        }
    };

    // Dark mode en de toggle functie worden teruggegeven. Nu kan dark mode geïmporteerd worden in andere bestanden
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

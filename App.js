import * as React from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import HomeScreen from './app/screens/home';
import HotspotsScreen from './app/screens/map';
import ListScreen from './app/screens/hotspotsList';
import SettingsScreen from './app/screens/settings';
import { ThemeProvider, ThemeContext } from './app/themeContext';

const Stack = createNativeStackNavigator();

function AppContent() {
    const { isDarkMode } = useContext(ThemeContext);

    // Header styling
    const headerStyle = {
        headerStyle: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
        headerTitleAlign: 'center',
    };

    return (
        <View style={{flex: 1}}>
            {/*De header styling wordt bij elke screen toegepast*/}
            <Stack.Navigator initialRouteName="Home" screenOptions={headerStyle}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Map"
                    component={HotspotsScreen}
                />
                <Stack.Screen
                    name="List of Hotspots"
                    component={ListScreen}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                />
            </Stack.Navigator>
        </View>
    );
}

function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;

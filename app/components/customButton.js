import React, {useContext} from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../themeContext';

// Deze code maakt een custom button aan die vaak opnieuw gebruikt kan worden
const CustomButton = ({ onPress, title }) => {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={[styles.buttonText, {color: isDarkMode ? '#fff' : '#000'}]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 2,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6495ed',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CustomButton;

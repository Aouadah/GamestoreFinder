import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from '../themeContext';

// Deze code zorgt ervoor dat ook de icons op de statusbar op je telefoon zich aanpast aan darkmode.
// Zonder deze code zouden de icons soms dezelfde kleur hebben als de achtergrond bij darkmode, waardoor
// ze wel onzichtbaar lijken
const CustomStatusBar = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [barStyle, setBarStyle] = useState('dark-content');
    const [backgroundColor, setBackgroundColor] = useState('#fff');

    useEffect(() => {
        setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
        setBackgroundColor(isDarkMode ? '#000' : '#fff');
    }, [isDarkMode]);

    return (
        <StatusBar
            barStyle={barStyle}
            backgroundColor={backgroundColor}
        />
    );
};

export default CustomStatusBar;

import React from 'react';
import { Svg, Circle } from 'react-native-svg';

interface LogoProps {
    color: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
    return (
        <Svg width="122" height="78" viewBox="0 0 122 78" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="32" cy="32" r="22" stroke={color} strokeWidth="8" />
            <Circle cx="32" cy="32" r="4.5" stroke={color} strokeWidth="3" />
            <Circle cx="14" cy="14" r="6" fill={color} />
            <Circle cx="6" cy="32" r="6" fill={color} />
            <Circle cx="14" cy="50" r="6" fill={color} />
            <Circle cx="32" cy="58" r="6" fill={color} />
            <Circle cx="50" cy="50" r="6" fill={color} />
            <Circle cx="58" cy="32" r="6" fill={color} />
            <Circle cx="50" cy="14" r="6" fill={color} />
            <Circle cx="32" cy="6" r="6" fill={color} />
            <Circle cx="90" cy="46" r="22" stroke={color} strokeWidth="8" />
            <Circle cx="90" cy="46" r="4.5" stroke={color} strokeWidth="3" />
            <Circle cx="72" cy="28" r="6" fill={color} />
            <Circle cx="64" cy="46" r="6" fill={color} />
            <Circle cx="72" cy="64" r="6" fill={color} />
            <Circle cx="90" cy="72" r="6" fill={color} />
            <Circle cx="108" cy="64" r="6" fill={color} />
            <Circle cx="116" cy="46" r="6" fill={color} />
            <Circle cx="108" cy="28" r="6" fill={color} />
            <Circle cx="90" cy="20" r="6" fill={color} />
        </Svg>
    );
};

export default Logo;
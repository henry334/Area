import React from 'react';

interface LogoProps {
    color: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="22" stroke={color} strokeWidth="8" />
            <circle cx="32" cy="32" r="4.5" stroke={color} strokeWidth="3" />
            <circle cx="14" cy="14" r="6" fill={color} />
            <circle cx="6" cy="32" r="6" fill={color} />
            <circle cx="14" cy="50" r="6" fill={color} />
            <circle cx="32" cy="58" r="6" fill={color} />
            <circle cx="50" cy="50" r="6" fill={color} />
            <circle cx="58" cy="32" r="6" fill={color} />
            <circle cx="50" cy="14" r="6" fill={color} />
            <circle cx="32" cy="6" r="6" fill={color} />
            <circle cx="90" cy="46" r="22" stroke={color} strokeWidth="8" />
            <circle cx="90" cy="46" r="4.5" stroke={color} strokeWidth="3" />
            <circle cx="72" cy="28" r="6" fill={color} />
            <circle cx="64" cy="46" r="6" fill={color} />
            <circle cx="72" cy="64" r="6" fill={color} />
            <circle cx="90" cy="72" r="6" fill={color} />
            <circle cx="108" cy="64" r="6" fill={color} />
            <circle cx="116" cy="46" r="6" fill={color} />
            <circle cx="108" cy="28" r="6" fill={color} />
            <circle cx="90" cy="20" r="6" fill={color} />
        </svg>
    );
};

export default Logo;

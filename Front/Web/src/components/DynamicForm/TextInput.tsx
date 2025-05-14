import React from 'react';

type TextInputProps = {
    return: string;
    placeholder: string;
    updateData: (key: string, value: any) => void;
};

const TextInput: React.FC<TextInputProps> = ({ return: returnKey, placeholder, updateData }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        updateData(returnKey, value);
    };

    return (
        <input
            className="p-2 my-2 rounded-lg shadow-inner"
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default TextInput;

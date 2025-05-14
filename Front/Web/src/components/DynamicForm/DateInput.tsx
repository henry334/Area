import React from 'react';

type DateInputProps = {
    return: string;
    placeholder: string;
    updateData: (key: string, value: any) => void;
};

const DateInput: React.FC<DateInputProps> = ({ return: returnKey, placeholder, updateData }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        updateData(returnKey, value);
    };

    return (
        <input
            className="p-2 my-2 rounded-lg shadow-inner"
            type="date"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default DateInput;

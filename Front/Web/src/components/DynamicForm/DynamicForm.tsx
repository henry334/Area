import React, { useState, useEffect } from 'react';
import DropdownInput from './Dropdown';
import TextInput from './TextInput';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import { Input } from '@/Utils/types';

type FormProps = {
    inputJson: Input[];
    setData: (data: any) => void;
};

const DynamicForm: React.FC<FormProps> = ({ inputJson = [], setData }) => {
    const [formData, setFormData] = useState({});

    const updateData = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        setData(formData);
        console.log(formData)
        console.log(inputJson)
    }, [formData]);

    return (
        <form className='text-black flex flex-col'>
            {inputJson.map((input, index) => {
                if (input.dropdown) {
                    return (
                        <DropdownInput
                            key={index}
                            {...input.dropdown}
                            updateData={updateData}
                        />
                    );
                } else if (input.text) {
                    return (
                        <TextInput
                            key={index}
                            {...input.text}
                            updateData={updateData}
                        />
                    );
                } else if (input.date) {
                    return (
                        <DateInput
                            key={index}
                            {...input.date}
                            updateData={updateData}
                        />
                    );
                } else if (input.time) {
                    return (
                        <TimeInput
                            key={index}
                            {...input.time}
                            updateData={updateData}
                        />
                    );
                }
            })}
        </form>
    );
};

export default DynamicForm;

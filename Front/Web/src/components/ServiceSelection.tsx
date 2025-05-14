import React, { useState, useEffect } from 'react';
import { useBearerFetch } from '../Utils/bearerFetch';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Service } from '@/Utils/types';

type ServiceSelectionProps = {
    services: Service[];
    selectedService: Service | null;
    onBack: () => void;
    onClose: () => void;
    onServiceClick: (service: Service) => void;
    onSelectPart: (part: any) => void;
    partType: string;
};

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
    services,
    selectedService,
    onBack,
    onClose,
    onServiceClick,
    onSelectPart,
    partType,
}) => {
    const [parts, setParts] = useState<any[]>([]);
    const buttonTextColor = selectedService ? 'text-white' : 'text-black';

    const bearerFetch = useBearerFetch();

    const handleServiceClick = (service: Service) => {
        if (service.oauth2url) {
            window.open(service.oauth2url, '_blank');
        }
        onServiceClick(service);
    }

    useEffect(() => {
        if (selectedService) {
            bearerFetch(`/actrig/get${partType}s/${selectedService.name}`)
                .then(res => res.json())
                .then(data => {
                    setParts(data);
                })
                .catch(error => {
                    console.error("Error fetching parts:", error);
                });
        }
    }, [selectedService, bearerFetch]);

    return (
        <div className="relative ml-16 w-2/12 p-4 rounded-lg shadow-md text-black" style={{ backgroundColor: selectedService?.color || 'white' }}>
            <div className="flex justify-between">
                {selectedService && (
                    <button onClick={onBack} className={`${buttonTextColor} hover:text-neutral-500`}>
                        <ArrowUturnLeftIcon className="h-6 w-6" />
                    </button>
                )}
            </div>
            <button onClick={onClose} className={`${buttonTextColor} hover:text-neutral-500 absolute top-4 right-4`}>
                <XMarkIcon className="h-6 w-6" />
            </button>
            {selectedService ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4 mt-2 text-white">{partType} for {selectedService.name}</h2>
                    <ul className="space-y-2">
                        {parts.map((part, index) => (
                            <li
                                key={index}
                                onClick={() => onSelectPart(part)}
                                className={`p-2 bg-white rounded hover:bg-neutral-100 cursor-pointer`}
                            >
                                {part.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4 mt-2">Select a Service</h2>
                    <ul className="space-y-2">
                        {services.map((service, index) => (
                            <li
                                key={index}
                                onClick={() => handleServiceClick(service)}
                                className="p-2 rounded cursor-pointer text-white font-semibold text-center"
                                style={{ backgroundColor: service.color }}>
                                {service.name}
                            </li>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ServiceSelection;

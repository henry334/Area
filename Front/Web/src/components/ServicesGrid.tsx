import React, { useState, useEffect } from 'react';
import { useBearerFetch } from '@/Utils/bearerFetch';
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';
import hoverColor from '@/Utils/hoverColor';

type Service = {
    name: string;
    logo: string;
    color: string;
    description: string;
    parts?: string[];
};

type ServicesGridProps = {
    onServiceClick?: (service: Service) => void;
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceClick }) => {
    const [services, setServices] = useState<Service[]>([]);
    const bearerFetch = useBearerFetch();
    const router = useRouter();

    useEffect(() => {
        const apiUrl = '/actrig/getservices';

        bearerFetch(apiUrl)
            .then((response) => response.json())
            .then((data: Service[]) => {
                setServices(data);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, []);

    const handleServiceClick = (service: Service) => {
        if (onServiceClick) {
            onServiceClick(service);
        } else {
            const href = {
                pathname: `/service/${service.name}`,
                query: { service: JSON.stringify(service) },
            };
            router.push(href);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <SearchBar onSearch={() => { }} />
            <div className="grid grid-cols-4 gap-4 p-4 w-full">
                {services.map((service, index) => (
                    <div
                        key={index}
                        onClick={() => handleServiceClick(service)}
                        className={`item p-4 rounded-xl text-white justify-center items-center flex flex-col font-bold cursor-pointer h-32 w-32 text-xl`}
                        style={{
                            backgroundColor: service.color,
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={() => {
                            const items = document.getElementsByClassName('item');
                            items[index].style.backgroundColor = hoverColor(service.color);
                        }}
                        onMouseLeave={() => {
                            const items = document.getElementsByClassName('item');
                            items[index].style.backgroundColor = service.color;
                        }}
                    >
                        <div className="h-8 w-8">
                            <img src={service.logo} alt={`${service.name} logo`} className="mx-auto" />
                        </div>
                        <div>{service.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesGrid;

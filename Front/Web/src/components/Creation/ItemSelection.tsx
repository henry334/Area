import React, { useEffect, useState } from 'react';
import { useBearerFetch } from '@/Utils/bearerFetch';
import { Service } from '@/Utils/types';
import hoverColor from '@/Utils/hoverColor';

type ItemSelectionProps = {
    service: Service;
    dataType: 'triggers' | 'actions' | null;
    onItemSelect: (item: any) => void;
};

type DataItem = {
    id: string;
    name: string;
    description: string;
};

const ItemSelection: React.FC<ItemSelectionProps> = ({ service, dataType, onItemSelect }) => {
    const bearerFetch = useBearerFetch();
    const [data, setData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const handleConnect = (service: Service) => {
        if (service.oauth2url) {
            window.open(service.oauth2url, '_blank');
        }
    }

    useEffect(() => {
        setData([]);
        const endpoint = `/actrig/get${dataType}/${service.name}`;

        bearerFetch(endpoint)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error(`Error fetching ${dataType}:`, error));
    }, [dataType, service]);

    return (
        <div className='w-60 p-4 rounded-lg text-center justify-center items-center m-10'>
            <section className='mb-8 text-black'>
                <h2 className="text-xl font-bold mb-4">{service.name} {dataType}</h2>
                {data.map((item: DataItem, index) => (
                    <div
                        key={item.id}
                        className="item p-4 bg-gray-100 rounded-lg shadow-inner cursor-pointer text-white my-2"
                        onClick={() => onItemSelect(item)}
                        style={{
                            backgroundColor: hoverIndex === index ? hoverColor(service.color) : service.color,
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <p className="font-semibold text-xl">{item.name}</p>
                        <p className="">{item.description}</p>
                    </div>
                ))}
            </section>
            <a href="#" onClick={() => handleConnect(service)} className='underline text-black'>
                Connect to {service.name}
            </a>
        </div>
    );
};

export default ItemSelection;

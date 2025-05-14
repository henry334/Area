import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';

const ServiceDetail = () => {
    const router = useRouter();
    const bearerFetch = useBearerFetch();
    const [triggers, setTriggers] = useState([]);
    const [actions, setActions] = useState([]);

    useEffect(() => {
        if (router.query.service) {
            const service = JSON.parse(router.query.service as string);
            const triggersEndpoint = `/actrig/gettriggers/${service.name}`;
            const actionsEndpoint = `/actrig/getactions/${service.name}`;

            bearerFetch(triggersEndpoint)
                .then(res => res.json())
                .then(data => setTriggers(data))
                .catch(error => console.error('Error fetching triggers:', error));

            bearerFetch(actionsEndpoint)
                .then(res => res.json())
                .then(data => setActions(data))
                .catch(error => console.error('Error fetching actions:', error));
        }
    }, [router.query.service]);

    if (!router.query.service) {
        return <div></div>;
    }
    const service = JSON.parse(router.query.service as string);

    return (
        <div className='bg-white h-max'>
            <div className='h-screen'>
                <Navbar />
                <div className='flex flex-col justify-center items-center h-3/4' style={{ backgroundColor: service.color }}>
                    <div className='flex flex-col justify-center items-center h-3/4'>
                        <div className="h-20 w-20">
                            <img src={service.logo} alt={`${service.name} logo`} className="mx-auto" />
                        </div>
                        <h1 className="text-white font-bold text-7xl mt-5">{service?.name}</h1>
                        <p className="text-white mt-4 text-xl text-center break-normal w-1/4">{service?.description}</p>
                    </div>
                    <button className="bg-white text-black rounded-full px-4 py-2 hover:bg-neutral-100 transition-colors duration-300 ease-in-out"
                        onClick={() => window.open(service.oauth2url, '_blank')}>
                        Connect
                    </button>
                </div>
            </div>
            <div className='w-full bg-white pb-40 text-center flex justify-evenly'>
                <section className='w-1/4'>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Triggers</h2>
                    {triggers.map(trigger => (
                        <div key={trigger.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-lg" style={{ backgroundColor: service.color }}>
                            <p className="font-semibold text-white text-xl">{trigger.name}</p>
                            <p className="text-white">{trigger.description}</p>
                        </div>
                    ))}
                </section>
                <section className='w-1/4'>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Actions</h2>
                    {actions.map(action => (
                        <div key={action.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-lg " style={{ backgroundColor: service.color }}>
                            <p className="font-semibold text-white text-xl">{action.name}</p>
                            <p className="text-white">{action.description}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div >
    );
};

export default ServiceDetail;

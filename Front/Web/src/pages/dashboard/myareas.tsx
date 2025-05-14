import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';

type Area = {
    id: string;
    name: string;
    userId: string;
    triggerId: string;
    triggerData: { [key: string]: string };
    actionId: string;
    actionData: { [key: string]: string };
    triggerName: string;
    actionName: string;
    triggerColor: string;
    actionColor: string;
};

export default function MyAreas() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, content: null });
    const bearerFetch = useBearerFetch();

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchServiceColor = async (serviceId) => {
        const apiUrl = `/actrig/getservices/${serviceId}`;
        try {
            const response = await bearerFetch(apiUrl);
            const data = await response.json();
            return data.color;
        } catch (error) {
            console.error("Error fetching service color:", error);
            return null;
        }
    };

    const fetchAreas = async () => {
        const apiUrl = '/task/mytasks';

        try {
            const response = await bearerFetch(apiUrl);
            const areasData = await response.json();
            const areasWithColors = await Promise.all(areasData.map(async (area) => {
                const triggerColor = await fetchServiceColor(area.triggerId);
                const actionColor = await fetchServiceColor(area.actionId);
                return { ...area, triggerColor, actionColor };
            }));
            setAreas(areasWithColors);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };

    const deleteArea = (id: string) => {
        const apiUrl = `/task/delete/${id}`;
        bearerFetch(apiUrl, { method: 'DELETE' })
            .then(() => {
                fetchAreas();
            })
            .catch(error => {
                console.error("Error deleting area:", error);
            });
    };

    const handleMouseMove = (e, content) => {
        setTooltip({
            x: e.pageX,
            y: e.pageY,
            visible: true,
            content: content
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    return (
        <div className='bg-gray-100 min-h-screen text-white'>
            <Navbar />
            <h1 className='text-5xl font-bold mt-8 mb-6 text-center text-black'>My Areas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {areas.map(area => (
                    <div key={area.id} className="bg-white border p-4 m-2 rounded-xl shadow-lg flex-col flex">
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-semibold mb-2 w-full text-black text-center">{area.name}</h2>
                            <button onClick={() => deleteArea(area.id)} className="mb-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out">Delete</button>
                        </div>
                        <div
                            className='group relative mb-2'
                            onMouseMove={e => handleMouseMove(e, area.triggerData)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className='bg-cyan-500 p-5 rounded-xl' style={{ backgroundColor: area.triggerColor }}>
                                <p className="text-2xl text-center"><strong>{area.triggerName}</strong> </p>
                            </div>

                        </div>
                        <div
                            className='group relative'
                            onMouseMove={e => handleMouseMove(e, area.actionData)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className='bg-blue-500 p-5 rounded-xl' style={{ backgroundColor: area.actionColor }}>
                                <p className="text-2xl text-center"><strong>{area.actionName}</strong> </p>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
            {tooltip.visible && (
                <div
                    className="fixed bg-white p-3 rounded-lg shadow-lg z-50"
                    style={{ top: tooltip.y, left: tooltip.x, transform: 'translate(+10%, +10%)' }}
                >
                    {Object.entries(tooltip.content).map(([key, value], idx) => (
                        <div key={idx} className="text-center text-black">
                            <p><strong>{key}:</strong> {value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

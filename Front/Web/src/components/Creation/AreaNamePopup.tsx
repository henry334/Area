import React, { useState } from 'react';

const AreaNamePopup = ({ onConfirm, onCancel, areaName, setAreaName }) => {

    return (
        <div className="popup fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4 text-black">Enter Area Name</h2>
                <input
                    type="text"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg px-4 py-2 w-3/4 mb-6 text-center text-black"
                    placeholder="Area Name"
                />
                <div className="flex justify-around">
                    <button
                        onClick={() => onConfirm(areaName)}
                        className="bg-neutral-700 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-neutral-500 text-white px-6 py-2 rounded-full hover:bg-neutral-600 transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AreaNamePopup;

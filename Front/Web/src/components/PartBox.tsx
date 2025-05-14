import React from 'react';

type PartBoxProps = {
    color: string;
    title: string;
    selectedPart: any;
    placeHolder: string;
    onButtonClick: () => void;
};

const PartBox: React.FC<PartBoxProps> = ({
    color,
    title,
    selectedPart,
    placeHolder,
    onButtonClick,
}) => {
    return (
        <div className={`${color} w-96 flex flex-col items-center justify-center text-white text-3xl font-bold rounded-3xl p-10`}>
            <p className='mt-5 text-5xl font-extrabold'>{title}</p>
            <button onClick={onButtonClick} className="mt-4 bg-white text-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-100 font-bold">
                {selectedPart?.name || placeHolder}
            </button>
        </div>
    );
};

export default PartBox;

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className="flex border-2 border-black p-3 rounded-full w-12/12 mb-10 bg-white text-black">
            <MagnifyingGlassIcon className="h-6 w-6 mr-6" />
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="flex-grow bg-white placeholder:text-black outline-none"
                placeholder="Search..."
                style={{ padding: '0px' }}
            />
        </div >
    );
};

export default SearchBar;
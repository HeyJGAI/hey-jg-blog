import React from 'react';
import { reportError } from '../lib/errorReporter';

function SearchBar({ onSearch, placeholder = "Search posts..." }) {
    try {
        const [searchTerm, setSearchTerm] = React.useState('');
        const debounceTimeout = React.useRef(null);

        const handleSearch = (value) => {
            setSearchTerm(value);
            
            // Clear existing timeout
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            // Set new timeout
            debounceTimeout.current = setTimeout(() => {
                onSearch(value);
            }, 300);
        };

        React.useEffect(() => {
            // Cleanup timeout on component unmount
            return () => {
                if (debounceTimeout.current) {
                    clearTimeout(debounceTimeout.current);
                }
            };
        }, []);

        return (
            <div className="relative" data-name="search-bar">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    placeholder={placeholder}
                    data-name="search-input"
                />
                {searchTerm && (
                    <button
                        onClick={() => handleSearch('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        data-name="clear-search"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('SearchBar component error:', error);
        reportError(error);
        return null;
    }
}

export default SearchBar;

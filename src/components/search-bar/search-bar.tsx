import React, { useState, useEffect, useRef } from 'react';
import './search-bar.css';

const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>(''); 
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus on the input when the component is mounted
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        // Fetch stored searches from local storage
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        if (inputValue) {
            const filteredSuggestions = storedSearches.filter((search: string) =>
                search.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    // Handle enter key press to search
    document.onkeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            search();
            setInputValue('');
        }
    }

    const search = () => {
        const searchValue = document.querySelector<HTMLInputElement>('.search-bar-container input')?.value;
        if (searchValue) {
            saveSearch(searchValue);
            window.open(`https://www.google.com/search?q=${searchValue}`);
        }
    }

    const saveSearch = (searchValue: string) => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updatedSearches = [searchValue, ...storedSearches.filter((search: string) => search !== searchValue)];

        if (updatedSearches.length > 10) {
            updatedSearches.pop(); // Remove the last element
        }

        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        search();
    }

    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search" list='suggestions-list' ref={inputRef} value={inputValue} onChange={updateSearchValue} />
            {suggestions.length > 0 && (
                <datalist id="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </option>
                    ))}
                </datalist>
            )}
            {
                inputValue && (
                    <button className="search-button" onClick={search}>
                        <svg xmlns="http://www.w3.org/2000/svg"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                    </button>
                )
            }
        </div>
    )
}

export default SearchBar;

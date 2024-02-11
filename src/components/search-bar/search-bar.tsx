import React, { useState } from 'react';
import './search-bar.css';

const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>(''); 

    const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    // If the user press enter, search
    document.onkeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            search();
            setInputValue('');
        }
    }

    const search = () => {
        // Search on the web
        const searchValue = document.querySelector<HTMLInputElement>('.search-bar-container input')?.value;
        if (searchValue) {
            window.open(`https://www.google.com/search?q=${searchValue}`);
        }
    }
    
    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search" value={inputValue} onChange={updateSearchValue} />
        </div>
    )
}

export default SearchBar;

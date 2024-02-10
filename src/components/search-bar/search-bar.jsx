import React, { useState } from 'react';
import './search-bar.css';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState(''); 

    function updateSearchValue(e) {
        setInputValue(e.target.value);
    }

    // If the user press enter, search
    document.onkeydown = function(e) {
        if (e.key === 'Enter') {
            search();
            setInputValue('');
        }
    }

    function search() {
        // Search on the web
        const search = document.querySelector('.search-bar-container input').value;
        window.open('https://www.google.com/search?q=' + search);
    }
    
    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search" value={inputValue} onChange={updateSearchValue} />
        </div>
    )
}
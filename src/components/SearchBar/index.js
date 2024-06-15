import React from 'react';
import Autocomplete from './components/AutoComplete';
import styles from './styles.module.css';

const SearchBar = () => {
    const fetchSuggestions = async (query) => {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
        if (!response.ok) {
            throw new Error("Network response it not ok");
        }
        const result = await response.json();
        return result.recipes;
    };

    return (
        <div className={styles.main_container}>
            <h1>Autocomplete / Typeahead Component</h1>
            <Autocomplete
                placeholder={"Enter Recipe"}
                fetchSuggestions={fetchSuggestions}
                dataKey={"name"}
                customLoading={<>Loading...</>}
                onBlur={(e) => { }}
                onFocus={(e) => { }}
                customStyles={{}}
            />
        </div>
    );
};

export default SearchBar;
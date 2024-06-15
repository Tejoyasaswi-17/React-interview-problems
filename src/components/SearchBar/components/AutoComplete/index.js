import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import SuggestionList from '../SuggestionList';

const Autocomplete = ({
    placeholder = "",
    staticData,
    fetchSuggestions = () => { },
    dataKey = "",
    customLoading,
    onBlur = () => { },
    onFocus = () => { },
    customStyles = {},
}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const timerRef = useRef(null);

    const getSuggestions = async (query) => {
        setError(null);
        setLoading(true);
        try {
            let result;
            if (staticData) {
                result = staticData.filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                });
            } else if (fetchSuggestions) {
                result = await fetchSuggestions(query);
            }
            setSuggestions(result);
        } catch (err) {
            setError("Failed to fetch suggestions");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const debounce = (fn, delay) => {
        return function (...args) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const getSuggestionsDebounced = useCallback(debounce(getSuggestions, 300), [getSuggestions]);

    useEffect(() => {
        if (inputValue.length > 1) {
            getSuggestionsDebounced(inputValue);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleSuggestionClick = (suggestion) => {
        setInputValue(dataKey ? suggestion[dataKey] : suggestion);
        setSuggestions([]);
        setError(null);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <input
                type='text'
                style={customStyles}
                placeholder={placeholder}
                value={inputValue}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={handleInputChange}
            />
            {(suggestions.length > 0 || loading || error) &&
                <ul className={styles.suggestion_list}>
                    {error && <div className={styles.error}>{error}</div>}
                    {loading && <div className={styles.loading}>{customLoading}</div>}
                    <SuggestionList
                        suggestions={suggestions}
                        highlight={inputValue}
                        dataKey={dataKey}
                        onSuggestionClick={handleSuggestionClick}
                    />
                </ul>
            }
        </div>
    );
};

export default Autocomplete;
import React from 'react';
import styles from './styles.module.css';

const SuggestionList = ({
    suggestions = [],
    highlight = '',
    dataKey = '',
    onSuggestionClick = () => { }
}) => {
    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((item, index) => {
                    return (
                        item.toLowerCase() === highlight.toLowerCase() ?
                            <b key={index}>{item}</b> :
                            <span key={index}>{item}</span>
                    );
                })}
            </span>
        );
    };
    return (
        <React.Fragment>
            {suggestions.map((suggestion, index) => {
                const currrentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                return (
                    <li
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className={styles.suggestion_item}
                    >
                        {getHighlightedText(currrentSuggestion, highlight)}
                    </li>
                );
            })}
        </React.Fragment>
    );
};

export default SuggestionList;
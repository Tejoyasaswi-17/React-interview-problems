import React from 'react';
import styles from './styles.module.css';

const Pill = ({ image, text, onClick }) => {
    return (
        <span onClick={onClick} className={styles.user_pill}>
            <img src={image} alt={text} />
            <span>{text} &times;</span>
        </span>
    );
};

export default Pill;
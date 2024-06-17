import React, { useState } from 'react';
import Grid from './components/Grid';
import styles from './styles.module.css';

const SelectableGrid = () => {
    return (
        <div className={styles.container}>
            <h1>SelectableGrid</h1>
            <Grid rows={15} columns={15} />
        </div>
    );
};

export default SelectableGrid;
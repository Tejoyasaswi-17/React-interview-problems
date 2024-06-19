import React from 'react';
import styles from './styles.module.css';

const Tab = ({
    currentTab = '',
    index = 0,
    tabMappingConfig = {},
}) => {
    return (
        <div className={styles.tab_container}>
            <div className={`${styles.circle} 
                ${currentTab >= (index + 1) ? styles.filled : null} 
                ${currentTab === index ? styles.current : null}`}
            >
                {currentTab >= (index + 1) ? '✓' : index}
            </div>
            <div>{tabMappingConfig?.[index]?.heading}</div>
            {index !== 4 && <div className={`${styles.pipe} ${currentTab >= (index + 1) ? styles.filled : null}`}></div>}
        </div>
    );
};

export default Tab;
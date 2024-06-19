import React, { useState } from 'react';
import Tab from './components/Tab';
import styles from './styles.module.css';

const TAB_MAPPING_CONFIG = {
    1: {
        heading: 'Customer Info',
        content: 'Provide your contact details'
    },
    2: {
        heading: 'Shipping Info',
        content: 'Enter your shipping address'
    },
    3: {
        heading: 'Payment',
        content: 'Complete payment for your order'
    },
    4: {
        heading: 'Delivered',
        content: 'Your order is out for delivery'
    },
    5: {
        heading: 'Delivered',
        content: 'Your order has been delivered succesfully'
    },
};

const Stepper = () => {
    const [currentTab, setCurrentTab] = useState(1);

    return (
        <div className={styles.container}>
            <h1>Checkout</h1>
            <div className={styles.tabs}>
                {Array(4).fill(0).map((_, index) => {
                    return (
                        <Tab
                            currentTab={currentTab}
                            index={index + 1}
                            tabMappingConfig={TAB_MAPPING_CONFIG}
                        />);
                })}
            </div>
            <div className={styles.content}>{TAB_MAPPING_CONFIG?.[currentTab]?.content}</div>
            {currentTab === 4 && <button onClick={() => setCurrentTab((prev) => prev + 1)}>Finish</button>}
            {currentTab < 4 && <button onClick={() => setCurrentTab((prev) => prev + 1)}>Next</button>}
        </div>
    );
};

export default Stepper;
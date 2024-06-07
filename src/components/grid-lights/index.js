import React, { useState } from 'react';
import styles from './styles.module.css';

const GridLights = () => {
    const config = [
        [0, 0, 0],
        [0, -1, 0],
        [0, 0, 0]
    ];

    const [filledSquaresOrder, setFilledSquaresOrder] = useState([]);

    const deactiveCells = () => {
        const timer = setInterval(() => {
            setFilledSquaresOrder((prev) => {
                const newFilledSquareOrder = prev.slice(1);
                if (newFilledSquareOrder.length === 0) {
                    clearInterval(timer);
                }
                return newFilledSquareOrder;
            })
            
        }, 300);
    }

    const activateCell = (index1, index2) => {
        const newFilledSquares = [[index1, index2], ...filledSquaresOrder];
        setFilledSquaresOrder((prev) => [[index1, index2], ...prev]);
        if (newFilledSquares.length === 8) {
            deactiveCells();
        }

    };

    return (
        <div className={styles.container}>
            <span>Grid Lights</span>
            <div className={styles.grid}>
                {config.map((item1, index1) => {
                    return <div className={styles.block} key={index1}>
                        {item1.map((item2, index2) => {
                            if (item2 === -1) {
                                return null;
                            }
                            const isActivated = filledSquaresOrder.some(item => JSON.stringify(item) ===
                                JSON.stringify([index1, index2]));
                            
                            return (<div
                                className={isActivated ? styles.filled_block : styles.ind_block}
                                key={index2}
                                onClick={() => activateCell(index1, index2)}
                            >
                            </div>);
                        })}
                    </div>;
                })}
            </div>
        </div >
    );
};

export default GridLights;
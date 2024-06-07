import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const GridLights = () => {
    const [squares, setSquares] = useState([
        [0, 0, 0],
        [0, -1, 0],
        [0, 0, 0]
    ]);

    const [filledSquares, setFilledSquares] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const handleClick = (index1, index2) => {
        const newSquares = [...squares];
        newSquares[index1][index2] = 1;
        setSquares(newSquares);
        setFilledSquares((prev) => [[index1, index2], ...prev]);
    };

    useEffect(() => {
        if (filledSquares.length === 8) {
            setGameOver(true);
        }
        if (filledSquares.length === 0) {
            setGameOver(false);
        }
    }, [filledSquares]);


    useEffect(() => {
        if (gameOver && filledSquares.length > 0) {
            setTimeout(() => {
                const newConfig = [...squares];
                const [i, j] = filledSquares[0];
                newConfig[i][j] = 0;
                setSquares(newConfig);
                setFilledSquares((prev) => prev.slice(1));
            }, 300);
        }
    }, [gameOver, filledSquares]);

    return (
        <div className={styles.container}>
            <span>Grid Lights</span>
            <div className={styles.grid}>
                {squares.map((item1, index1) => {
                    return <div className={styles.block} key={index1}>
                        {item1.map((item2, index2) => {
                            if (item2 === -1) {
                                return null;
                            }
                            return (<div
                                className={item2 === 0 ? styles.ind_block : styles.filled_block}
                                key={index2}
                                onClick={() => handleClick(index1, index2)}
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
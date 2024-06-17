import React, { useCallback, useState } from 'react';
import styles from './styles.module.css';

const Grid = ({ rows = 10, columns = 10 }) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const handleMouseDown = (boxNumber) => {
        setIsMouseDown(true);
        setSelectedCells([boxNumber]);
    };
    const handleMouseEnter = useCallback((boxNumber) => {
        if (isMouseDown) {
            const startBox = selectedCells[0];
            const endBox = boxNumber;

            const startRow = Math.floor((startBox - 1) / columns);
            const startCol = (startBox - 1) % columns;
            const endRow = Math.floor((endBox - 1) / columns);
            const endCol = (endBox - 1) % columns;

            const minRow = Math.min(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxRow = Math.max(startRow, endRow);
            const maxCol = Math.max(startCol, endCol);

            const updatedSelectedCells = [];
            for (let i = minRow; i <= maxRow; i++) {
                for (let j = minCol; j <= maxCol; j++) {
                    updatedSelectedCells.push((i * columns) + j + 1);
                }
            }
            setSelectedCells(updatedSelectedCells);
        }
    }, [isMouseDown]);
    return (
        <div
            className={styles.grid}
            style={{ "--rows": rows, "--columns": columns }}
            onMouseUp={handleMouseUp}
        >
            {[...Array(rows * columns).keys()].map((i) => (
                <div
                    key={i}
                    className={`${styles.box} ${selectedCells.includes(i + 1) ? styles.selected : ''}`}
                    onMouseDown={() => handleMouseDown(i + 1)}
                    onMouseEnter={() => handleMouseEnter(i + 1)}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
};

export default Grid;
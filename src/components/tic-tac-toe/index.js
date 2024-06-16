import React from 'react';
import styles from './styles.module.css';
import useTicTacToe from './hooks/useTicTacToe';

const TicTacToe = () => {
    const { board, handleClick, resetGame, getStatusMessage } = useTicTacToe();


    return (
        <div className={styles.container}>
            <h1>Tic Tac Toe</h1>
            <div className={styles.status}>
                {getStatusMessage()}
                <button
                    className={styles.reset_game}
                    onClick={resetGame}
                >
                    Reset Game
                </button>
            </div>
            <div className={styles.board}>
                {board.map((item, index) => {
                    return (
                        <button
                            className={styles.cell}
                            key={index}
                            onClick={() => handleClick(index)}
                            disabled={item !== null}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TicTacToe;
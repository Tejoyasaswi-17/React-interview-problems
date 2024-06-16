import { useState } from "react";

const initialState = (size) => {
    return new Array(9).fill(null);
};

const useTicTacToe = () => {
    const [board, setBoard] = useState(initialState());
    const [isXNext, setIsXNext] = useState(true);

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a, b, c] = WINNING_PATTERNS[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if (winner || board[index]) {
            return;
        }
        const updatedBoard = [...board];
        updatedBoard[index] = isXNext ? "X" : "O";
        setBoard(updatedBoard);
        setIsXNext((prev) => !prev);
    };

    const getStatusMessage = () => {
        if (calculateWinner(board)) {
            return `Winner: ${calculateWinner(board)}`;
        }
        if (!board.includes(null)) {
            return "It's a draw";
        }
        return `Player ${isXNext ? 'X' : 'O'} turn`;
    };

    const resetGame = () => {
        setBoard(initialState());
        setIsXNext(true);
    };

    return {
        board,
        handleClick,
        calculateWinner,
        getStatusMessage,
        resetGame,
    };
};

export default useTicTacToe;
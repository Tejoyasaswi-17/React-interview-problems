import React from 'react';
import questions from '../../data/problems.json';
import styles from './styles.module.css';

const QuizQuestions = ({
    current = 0,
    setScore = () => { },
    setCurrent = () => { },
}) => {
    const { question, options, answer } = questions?.[current];

    const answerSelectHandler = (index) => {
        if (index + 1 === answer) {
            setScore((prev) => ([...prev, current]));
        }
        setCurrent((prev) => prev + 1);
    };

    return (
        <div className={styles.problem_statement}>
            <h2>{question}</h2>
            {options?.map((item, index) => (
                <button onClick={() => answerSelectHandler(index)}>{item}</button>
            ))}
        </div>
    );
};

export default QuizQuestions;
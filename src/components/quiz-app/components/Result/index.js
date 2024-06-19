import React from 'react';
import styles from './styles.module.css';
import questions from '../../data/problems.json';
const Result = ({
    score = [],
    setCurrent = () => { },
    setScore = () => { }
}) => {

    const resetHandler = () => {
        setCurrent(0);
        setScore([]);
    };

    return (
        <div className={styles.result_container}>
            <h3>Results</h3>
            <div>You answered {score.length} out of 10 questions.
                <button onClick={resetHandler}>Click here to retry</button></div>
            <div className={styles.report}>
                {questions?.map((item, index) => (
                    <div className={`${score.includes(index) ? styles.right : styles.wrong}`}>
                        Q{index + 1}. {item.question}
                        {' '}
                        {!score.includes(index) &&
                            <span className={styles.right}>Ans. {questions[index]?.options?.[questions?.[index]?.answer - 1]}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
import React, { useState } from 'react';
import styles from './styles.module.css';
import QuizQuestions from './components/QuizQuestions';
import Result from './components/Result';

const QuizApp = () => {
    const [score, setScore] = useState([]);
    const [current, setCurrent] = useState(0);

    return (
        <div className={styles.container}>
            <h1>Quiz application</h1>
            {current < 10 &&
                <QuizQuestions
                    current={current}
                    setScore={setScore}
                    setCurrent={setCurrent}
                />
            }
            {current === 10 && <Result
                score={score}
                setCurrent={setCurrent}
                setScore={setScore}
            />}
        </div>
    );
};

export default QuizApp;
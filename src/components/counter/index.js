import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

function Counter() {
    const [count, setCount] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const timerRef = useRef(null); 
    // Here is the main reason behind we using ref value is retained 
    // even after re-render so we can clear timeout for that variable itself and not it's some other reference

    const startHandler = () => {
        setIsTimerOn(true);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCount((prev) => prev+1);
        }, 1000);
    };

    const pauseHandler = () => {
        setIsTimerOn(false);
        clearInterval(timerRef.current);
    };


    const resetHandler = () => {
        setIsTimerOn(false);
        clearTimeout(timerRef.current);
        setCount(0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_title}>Counter</div>
            <div className={styles.container_content} >{count}</div>

            <div className={styles.container_buttons}>
                {!isTimerOn && 
                    <button 
                        className={`${styles.btn} ${styles.start}`}  
                        onClick={startHandler}
                    >
                        Start
                    </button>}
                {isTimerOn && 
                    <button 
                        className={`${styles.btn} ${styles.pause}`}  
                        onClick={pauseHandler}
                    >
                        Pause
                    </button>}
                <button className={`${styles.btn} ${styles.reset}`} onClick={resetHandler}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;
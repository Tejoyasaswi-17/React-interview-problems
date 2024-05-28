import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

function CountDownTimer() {

    const [time, setTime] = useState({
        hours: '',
        minutes: '',
        seconds: '',
    });
    const timerRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleInputChange = (event, name) => {
        const { value } = event.target || {};
        setTime((prev) => ({ ...prev, [name]: value.slice(0, 2) }));
    };

    const isInputInvalid = time.hours == 0 && time.minutes == 0 && time.seconds == 0;

    const runTimer = () => {
        setTime((prevTime) => {
            const { hours, minutes, seconds } = prevTime;
            let numHours = Number(hours);
            let numMinutes = Number(minutes);
            let numSeconds = Number(seconds);
            if (numHours === 0 && numMinutes === 0 && numSeconds === 0) {
                setIsRunning(false);
                setTimeout(() => {
                    setTime({hours: '', minutes: '', seconds: ''});
                    clearInterval(timerRef.current);
                }, 500);
            }
            if (numSeconds >= 60) {
                numMinutes += 1;
                numSeconds %= 60;
            }
            if (numMinutes >= 60) {
                numHours += 1;
                numMinutes %= 60;
            }
            if (numSeconds > 0) {
                numSeconds -= 1;
            } else {
                if (numMinutes > 0) {
                    numMinutes -= 1;
                    numSeconds = 59;
                } else if (numHours > 0) {
                    numHours -= 1;
                    numMinutes = 59;
                    numSeconds = 59;
                }
            }
            return { hours: numHours, minutes: numMinutes, seconds: numSeconds };
        });
    };

    const startHandler = () => {
        if (isInputInvalid) {
            clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(() => {
            runTimer();
        }, 1000);
    };

    const pauseHandler = () => {
        clearInterval(timerRef.current);
        if (isInputInvalid) {
            return;
        }
        setIsRunning(false);
    };

    const endHandler = () => {
        clearInterval(timerRef.current);
        if (isInputInvalid) {
            return;
        }
        setTime({hours: '', minutes: '', seconds: ''});
        setIsRunning(false);
    };

    return (
        <div className={styles.container}>
            <span className={styles.container_title}>Countdown timer</span>
            <div className={styles.container_labels}>
                <p className={styles.container_label1}>Hours</p>
                <p className={styles.container_label1}>Minutes</p>
                <p className={styles.container_label1}>Seconds</p>
            </div>

            <div className={styles.container_inputs}>
                <input className={styles.container_input1}
                    maxLength="2"
                    name='hours'
                    type='number'
                    value={time.hours}
                    onChange={(event) => handleInputChange(event, 'hours')}
                    placeholder='00'
                />
                <p className={styles.container_input_colon}>:</p>
                <input className={styles.container_input1}
                    maxLength="2"
                    name='minutes'
                    type='number'
                    value={time.minutes}
                    placeholder='00'
                    onChange={(event) => handleInputChange(event, 'minutes')}

                />
                <p className={styles.container_input_colon}>:</p>
                <input className={styles.container_input1}
                    maxLength="2"
                    name='seconds'
                    type='number'
                    value={time.seconds}
                    placeholder='00'
                    onChange={(event) => handleInputChange(event, 'seconds')}
                />
            </div>
            <div className={styles.container_buttons}>
                {!isRunning && 
                    <button 
                        className={`${styles.btn} ${styles.start}`} 
                        disabled={isInputInvalid} 
                        onClick={() => {
                            setIsRunning(true);
                            startHandler();
                        }}
                    >
                        Start
                    </button>
                }
                {isRunning && <button className={`${styles.btn} ${styles.pause}`} onClick={pauseHandler}>Pause</button>}
                <button className={`${styles.btn} ${styles.end}`} onClick={endHandler}>End</button>
            </div>
        </div>

    );
}

export default CountDownTimer;
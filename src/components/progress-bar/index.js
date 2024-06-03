import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

function ProgressBar() {
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(null);

    useEffect(() => {
        progressRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressRef.current);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);
    }, []);

    return (
        <div className={styles.body}>
            <h1 className={styles.heading}>Progress bar</h1>
            <div className={styles.progress_bar}>
                <div
                    className={styles.progress}
                    style={{ width: `${progress}%` }}
                    role='progressbar'
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress.toFixed(0)}
                ></div>
                <div className={styles.progress_percentage}>{progress.toFixed(0)}%</div>
            </div>
        </div>
    );
};

export default ProgressBar;

// Used some of the accessibility features,
// How to make component  scalable: By using functions such as onStart, onComplete, etc
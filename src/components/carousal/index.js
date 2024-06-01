import React from 'react';
import styles from './styles.module.css';
import { useState } from 'react';

const Carousal = () => {
    const [index, setIndex] = useState(0);
    const images = [
        "https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80",
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80",
    ];
    const numImages = images?.length;

    const scrollLeft = () => {
        setIndex((ind) => {
            if (ind > 0) {
                return ind - 1;
            }
            return numImages - 1;
        });
    };

    const scrollRight = () => {
        setIndex((ind) => {
            if (ind < numImages - 1) {
                return ind + 1;
            }
            return 0;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <button className={`${styles.left_scroll} ${styles.btn}`} onClick={scrollLeft}>&lt;</button>
                <img src={images?.[index]} alt={`img:${index}`} />
                <button className={`${styles.right_scroll} ${styles.btn}`} onClick={scrollRight}>&gt;</button>
            </div>
            <div className={styles.caption}>{`${index + 1} / ${numImages}`}</div>
        </div>
    );
};

export default Carousal;
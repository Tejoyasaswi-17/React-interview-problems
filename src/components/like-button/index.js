import React, { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icons';
import styles from './styles.module.css';

const LikeButton = () => {
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState(false);
    const [error, setError] = useState(null);

    const handleLikeOrUnlike = async () => {
        setError(null);
        setLoading(true);
        try {
            setError(null);
            const response = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: like ? "unlike" : "like",
                }),
            });
            if (response.status >= 200 && response.status < 300) {
                setLike((prev) => !prev);
            } else {
                const res = await response.json();
                setError(res.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <button className={`${styles.btn} ${like ? styles.filled : null}`} onClick={() => handleLikeOrUnlike()}>
                {loading ? <SpinnerIcon /> : <HeartIcon />} {like ? 'Liked' : 'Like'}
            </button>
            {error !== null && <div>{`Error: ${error}`}</div>}
        </div>
    );
};

export default LikeButton;
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import useGetJobData from '../../hooks/useGetJobData';

const Card = ({ jobId = '' }) => {
    const { fetchJobDataFromId = () => { }, jobData = {} } = useGetJobData();
    const { title = '', url = '', by = '', time = '' } = jobData || {};
    const formattedTime = new Date(time * 1000).toLocaleString();

    useEffect(() => {
        fetchJobDataFromId(jobId);
    }, [jobId]);

    return (
        <div className={styles.card}>
            {title === '' ? <p>loading .... </p> : <div className={styles.heading}>
                <h2>
                    <a
                        href={url}
                        target='blank'
                        rel='noopener'
                        className={`${styles.job_title} ${url ? '' : styles.inactive_link}`}
                    >
                        {title}
                    </a>
                </h2>
                <span className={styles.job_content}>By {by} . {`${formattedTime}`}</span>
            </div>}
        </div >
    );
};

export default Card;
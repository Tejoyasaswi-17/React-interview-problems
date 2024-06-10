import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import useGetJobPostings from './hooks/useGetJobPostings';
import Card from './components/Card';

const ITEMS_PER_PAGE = 6;

const JobBoard = () => {
    const { jobPostings = [], fetchJobs = () => { } } = useGetJobPostings();
    const jobPostingsCount = jobPostings.length;
    const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Hacker news job board</h1>
            {jobPostings.length < 1 ? <p>Loading......</p> : (
                <div className={styles.cards} role='list'>
                    {jobPostings?.slice(0, Math.min(pageSize, jobPostingsCount))?.map((item) => {
                        return (
                            <Card
                                key={item}
                                jobId={item}
                            />
                        );
                    })}
                </div>)}
            {pageSize < jobPostingsCount &&
                <button
                    onClick={() => setPageSize((prev) => Math.min(prev + 6, jobPostingsCount))}
                >
                    Load More jobs
                </button>}
        </div>
    );
};

export default JobBoard;
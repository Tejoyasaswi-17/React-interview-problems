import { useState } from "react";

const useGetJobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const fetchJobs = async () => {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
        const jsonResponse = await response.json();
        setJobPostings(jsonResponse);
    };

    return {
        jobPostings,
        fetchJobs,
    };
};

export default useGetJobPostings;
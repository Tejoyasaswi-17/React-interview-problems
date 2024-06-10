import { useState } from "react";

const useGetJobData = () => {
    const [jobData, setJobData] = useState({});
    const fetchJobDataFromId = async (jobId) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
        const jsonResponse = await response.json();
        setJobData(jsonResponse);
    };

    return {
        fetchJobDataFromId,
        jobData,
    };
};

export default useGetJobData;
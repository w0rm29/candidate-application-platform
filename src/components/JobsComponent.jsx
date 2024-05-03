import React, { useState, useEffect } from 'react';
import JobCard from "./JobCard";
import Grid from '@mui/material/Grid';

function JobsComponent() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const myHeaders = new Headers({
                "Content-Type": "application/json"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ "limit": 10, "offset": 0 })
            };

            try {
                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await response.json();
                setJobs(result.jdList);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (

        jobs.map((job, index) => (

            <JobCard job={job} />

        ))


    );
}

export default JobsComponent;

import React, { useState, useEffect } from 'react';
import JobCard from "./JobCard";
import Grid from '@mui/material/Grid';

function JobsComponent() {
    const [jobs, setJobs] = useState([]); // Holds the jobs data
    const [isLoading, setIsLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Tracks error state

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Grid container spacing={4} justifyContent="center">
            {jobs.map((job, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <JobCard job={job} />
                </Grid>
            ))}
        </Grid>
    );
}

export default JobsComponent;

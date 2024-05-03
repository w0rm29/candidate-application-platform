import React, { useState, useEffect, useRef } from 'react';
import JobCard from "./JobCard";

function JobsComponent({ selectedRoles, selectedCompany, selectRemote }) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && hasMore && !isLoading) {
                fetchJobs();
            }
        }, { rootMargin: '20px' });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
    }, [isLoading, hasMore]);  // Ensure dependencies are correctly listed


    const fetchJobs = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "limit": 10, "offset": offset })
        };

        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const result = await response.json();
            setJobs(prevJobs => [...prevJobs, ...result.jdList]);
            setHasMore(result.jdList.length > 0);
            setOffset(prevOffset => prevOffset + result.jdList.length);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError(error);
            setIsLoading(false);
        }
    };

    const lowerCaseRoles = selectedRoles.map(role => role.toLowerCase());
    const lowerCaseRemote = selectRemote.map(remote => remote.toLowerCase());

    const filteredJobs = jobs.filter(job => {
        const jobRoleLower = job.jobRole.toLowerCase();
        const jobCompanyLower = job.companyName.toLowerCase();
        const jobLocationLower = job.location.toLowerCase();
        return (
            (selectedRoles.length === 0 || lowerCaseRoles.includes(jobRoleLower)) &&
            (!selectedCompany || jobCompanyLower.includes(selectedCompany.toLowerCase())) &&
            (selectRemote.length === 0 || lowerCaseRemote.includes(jobLocationLower))
        );
    });


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {filteredJobs.map(job => <JobCard key={job.jdUid} job={job} />)}
            {isLoading}
            <div ref={loader}></div>
        </>
    );
}

export default JobsComponent;

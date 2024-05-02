export default function JobCard({ job }) {
    return (
        <div className="job-card">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <div>Location: {job.location}</div>
            <div>Salary: {job.salary}</div>
        </div>
    );
}
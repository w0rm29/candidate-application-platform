import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

const JobCard = ({ job }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);

    return (
        <Card sx={{ maxWidth: 345, m: 2, overflow: 'hidden' }}>
            <CardContent>
                {job.jobRole && (
                    <Typography gutterBottom variant="h5" component="div">
                        {job.jobRole}
                    </Typography>
                )}

                <Typography variant="subtitle1" color="text.secondary">
                    Weekday
                </Typography>

                {job.location && (
                    <Typography variant="subtitle2" color="text.secondary">
                        {job.location}
                    </Typography>
                )}

                {job.maxJdSalary && job.minJdSalary && (
                    <Typography variant="subtitle2" color="text.secondary">
                        Estimated Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}
                    </Typography>
                )}

                {job.jobDetailsFromCompany && (
                    <Typography variant="body2" color="text.secondary" noWrap={!expanded} sx={{ cursor: 'pointer' }} onClick={toggleExpand}>
                        {expanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 100)}...`}
                    </Typography>
                )}

                {job.minExp && (
                    <Typography variant="body2" color="text.secondary">
                        Minimum Experience
                        <br />
                        {job.minExp} years
                    </Typography>
                )}

            </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={job.applyLink}>
                    Apply
                </Button>
                <Button size="small" onClick={toggleExpand}>
                    {expanded ? 'Less' : 'More'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default JobCard;

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Chip, Avatar, AvatarGroup } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from '@mui/material/Link';
import FlashOnIcon from '@mui/icons-material/FlashOn';

function JobCard({ job }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };

    // Function to handle the text display based on expansion state
    const displayText = isExpanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 300)}...`;


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <Card sx={{ borderRadius: 2, mb: 2, boxShadow: 3 }}>
            <CardContent>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                                Posted {job.postedDays} days ago
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {job.logoUrl && <Box component="img" src={job.logoUrl} alt={`${job.companyName} Logo`} sx={{ height: 40, width: 40, mr: 2 }} />}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">{job.companyName}</Typography>
                                <Typography variant="h6">{capitalizeFirstLetter(job.jobRole)}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">{capitalizeFirstLetter(job.location)}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                            {job.minJdSalary &&
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>Estimated Salary: {job.minJdSalary} {job.salaryCurrencyCode}</Typography>}
                            {job.minJdSalary &&
                                <Chip icon={<CheckCircleIcon />} color="success" variant="outlined" />}
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>About Company</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>About Us:</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>{displayText}</Typography>
                        {job.jobDetailsFromCompany.length > 100 &&

                            <Link component="button" variant="body2" onClick={toggleExpand} sx={{ color: 'blue', textDecoration: 'underline', display: 'block' }}>
                                View job
                            </Link>
                        }
                        {job.minExp &&
                            <div>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontSize: 18, mt: 1 }}>
                                    Minimum Experience
                                </Typography>

                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {job.minExp} years
                                </Typography>

                            </div>
                        }
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 2, mt: 2 }}>
                            <Button variant="contained" startIcon={<FlashOnIcon />} sx={{ backgroundColor: '#76ff03', color: '#000', '&:hover': { backgroundColor: '#64dd17' }, flexGrow: 1 }}>
                                Easy Apply
                            </Button>
                            <Button variant="contained" sx={{ backgroundColor: '#536dfe', '&:hover': { backgroundColor: '#3d5afe' }, flexGrow: 1 }}>
                                Unlock referral asks
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default JobCard;

// const JobHeader = ({ job }) => (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         {job.logoUrl && <Box component="img" src={job.logoUrl} alt={`${job.companyName} Logo`} sx={{ height: 40, width: 40, mr: 2 }} />}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Typography variant="h6">{job.companyName}</Typography>
//             <Typography variant="h6">{job.jobRole}</Typography>
//             <Typography variant="subtitle2" color="text.secondary">{job.location}</Typography>
//         </Box>
//     </Box>
// );

// const JobFooter = ({ job }) => (
//     <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 2, mt: 2 }}>
//         <Button variant="contained" startIcon={<FlashOnIcon />} sx={{ backgroundColor: '#76ff03', color: '#000', '&:hover': { backgroundColor: '#64dd17' }, flexGrow: 1 }}>
//             Easy Apply
//         </Button>
//         <Button variant="contained" sx={{ backgroundColor: '#536dfe', '&:hover': { backgroundColor: '#3d5afe' }, flexGrow: 1 }}>
//             Unlock referral asks
//         </Button>
//     </Box>
// );

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function CompanyFilterComponent({ onSelectionChange }) {
    const [companyName, setCompanyName] = useState('');
    const handleCompanyNameChange = (event) => {
        const newCompanyName = event.target.value;
        setCompanyName(newCompanyName);
        onSelectionChange(newCompanyName);
    };
    return (
        <Box component="form" noValidate autoComplete="off" sx={{ m: 1, minWidth: 250, maxWidth: 400 }}>
            <TextField
                fullWidth
                label="Select Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                variant="outlined"
            />
        </Box>
    );
}

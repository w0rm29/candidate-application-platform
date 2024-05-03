import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk action
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async ({ limit, offset }) => {
    const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        limit,
        offset
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

// Jobs slice
const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Append jobs to the existing list
                state.items = state.items.concat(action.payload);
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default jobsSlice.reducer;

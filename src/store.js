import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobs/jobsSlice';
import { filtersSlice } from './features/filters/filterSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        filters: filtersSlice
    },
});
import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        minExp: '',
        companyName: '',
        location: '',
        jobRole: '',
        minJdSalary: '',
        remote: false
    },
    reducers: {
        setFilter: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearFilters: state => {
            state.minExp = '';
            state.companyName = '';
            state.location = '';
            state.jobRole = '';
            state.minJdSalary = '';
            state.remote = false;
        }
    }
});

export const { setFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isValid: true,
    error: [],
};

const validationSlice = createSlice({
    name: 'validation',
    initialState,
    reducers: {
        setValidity: (state, action) => {
            state.isValid = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setValidity, setError } = validationSlice.actions;

export default validationSlice.reducer;

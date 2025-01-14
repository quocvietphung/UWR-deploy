import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ergebnisData: {
        firstName:"",
        lastName:"",
        email:""
    },
};

const ergebnisSlice = createSlice({
    name: 'ergebnis',
    initialState,
    reducers: {
        setErgebnisData: (state, action) => {
            state.ergebnisData = action.payload;
        },
    },
});

export const { setErgebnisData } = ergebnisSlice.actions;
export default ergebnisSlice.reducer;

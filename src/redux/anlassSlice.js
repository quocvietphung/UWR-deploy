import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    anlassData: {
        selectedOption: ''
    },
};

const anlassSlice = createSlice({
    name: 'anlass',
    initialState,
    reducers: {
        setAnlass: (state, action) => {
            state.anlassData = action.payload;
        },
    },
});

export const { setAnlass } = anlassSlice.actions;

export default anlassSlice.reducer;

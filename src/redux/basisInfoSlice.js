import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    basisInfoData: {
        branche: {
            key: "",
            ebitValue: 0,
            umsatzValue: 0,
            text: "Branche auswählen"
        },
        lage: {
            key: "städtisch",
            value: 1,
            text: "städtisch"
        },
        alter: 1,
    },
};

const basisInfoSlice = createSlice({
    name: 'basisInfo',
    initialState,
    reducers: {
        setBranche: (state, action) => {
            state.basisInfoData.branche = action.payload;
        },
        setLage: (state, action) => {
            state.basisInfoData.lage = action.payload;
        },
        setAlter: (state, action) => {
            state.basisInfoData.alter = action.payload;
        },
    },
});

export const {
    setBranche,
    setLage,
    setAlter,
} = basisInfoSlice.actions;

export default basisInfoSlice.reducer;

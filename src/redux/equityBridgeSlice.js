import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    equityBridgeData: {
        bargeldBestand: '',
        finanzSchulden: '',
    },
};

const equityBridgeSlice = createSlice({
    name: 'equityBridge',
    initialState,
    reducers: {
        setBargeldBestand: (state, action) => {
            state.equityBridgeData.bargeldBestand = action.payload;
        },
        setFinanzSchulden: (state, action) => {
            state.equityBridgeData.finanzSchulden = action.payload;
        },
        resetEquityBridge: (state) => {
            state.equityBridgeData.bargeldBestand = '';
            state.equityBridgeData.finanzSchulden = '';
        },
    },
});

export const { setBargeldBestand, setFinanzSchulden, resetEquityBridge } = equityBridgeSlice.actions;

export default equityBridgeSlice.reducer;

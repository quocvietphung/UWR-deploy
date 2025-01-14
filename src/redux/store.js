import { configureStore } from '@reduxjs/toolkit';
import ergebnisReducer from './ergebnisSlice';
import sectionsReducer from './sectionsSlice';
import validationReducer from './reducers';
import basisInfoReducer from './basisInfoSlice';
import kennzahlenReducer from './kennzahlenSlice';
import bereinigungReducer from './bereinigungSlice';
import equityBridgeReducer from './equityBridgeSlice';
import qualityReducer from './qualitySlice';
import anlassReducer from './anlassSlice';

export default configureStore({
    reducer: {
        ergebnis: ergebnisReducer,
        sections: sectionsReducer,
        validation: validationReducer,
        basisInfo: basisInfoReducer,
        kennzahlen: kennzahlenReducer,
        bereinigung: bereinigungReducer,
        equityBridge: equityBridgeReducer,
        quality: qualityReducer,
        anlass: anlassReducer,
    },
});

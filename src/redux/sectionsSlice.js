import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sectionData: {
        activeSection: 'basis',
        finishedSections: [],
        sectionOrder: ['basis', 'kennzahlen', 'bereinigung', 'equity', 'quality', 'anlass'],
        unternehmenswert: 0,
    },
};

const sectionsSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            state.sectionData.activeSection = action.payload;
            if (action.payload === 'basis' && !state.sectionData.finishedSections.includes('basis')) {
                state.sectionData.unternehmenswert = 0;
            }
        },
        finishSection: (state, action) => {
            const section = action.payload;
            if (!state.sectionData.finishedSections.includes(section)) {
                state.sectionData.finishedSections.push(section);
            }
        },
        setUnternehmenwert: (state, action) => {
            state.sectionData.unternehmenswert = action.payload;
        },
    },
});

export const { setActiveSection, finishSection, setUnternehmenwert } = sectionsSlice.actions;

export default sectionsSlice.reducer;
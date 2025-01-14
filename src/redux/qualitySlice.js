import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    qualityData: {
        kundenabhaengigkeit: '',
        mitarbeiterabhaengigkeit: '',
        lieferantenabhaengigkeit: '',
        produktdiversifikation: '',
        tagesgeschaeft: '',
        fernbleiben: '',
        absenz: '',
        kundenbeziehung: '',
    },
};

const qualitySlice = createSlice({
    name: 'quality',
    initialState,
    reducers: {
        setQualityData: (state, action) => {
            state.qualityData = action.payload;
        },
    },
});

export const { setQualityData } = qualitySlice.actions;

export default qualitySlice.reducer;

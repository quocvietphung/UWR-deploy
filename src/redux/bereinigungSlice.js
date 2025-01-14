import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bereinigungData: {
        gehalt: [
            {
                title: "Gehalt 2021",
                year: 2021,
                value: null
            },
            {
                title: "Gehalt 2022",
                year: 2022,
                value: null
            },
            {
                title: "Gehalt 2023",
                year: 2023,
                value: null
            },
        ],
        anpassungEbit: [
            {
                title: "Anpassung 2021",
                year: 2021,
                value: null,
            },
            {
                title: "Anpassung 2022",
                year: 2022,
                value: null,
            },
            {
                title: "Anpassung 2023",
                year: 2023,
                value: null,
            },
        ],
        bereinigungEbit: [
            {
                title: "Bereinigtes EBIT 2021",
                year: 2021,
                value: null,
            },
            {
                title: "Bereinigtes EBIT 2022",
                year: 2022,
                value: null,
            },
            {
                title: "Bereinigtes EBIT 2023",
                year: 2023,
                value: null,
            },
        ],
        typischGehalt: '',
        erklaerungAnpassungEbit: '',
        bereinigungEbitAverage: 0,
    }
};

const bereinigungSlice = createSlice({
    name: 'bereinigungen',
    initialState,
    reducers: {
        setGehaltValue: (state, action) => {
            state.bereinigungData.gehalt = action.payload;
        },
        setAnpassungEbitValue: (state, action) => {
            state.bereinigungData.anpassungEbit = action.payload;
        },
        setBereinigungEbitValue: (state, action) => {
            state.bereinigungData.bereinigungEbit = action.payload;
        },
        setTypischGehalt: (state, action) => {
            state.bereinigungData.typischGehalt = action.payload;
        },
        setErklaerungAnpassungEbit: (state, action) => {
            state.bereinigungData.erklaerungAnpassungEbit = action.payload;
        },
        setValueForBereinigungEbit: (state, action) => {
            const { year, value } = action.payload;
            state.bereinigungData.bereinigungEbit = state.bereinigungData.bereinigungEbit.map(item => {
                if (item.year === year) {
                    return { ...item, value };
                }
                return item;
            });
        },
        setBereinigungEbitAverage: (state, action) => {
            state.bereinigungData.bereinigungEbitAverage = action.payload;
        },
    },
});

export const {
    setGehaltValue,
    setAnpassungEbitValue,
    setBereinigungEbitValue,
    setTypischGehalt,
    setErklaerungAnpassungEbit,
    setValueForBereinigungEbit,
    setBereinigungEbitAverage,
} = bereinigungSlice.actions;

export default bereinigungSlice.reducer;

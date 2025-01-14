import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    kennzahlenData: {
        prognose: false,
        umsatz: [
            {
                title: "Umsatz 2022",
                year: 2022,
                value: (100000 + 25000000000) / 2
            },
            {
                title: "Umsatz 2023",
                year: 2023,
                value: (100000 + 25000000000) / 2
            },
            {
                title: "Umsatz 2024",
                year: 2024,
                value: (100000 + 25000000000) / 2
            },
        ],
        ebit: [
            {
                title: "Ebit 2022",
                year: 2022,
                value: 5000000000 / 2
            },
            {
                title: "Ebit 2023",
                year: 2023,
                value: 5000000000 / 2
            },
            {
                title: "Ebit 2024",
                year: 2024,
                value: 5000000000 / 2
            },
        ],
        gewinn: {
            data: [
                {
                    title: "Gewinn 2022",
                    year: 2022,
                    type: "",
                    value: null
                },
                {
                    title: "Gewinn 2023",
                    year: 2023,
                    type: "",
                    value: null
                },
                {
                    title: "Gewinn 2024",
                    year: 2024,
                    type: "",
                    value: null
                },
            ],
            options: [
                {
                    type: "ganz untypisch",
                    value: 0.8
                },
                {
                    type: "eher untypisch",
                    value: 0.85
                },
                {
                    type: "nur teilweise typisch",
                    value: 0.9
                },
                {
                    type: "eher typisch",
                    value: 0.95
                },
                {
                    type: "typisch",
                    value: 1
                }
            ],
        },
        averageValues: {
            averageUmsatz: (100000 + 25000000000) / 2,
            averageEbit: 5000000000 / 2,
        },
    },
};

const kennzahlenSlice = createSlice({
    name: "kennzahlen",
    initialState,
    reducers: {
        setPrognose: (state, action) => {
            state.kennzahlenData.prognose = action.payload;
        },
        setUmsatz: (state, action) => {
            state.kennzahlenData.umsatz = action.payload;
        },
        setEbit: (state, action) => {
            state.kennzahlenData.ebit = action.payload;
        },
        setGewinn: (state, action) => {
            state.kennzahlenData.gewinn = action.payload;
        },
        setAverageUmsatz: (state, action) => {
            state.kennzahlenData.averageValues.averageUmsatz = action.payload;
        },
        setAverageEbit: (state, action) => {
            state.kennzahlenData.averageValues.averageEbit = action.payload;
        },
    },
});

export const {
    setPrognose,
    setUmsatz,
    setEbit,
    setGewinn,
    setAverageUmsatz,
    setAverageEbit,
} = kennzahlenSlice.actions;

export default kennzahlenSlice.reducer;

const kennzahlen = [
    {
        umsatz: [
            {
                year: 2022,
                value: 25000000
            },
            {
                year: 2023,
                value: 25000000
            },
            {
                year: 2024,
                value: 25000000
            }
        ],
        ebit: [
            {
                year: 2022,
                value: 5000000
            },
            {
                year: 2023,
                value: 5000000
            },
            {
                year: 2024,
                value: 5000000
            }
        ],
        gewinnTypisch: [
            {
                year: 2022,
                value: "ganz untypisch"
            },
            {
                year: 2023,
                value: "eher untypisch"
            },
            {
                year: 2024,
                value: "typisch"
            }
        ]
    }
];

const kennzahlen = {
    years: ["2022", "2023", "2024"].concat(checked ? ["2025"] : []),
    options: ['ganz untypisch', 'eher untypisch', 'nur teilweise typisch', 'eher typisch', 'typisch']
};

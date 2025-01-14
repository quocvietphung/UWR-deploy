const kennzahlen = [
    {
        umsatz: [
            {
                year: 2020,
                value: 25000000
            },
            {
                year: 2021,
                value: 25000000
            },
            {
                year: 2022,
                value: 25000000
            }
        ],
        ebit: [
            {
                year: 2020,
                value: 5000000
            },
            {
                year: 2021,
                value: 5000000
            },
            {
                year: 2022,
                value: 5000000
            }
        ],
        gewinnTypisch: [
            {
                year: 2020,
                value: "ganz untypisch"
            },
            {
                year: 2021,
                value: "eher untypisch"
            },
            {
                year: 2022,
                value: "typisch"
            }
        ]
    }
];

const kennzahlen = {
    years: ["2021", "2022", "2023"].concat(checked ? ["2024"] : []),
    options: ['ganz untypisch', 'eher untypisch', 'nur teilweise typisch', 'eher typisch', 'typisch']
};


const qualityOptions = {
    Klumpenrisiken: {
        kundenabhaengigkeit: [
            {
                value: '0.7',
                text: 'Das Unternehmen hat eine starke Abhängigkeit zu den besten drei Kunden.'
            },
            {
                value: '1',
                text: 'Das Unternehmen hat eine moderate Abhängigkeit zu den besten drei Kunden.'
            },
            {
                value: '1.2',
                text:
                    'Das Unternehmen hat einen sehr diversifizierten Kundenstamm und eine schwache Abhängigkeit gegenüber den besten drei Kunden.'
            }
        ],
        mitarbeiterabhaengigkeit: [
            {
                value: '0.7',
                text: 'Die wichtigsten Mitarbeiter wären nur schwer zu ersetzen.'
            },
            {
                value: '1',
                text: 'Die wichtigsten Mitarbeiter wären innerhalb eines Jahres ersetzbar.'
            },
            {
                value: '1.2',
                text: 'Die wichtigsten Mitarbeiter wären in unter einer Woche erstetzbar.'
            }
        ],
        lieferantenabhaengigkeit: [
            {
                value: '0.7',
                text: 'Wenn ein Lieferant ausfällt, lässt sich dieser kaum ersetzen.'
            },
            {
                value: '1',
                text: 'Wenn ein Lieferant ausfällt, lässt dieser sich innerhalb eines Monats ersetzen.'
            },
            {
                value: '1.2',
                text: 'Das Unternehmen hat keine Abhängigkeit zu seinen Lieferanten.'
            }
        ],
        produktdiversifikation: [
            {
                value: '1.1',
                text: 'Das Unternehmen ist gut diversifiziert und bietet Produkte in mehreren Kategorien / Branchen an.'
            },
            {
                value: '0.7',
                text: 'Das Unternehmen ist spezialisiert auf eine Produktkategorie.'
            }
        ]
    },
    Abhaengigkeit_zum_Unternehmer: {
        tagesgeschaeft: [
            {
                value: '1.2',
                text: 'Der Unternehmer kann sich intensiv mit strategischen Fragen befassen.'
            },
            {
                value: '1',
                text: 'Der Unternehmer muss einen großen Teil seiner Zeit dem Tagesgeschäft widmen.'
            },
            {
                value: '0.7',
                text: 'Der Unternehmer hat kaum Zeit für strategische Fragen, da das Tagesgeschäft einen Großteil seiner Zeit fordert.'
            }
        ],
        fernbleiben: [
            { value: '0.65', text: '3 Tage' },
            { value: '0.85', text: '3 Wochen' },
            { value: '1.2', text: '3 Monate' },
            { value: '1.5', text: '3 Jahre' }
        ],
        absenz: [
            {
                value: '1.3',
                text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten hätte keinen großen Einfluss auf das Unternehmen.'
            },
            {
                value: '1',
                text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten würde zu Problemen bei unerwarteten Geschäftsvorfällen führen.'
            },
            {
                value: '0.7',
                text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten wäre sehr schwierig.'
            }
        ],
        kundenbeziehung: [
            {
                value: '0.7',
                text: 'Der Unternehmer kennt den Großteil der Kunden persönlich und diese erwarten, dass dieser sich persönlich um sie kümmert.'
            },
            {
                value: '1',
                text: 'Der Unternehmer kennt zwar einen großen Teil der Kunden persönlich, diese erwarten aber nicht, dass dieser sich persönlich um sie kümmert.'
            },
            {
                value: '1.2',
                text: 'Der Unternehmer kennt kaum Kunden persönlich.'
            }
        ]
    }
};

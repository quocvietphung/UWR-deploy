import React, { useEffect } from "react";
import { Header, Form, Grid, Select, Radio, Button, Divider } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setBranche, setLage, setAlter } from '../../redux/basisInfoSlice';
import { setValidity, setError } from '../../redux/reducers';

const BasisInfo = (props) => {
    const basisInfoData = useSelector(state => state.basisInfo.basisInfoData);
    const isValid = useSelector(state => state.validation.isValid);
    const dispatch = useDispatch();

    const basisInfos = {
        branchOptions: [
            {
                key: "",
                ebitValue: 0,
                umsatzValue: 0,
                text: "Branche auswählen"
            },
            {
                key: "bau",
                ebitValue: 4.8,
                umsatzValue: 0.63,
                text: "Bau und Handwerk"
            },
            {
                key: "beratung",
                ebitValue: 5.0,
                umsatzValue: 0.85,
                text: "Beratende Dienstleistung"
            },
            {
                key: "chemie",
                ebitValue: 5.9,
                umsatzValue: 1.1,
                text: "Chemie, Kunststoffe, Papier"
            },
            {
                key: "elektrotechnik",
                ebitValue: 5.4,
                umsatzValue: 0.84,
                text: "Elektrotechnik"
            },
            {
                key: "fahrzeugbau",
                ebitValue: 5.15,
                umsatzValue: 0.72,
                text: "Fahrzeugbau und -zubehör"
            },
            {
                key: "handel",
                ebitValue: 5.55,
                umsatzValue: 0.73,
                text: "Handel und E-Commerce"
            },
            {
                key: "maschinenbau",
                ebitValue: 5.6,
                umsatzValue: 0.85,
                text: "Maschinen- und Anlagenbau"
            },
            {
                key: "medien",
                ebitValue: 5.3,
                umsatzValue: 1.16,
                text: "Medien"
            },
            {
                key: "nahrungs",
                ebitValue: 5.45,
                umsatzValue: 1.11,
                text: "Nahrungs- und Genussmittel"
            },
            {
                key: "pharma",
                ebitValue: 6.5,
                umsatzValue: 1.64,
                text: "Pharma, Bio- und Medizintechnik"
            },
            {
                key: "software",
                ebitValue: 5.65,
                umsatzValue: 1.56,
                text: "Software"
            },
            {
                key: "telekommunikation",
                ebitValue: 5.65,
                umsatzValue: 1.05,
                text: "Telekommunikation"
            },
            {
                key: "textilien",
                ebitValue: 4.5,
                umsatzValue: 0.81,
                text: "Textilien und Bekleidung"
            },
            {
                key: "transport",
                ebitValue: 4.85,
                umsatzValue: 0.64,
                text: "Transport, Logistik und Touristik"
            },
            {
                key: "umwelttechnik",
                ebitValue: 5.6,
                umsatzValue: 0.85,
                text: "Umwelttechnik"
            },
            {
                key: "versorgungswirtschaft",
                ebitValue: 5.6,
                umsatzValue: 0.85,
                text: "Versorgungswirtschaft"
            }
        ],
        lageOptions: [
            {
                key: "städtisch",
                value: 1,
                text: "städtisch"
            },
            {
                key: "ländlich",
                value: 0.8,
                text: "ländlich"
            }
        ]
    };

    useEffect(() => {
        checkValidity();
        // console.log("basisInfoData", basisInfoData);
        // console.log("Valid", isValid);
    }, [basisInfoData]);

    const handleChange = (event, { name, value }) => {
        console.log(`Handle change for ${name} with value: ${value}`);

        if (name === "alter") {
            if (value === "+") {
                dispatch(setAlter(basisInfoData.alter + 1));
            } else if (value === "-") {
                if (basisInfoData.alter > 1) {
                    dispatch(setAlter(basisInfoData.alter - 1));
                } else {
                    window.alert("Der Minimalwert für dieses Eingabefeld wurde erreicht.");
                }
            } else if (!isNaN(value)) {
                dispatch(setAlter(parseInt(value)));
            }
        } else if (name === "branche") {
            console.log("Value for branche:", value);
            const selectedBranch = basisInfos.branchOptions.find(
                (option) => option.key === value
            );
            console.log("Selected Branch:", selectedBranch);
            if (selectedBranch) {
                dispatch(setBranche(selectedBranch));
            } else {
                dispatch(setBranche({}));
            }
        } else if (name === "lage") {
            const selectedLage = basisInfos.lageOptions.find(
                (option) => option.key === value
            );
            console.log("Selected Lage:", selectedLage);
            dispatch(setLage(selectedLage));
        }
    };

    const checkValidity = () => {
        let errors = [];

        if (!basisInfoData.branche || basisInfoData.branche.key === "") {
            errors.push("Bitte wählen Sie eine Branche aus.");
        }

        if (!basisInfoData.lage || (basisInfoData.lage.key !== "städtisch" && basisInfoData.lage.key !== "ländlich")) {
            errors.push("Bitte wählen Sie eine Lage aus.");
        }
        if (!basisInfoData.alter || basisInfoData.alter <= 0) {
            errors.push("Der Minimalwert für dieses Eingabefeld wurde erreicht oder das Feld ist leer.");
        }

        dispatch(setError(errors));

        const valid = errors.length === 0;
        dispatch(setValidity(valid));
    };

    const handleWeiterClick = () => {
        if (!isValid) {
            return;
        }

        // Pass this info back to the parent when Weiter is clicked
        props.onWeiterClick();
    };

    return (
        <Grid padded className="shared-section basis-info">
            <Grid.Column>
                <Header as="h2">1. Basisinformationen zum Unternehmen</Header>
                <Divider />
                <Form>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Form.Field>
                                <label>Branche*</label>
                                <Select
                                    className="wideSelect"
                                    options={basisInfos.branchOptions.map((option) => ({
                                        value: option.key,
                                        text: option.text,
                                    }))}
                                    name="branche"
                                    value={basisInfoData.branche?.key || ""}
                                    onChange={(event, { name, value }) =>
                                        handleChange(event, { name, value })
                                    }
                                    placeholder="Branche auswählen"
                                    required
                                />
                            </Form.Field>

                            <Form.Group inline>
                                <label>Lage*</label>
                                {basisInfos.lageOptions.map((option) => (
                                    <Form.Field key={option.key}>
                                        <Radio
                                            className={
                                                basisInfoData.lage?.value === option.value
                                                    ? "radio-selected"
                                                    : ""
                                            }
                                            name="lage"
                                            value={option.key}
                                            label={option.text}
                                            checked={
                                                basisInfoData.lage?.value === option.value
                                            }
                                            onChange={(event, { name, value }) =>
                                                handleChange(event, { name, value })
                                            }
                                            required
                                        />
                                    </Form.Field>
                                ))}
                            </Form.Group>

                            <Form.Group className="input-group">
                                <Form.Field>
                                    <label>Alter der Firma in Jahren*</label>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group className="input-container">
                                <Button
                                    icon="minus"
                                    data-type="minus"
                                    data-field="alter"
                                    onClick={(event) =>
                                        handleChange(event, { name: "alter", value: "-" })
                                    }
                                />
                                <input
                                    type="number"
                                    name="alter"
                                    className="form-control input-number-plusminus"
                                    min="1"
                                    value={basisInfoData.alter}
                                    onChange={(event) =>
                                        handleChange(event, {
                                            name: "alter",
                                            value: event.target.value,
                                        })
                                    }
                                    required
                                />
                                <Button
                                    icon="plus"
                                    data-type="plus"
                                    data-field="alter"
                                    onClick={(event) =>
                                        handleChange(event, { name: "alter", value: "+" })
                                    }
                                />
                            </Form.Group>
                        </Grid.Column>
                    </Grid>

                    <Form.Field>
                        <p className="required-fields-hint">
                            <span className="required">*</span>Diese Eingaben sind Pflichtfelder
                        </p>
                    </Form.Field>

                    <Form.Field>
                        <div className="button-container">
                            <Button
                                className="click-continue"
                                primary
                                type="submit"
                                onClick={handleWeiterClick}
                            >
                                Weiter
                            </Button>
                        </div>
                    </Form.Field>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default BasisInfo;

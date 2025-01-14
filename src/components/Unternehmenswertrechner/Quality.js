import React, { useEffect } from 'react';
import { Grid, Header, Divider, Form, Label, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setQualityData } from '../../redux/qualitySlice';
import { setValidity, setError } from '../../redux/reducers';

const Quality = (props) => {
    const dispatch = useDispatch();
    const isValid = useSelector(state => state.validation.isValid);
    const qualityData = useSelector((state) => state.quality.qualityData);

    useEffect(() => {
        // console.log("qualityData:", qualityData);
        checkValidity();
    }, [qualityData]);

    const handleWeiterClick = () => {
        if (!isValid) {
            return;
        }

        // Pass this info back to the parent when Weiter is clicked
        props.onWeiterClick();
    };

    const handleQualityChange = (fieldName, value, options) => {
        const selectedOption = options.find((option) => option.value === value);
        const text = selectedOption ? selectedOption.text : "";

        dispatch(
            setQualityData({
                ...qualityData,
                [fieldName]: {
                    value: value,
                    text: text,
                },
            })
        );
    };

    const checkValidity = () => {
        let errors = [];

        // Klumpenrisiken
        if (!qualityData.kundenabhaengigkeit || qualityData.kundenabhaengigkeit.value === "") {
            errors.push("Bitte wählen Sie die Abhängigkeit zum Kunden aus.");
        }

        if (!qualityData.mitarbeiterabhaengigkeit || qualityData.mitarbeiterabhaengigkeit.value === "") {
            errors.push("Bitte wählen Sie die Abhängigkeit zu den wichtigsten Mitarbeitern aus.");
        }

        if (!qualityData.lieferantenabhaengigkeit || qualityData.lieferantenabhaengigkeit.value === "") {
            errors.push("Bitte wählen Sie die Abhängigkeit zu Lieferanten aus.");
        }

        if (!qualityData.produktdiversifikation || qualityData.produktdiversifikation.value === "") {
            errors.push("Bitte wählen Sie die Produktdiversifikation aus.");
        }

        // Abhängigkeit zum Unternehmer
        if (!qualityData.tagesgeschaeft || qualityData.tagesgeschaeft.value === "") {
            errors.push("Bitte wählen Sie die Einbindung ins Tagesgeschäft aus.");
        }

        if (!qualityData.fernbleiben || qualityData.fernbleiben.value === "") {
            errors.push("Bitte wählen Sie aus, wie lange Sie vom Unternehmen fern bleiben können.");
        }

        if (!qualityData.absenz || qualityData.absenz.value === "") {
            errors.push("Bitte wählen Sie die unerwartete Absenz aus.");
        }

        if (!qualityData.kundenbeziehung || qualityData.kundenbeziehung.value === "") {
            errors.push("Bitte wählen Sie die Beziehung zu den Kunden aus.");
        }

        dispatch(setError(errors));

        const valid = errors.length === 0;
        dispatch(setValidity(valid));
    };

    return (
        <Grid padded className="shared-section quality">
            <Grid.Column>
                <Header as="h2">5. Qualitative Anpassungen</Header>
                <Divider />
                <Form>
                    <Form.Group>
                        <Form.Field>
                            <h3>1. Klumpenrisiken</h3>
                            <Label htmlFor="kundenabhaengigkeit" className="form-label">
                                Abhängigkeit zum Kunden<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="kundenabhaengigkeit"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '0.7',
                                        text: 'Das Unternehmen hat eine starke Abhängigkeit zu den besten drei Kunden.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Das Unternehmen hat eine moderate Abhängigkeit zu den besten drei Kunden.',
                                    },
                                    {
                                        value: '1.2',
                                        text:
                                            'Das Unternehmen hat einen sehr diversifizierten Kundenstamm und eine schwache Abhängigkeit gegenüber den besten drei Kunden.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.kundenabhaengigkeit?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="mitarbeiterabhaengigkeit" className="form-label">
                                Abhängigkeit zu den wichtigsten Mitarbeitern<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="mitarbeiterabhaengigkeit"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '0.7',
                                        text: 'Die wichtigsten Mitarbeiter wären nur schwer zu ersetzen.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Die wichtigsten Mitarbeiter wären innerhalb eines Jahres ersetzbar.',
                                    },
                                    {
                                        value: '1.2',
                                        text: 'Die wichtigsten Mitarbeiter wären in unter einer Woche erstetzbar.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.mitarbeiterabhaengigkeit?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="lieferantenabhaengigkeit" className="form-label">
                                Abhängigkeit zu Lieferanten<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="lieferantenabhaengigkeit"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '0.7',
                                        text: 'Wenn ein Lieferant ausfällt, lässt sich dieser kaum ersetzen.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Wenn ein Lieferant ausfällt, lässt dieser sich innerhalb eines Monats ersetzen.',
                                    },
                                    {
                                        value: '1.2',
                                        text: 'Das Unternehmen hat keine Abhängigkeit zu seinen Lieferanten.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.lieferantenabhaengigkeit?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="produktdiversifikation" className="form-label">
                                Produktdiversifikation<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="produktdiversifikation"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '1.1',
                                        text: 'Das Unternehmen ist gut diversifiziert und bietet Produkte in mehreren Kategorien / Branchen an.',
                                    },
                                    {
                                        value: '0.7',
                                        text: 'Das Unternehmen ist spezialisiert auf eine Produktkategorie.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.produktdiversifikation?.value}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Divider />

                    <Form.Group>
                        <Form.Field>
                            <h3>2. Abhängigkeit zum Unternehmer</h3>
                            <Label htmlFor="tagesgeschaeft" className="form-label">
                                Einbindung ins Tagesgeschäft<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="tagesgeschaeft"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '1.2',
                                        text: 'Der Unternehmer kann sich intensiv mit strategischen Fragen befassen.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Der Unternehmer muss einen großen Teil seiner Zeit dem Tagesgeschäft widmen.',
                                    },
                                    {
                                        value: '0.7',
                                        text: 'Der Unternehmer hat kaum Zeit für strategische Fragen, da das Tagesgeschäft einen Großteil seiner Zeit fordert.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.tagesgeschaeft?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="fernbleiben" className="form-label">
                                Wie lange können Sie vom Unternehmen fern bleiben<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="fernbleiben"
                                placeholder="Bitte auswählen"
                                options={[
                                    { value: '0.65', text: '3 Tage' },
                                    { value: '0.85', text: '3 Wochen' },
                                    { value: '1.2', text: '3 Monate' },
                                    { value: '1.5', text: '3 Jahre' },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.fernbleiben?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="absenz" className="form-label">
                                Unerwartete Absenz<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="absenz"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '1.3',
                                        text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten hätte keinen großen Einfluss auf das Unternehmen.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten würde zu Problemen bei unerwarteten Geschäftsvorfällen führen.',
                                    },
                                    {
                                        value: '0.7',
                                        text: 'Eine unerwartete Absenz des Unternehmers von mehreren Monaten wäre sehr schwierig.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.absenz?.value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Label htmlFor="kundenbeziehung" className="form-label">
                                Beziehung zu den Kunden<span className="required-mark">*</span>
                            </Label>
                            <Form.Select
                                className="form-select"
                                name="kundenbeziehung"
                                placeholder="Bitte auswählen"
                                options={[
                                    {
                                        value: '0.7',
                                        text: 'Der Unternehmer kennt den Großteil der Kunden persönlich und diese erwarten, dass dieser sich persönlich um sie kümmert.',
                                    },
                                    {
                                        value: '1',
                                        text: 'Der Unternehmer kennt zwar einen großen Teil der Kunden persönlich, diese erwarten aber nicht, dass dieser sich persönlich um sie kümmert.',
                                    },
                                    {
                                        value: '1.2',
                                        text: 'Der Unternehmer kennt kaum Kunden persönlich.',
                                    },
                                ]}
                                onChange={(e, { name, value, options }) => handleQualityChange(name, value, options)}
                                value={qualityData.kundenbeziehung?.value}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field>
                        <p className="required-fields-hint">
                            <span className="required">*</span>Diese Eingaben sind Pflichtfelder
                        </p>
                    </Form.Field>

                    <Form.Field>
                        <div className="button-container">
                            <Button className="click-back" onClick={props.onZuruckClick}>Zurück</Button>
                            <Button className="click-continue" primary type="submit" onClick={handleWeiterClick}>
                                Weiter
                            </Button>
                        </div>
                    </Form.Field>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Quality;

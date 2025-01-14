import React, { useEffect } from 'react';
import { Grid, Header, Icon, Message, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnternehmenwert } from '../../redux/sectionsSlice';
import {setBereinigungEbitAverage, setValueForBereinigungEbit} from "../../redux/bereinigungSlice";

const Ausgabe = () => {
    const dispatch = useDispatch();
    const isValid = useSelector((state) => state.validation.isValid);
    const errors = useSelector((state) => state.validation.error);
    const finishedSections = useSelector((state) => state.sections.sectionData.finishedSections);
    const basisInfoData = useSelector((state) => state.basisInfo.basisInfoData);
    const kennzahlenData = useSelector((state) => state.kennzahlen.kennzahlenData);
    const bereinigungData = useSelector((state) => state.bereinigung.bereinigungData);
    const equityBridgeData = useSelector((state) => state.equityBridge.equityBridgeData);
    const qualityData = useSelector((state) => state.quality.qualityData);
    const unternehmenswert = useSelector((state) => state.sections.sectionData.unternehmenswert);

    useEffect(() => {
        calculateBereinigungEbit();
        const calculatedUnternehmenwert = calculateUnternehmenwert();
        // console.log("unternehmenwert:", calculatedUnternehmenwert);
        // console.log("kennzahlenData:", kennzahlenData);
        // console.log("bereinigungData:", bereinigungData);
        // console.log("equityBridgeData:", equityBridgeData);
        // console.log("qualityData:", qualityData);
        dispatch(setUnternehmenwert(calculatedUnternehmenwert));
    }, [unternehmenswert, finishedSections, basisInfoData, kennzahlenData, bereinigungData, equityBridgeData,qualityData]);

    const calculateBereinigungEbit = () => {
        const { gehalt, anpassungEbit, typischGehalt } = bereinigungData;

        bereinigungData.bereinigungEbit.forEach((item, index) => {
            if (!kennzahlenData.ebit[index] || !gehalt[index] || !anpassungEbit[index]) {
                return;
            }

            const kennzahlenDataEbit = parseFloat(kennzahlenData.ebit[index].value) || 0;
            const gehaltValue = parseFloat(gehalt[index].value) || 0;
            const anpassungEbitValue = parseFloat(anpassungEbit[index].value) || 0;
            const typischGehaltValue = parseFloat(typischGehalt) || 0;
            const bereinigtesEbitValue = (kennzahlenDataEbit + gehaltValue + anpassungEbitValue) - typischGehaltValue;

            if (bereinigungData.bereinigungEbit[index].value !== bereinigtesEbitValue) {
                dispatch(setValueForBereinigungEbit({ year: item.year, value: bereinigtesEbitValue }));
            }
        });

        const bereinigungEbitValues = bereinigungData.bereinigungEbit.map((item) => parseFloat(item.value) || 0);
        const bereinigungEbitAverage = Math.round(bereinigungEbitValues.reduce((sum, value) => sum + value, 0) / bereinigungEbitValues.length);

        if (bereinigungData.bereinigungEbitAverage !== bereinigungEbitAverage) {
            dispatch(setBereinigungEbitAverage(bereinigungEbitAverage));
        }
    };

    const calculateEquityUnternehmenwert = (qualityData, unternehmenwert) => {
        const {
            kundenabhaengigkeit,
            mitarbeiterabhaengigkeit,
            lieferantenabhaengigkeit,
            produktdiversifikation,
            tagesgeschaeft,
            fernbleiben,
            absenz,
            kundenbeziehung
        } = qualityData;

        const kundenabhaengigkeitValue = parseFloat(kundenabhaengigkeit?.value) || 1;
        const mitarbeiterabhaengigkeitValue = parseFloat(mitarbeiterabhaengigkeit?.value) || 1;
        const lieferantenabhaengigkeitValue = parseFloat(lieferantenabhaengigkeit?.value) || 1;
        const produktdiversifikationValue = parseFloat(produktdiversifikation?.value) || 1;
        const tagesgeschaeftValue = parseFloat(tagesgeschaeft?.value) || 1;
        const fernbleibenValue = parseFloat(fernbleiben?.value) || 1;
        const absenzValue = parseFloat(absenz?.value) || 1;
        const kundenbeziehungValue = parseFloat(kundenbeziehung?.value) || 1;

        const totalValue = (
            kundenabhaengigkeitValue +
            mitarbeiterabhaengigkeitValue +
            lieferantenabhaengigkeitValue +
            produktdiversifikationValue +
            tagesgeschaeftValue +
            fernbleibenValue +
            absenzValue +
            kundenbeziehungValue
        );

        const averageValue = totalValue / Object.keys(qualityData).length;

        const newUnternehmenwert = unternehmenwert * averageValue;

        // console.log("unternehmenwert (equity):", newUnternehmenwert);

        return newUnternehmenwert;
    };

    const calculateAlterWert = (unternehmenwert) => {
        const alter = basisInfoData.alter;

        if (alter >= 1 && alter < 5) {
            unternehmenwert *= 1;
        } else if (alter >= 5 && alter < 10) {
            unternehmenwert *= 1.0064;
        } else if (alter >= 10 && alter < 25) {
            unternehmenwert *= 1.0127;
        } else if (alter >= 25 && alter < 50) {
            unternehmenwert *= 1.0255;
        } else if (alter >= 50) {
            unternehmenwert *= 1.0382;
        }

        return unternehmenwert;
    };

    const calculateUnternehmenwert = () => {
        const gewinnValues = kennzahlenData.gewinn.data.map((item) => item.value || 0);
        const gewinnSum = gewinnValues.reduce((total, value) => total + value, 0);
        const gewinnAverage = gewinnSum / gewinnValues.length;

        let unternehmenwert = 0;

        // console.log("finishedSections:", finishedSections);

        if (finishedSections.includes('basis')) {
            const sumEbitUmsatzBasis = (kennzahlenData.averageValues.averageUmsatz * basisInfoData.branche.umsatzValue * basisInfoData.lage.value) +
                (kennzahlenData.averageValues.averageEbit * basisInfoData.branche.ebitValue * basisInfoData.lage.value);
            unternehmenwert = sumEbitUmsatzBasis * gewinnAverage;
            // console.log("sumEbitUmsatzBasis:", sumEbitUmsatzBasis);
        }

        if (finishedSections.includes('kennzahlen')) {
            const sumEbitUmsatzKennzahlen = (kennzahlenData.averageValues.averageUmsatz * basisInfoData.branche.umsatzValue * basisInfoData.lage.value) +
                (bereinigungData.bereinigungEbitAverage * basisInfoData.branche.ebitValue * basisInfoData.lage.value);

            // console.log("sumEbitUmsatzKennzahlen:", sumEbitUmsatzKennzahlen);

            unternehmenwert = sumEbitUmsatzKennzahlen * gewinnAverage;
            // console.log("unternehmenwert (kennzahlen):", unternehmenwert);
        }

        if (finishedSections.includes('bereinigung')) {
            console.log("unternehmenwert (aktuell):", unternehmenwert);
            const bargeldBestand = parseFloat(equityBridgeData.bargeldBestand) || 0;
            const finanzSchulden = parseFloat(equityBridgeData.finanzSchulden) || 0;
            unternehmenwert = (unternehmenwert + bargeldBestand) - finanzSchulden;
            // console.log("unternehmenwert (bereinigung):", unternehmenwert);
        }

        if (finishedSections.includes('equity')) {
            unternehmenwert = calculateEquityUnternehmenwert(qualityData, unternehmenwert);
        }

        // console.log("unternehmenwert:", unternehmenwert);

        unternehmenwert = calculateAlterWert(unternehmenwert);

        return unternehmenwert;
    };

    const formatValue = (value) => {
        if (value >= 1e9) {
            const valueInBillion = value / 1e9;
            const roundedValue = Math.round(valueInBillion * 10) / 10;
            let formattedValue = roundedValue.toFixed(1);

            if (formattedValue.endsWith(".0")) {
                formattedValue = parseInt(formattedValue).toString();
            }

            return formattedValue + " Milliarden EUR";
        } else {
            const valueInMillion = value / 1e6;
            const roundedValue = Math.round(valueInMillion * 10) / 10;
            let formattedValue = roundedValue.toFixed(1);

            if (formattedValue.endsWith(".0")) {
                formattedValue = parseInt(formattedValue).toString();
            }

            return formattedValue + " Mio EUR";
        }
    };

    const resultContent = isValid ? (
        <Grid.Column className="default">
            <Header as="h3" className="title">
                vorläufiger Unternehmenswert
            </Header>
            <Icon name="arrow down" size="big" className="icon icon-white" />
            <p className="ertragswert">{formatValue(unternehmenswert)}</p>
            <Message warning className="warning innacurate-calculation">
                <p className="my-0">
                    Das ist ein vorläufig berechneter Wert. Füllen Sie weitere Felder aus, um einen genaueren zu Wert zu erhalten.
                </p>
            </Message>
        </Grid.Column>
    ) : (
        <Grid.Column className="input-error">
            <p>
                <strong>Wert ungültig</strong>
            </p>
            {errors && errors.map((error, index) => <p className="error-ertragswert" key={index}>{error || "Ertragswert kann nicht berechnet werden"}</p>)}
        </Grid.Column>
    );

    return (
        <Grid className="Ausgabe">
            <Grid.Row className="result-inner-wrapper text-center warning-active">
                <Grid.Column textAlign="center">
                    <Header as="h2" className="intro">Individuelle Einschätzung Ihres Unternehmens</Header>
                    <Grid className="result">
                        {resultContent}
                        {!isValid ? (
                            <Message negative className="error-message negative-entry">
                                <p>
                                    Bitte beachten Sie, dass unser Unternehmenswertrechner keine negativen Werte für dieses Feld erlaubt. Für eine individuelle
                                    Berechnung können Sie gern direkt Kontakt mit uns aufnehmen.
                                </p>
                                <Button icon href="mailto:ub@orgaplan-beratung.de" title="Jetzt Kontakt aufnehmen">
                                    <Icon name="mail" />
                                </Button>
                            </Message>
                        ) : (
                            <Message className="error-message small-entry">
                                <p>
                                    Die von Ihnen eingegeben Kennzahlen sind leider zu gering, um einen Unternehmenswert zu berechnen. Für eine individuelle
                                    Berechnung können Sie gern direkt Kontakt mit uns aufnehmen.
                                </p>
                                <Button icon href="mailto:ub@orgaplan-beratung.de" title="Jetzt Kontakt aufnehmen">
                                    <Icon name="mail" />
                                </Button>
                            </Message>
                        )}
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Ausgabe;

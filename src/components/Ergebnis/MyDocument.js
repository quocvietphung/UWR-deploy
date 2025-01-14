import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const MyDocument = ({ kennzahlenData, basisInfoData, bereinigungData, equityBridgeData, unternehmenswert, ergebnisData }) => {

    const logoImage = 'assets/images/ORGAPLANLOGO.png';
    const brancheRadar = 'assets/images/branche_radar.png';
    const lage = 'assets/images/lage.png';
    const marktDaten = 'assets/images/marktdaten.png';
    const equity = 'assets/images/equity.png';

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: '10 30',
        },
        header: {
            marginBottom: 10,
            backgroundColor: '#f5f5f5',
        },
        logo: {
            width: 160,
            height: 60,
            margin: 'auto',
        },
        horizontalLine: {
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            marginBottom: 20,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignSelf: 'stretch',
            paddingVertical: 10,
            backgroundColor: '#f5f5f5',
        },
        footerText: {
            textAlign: 'center',
            fontSize: 12,
            fontStyle: 'italic',
            color: '#888',
            marginTop: 10,
        },
        title: {
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 150,
            marginBottom: 80,
        },
        subtitle: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 5,
        },
        content: {
            marginVertical: 5,
            fontSize: 14,
            lineHeight: 1.5,
            textAlign: 'justify',
            alignSelf: 'stretch',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'gray',
        },
        table: {
            marginTop: 10,
            display: 'table',
            width: 'auto',
            borderWidth: 0, // Removed border
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCellHeader: {
            color:"white",
            margin: 'auto',
            padding: 10,
            fontSize: 12,
        },
        tableCell: {
            margin: 'auto',
            fontSize: 12,
        },
        tableCol: {
            backgroundColor: '#f5f5f5',
            width: '50%',
            borderWidth: 0, // Removed border
        },
        tableRowHeader: {
            padding: 5,
            margin: 2,
            width: '80%',
            borderWidth: 0, // Removed border
            backgroundColor: '#003366',
        },
        tableColHeader: {
            padding: 5,
            margin: '2 1',
            width: '50%',
            borderWidth: 0,
            backgroundColor: '#1abc9c',
        },
        image: {
            margin: '0 auto',
            width: 550,
            height: 300,
        },
        imageTitle: {
            marginTop: 10,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10
        },
        borderWrapper: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffc658',
            padding: 10,
            height: 120,
            borderRadius: 30,
        },
        leftText: {
            fontWeight: 'bold',
            maxWidth: 180,
            wordWrap: 'break-word',
            marginLeft: 30
        },
        rightText: {
            fontSize: 26,
            fontWeight: 'bold',
            marginRight: 30
        }
    });

    // Hàm định dạng số tiền theo chuẩn Đức (dùng dấu chấm để phân cách hàng nghìn và dấu phẩy cho số thập phân)
    const formatCurrency = (value) => {
        if (value === null || value === '-' || isNaN(value)) {
            return '-';
        }
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const calculateEBITWachstum = (ebitData) => {
        let ebitWachstum = [];
        let sum = 0;
        let count = 0;

        for (let i = 0; i < ebitData.length - 1; i++) {
            if (i === 0) {
                ebitWachstum.push({
                    year: ebitData[i].year,
                    value: "-"
                });
            } else {
                const currentEBIT = ebitData[i].value;
                const previousEBIT = ebitData[i - 1].value;
                const growth = ((currentEBIT - previousEBIT) / previousEBIT) * 100; // calculate growth
                sum += growth;
                count++;
                ebitWachstum.push({
                    year: ebitData[i].year,
                    value: Math.round(growth) + "%"
                });
            }
        }

        // Calculate average EBIT Wachstum
        const average = sum / count;
        ebitWachstum.push({
            year: 'Average',
            value: Math.round(average) + "%"
        });

        return ebitWachstum;
    };

    const calculateGewinnmarge = (bereinigterEbitData, umsatzData) => {
        return bereinigterEbitData.map((bereinigterEbitObj, index) => {
            const umsatzValue = umsatzData[index]?.value || 0;
            const gewinnmarge = umsatzValue !== 0 ? Math.round((bereinigterEbitObj.value / umsatzValue) * 100) : 'N/A';
            return {
                year: bereinigterEbitObj.year,
                value: `${gewinnmarge}%`
            };
        });
    };

    const transformKennzahlenData = () => {
        const ebitData = kennzahlenData.ebit.map(ebitObj => ({
            year: ebitObj.year,
            value: ebitObj.value || 0
        }));

        ebitData.push({
            year: 'Average',
            value: kennzahlenData.averageValues.averageEbit || 0
        });

        const anpassungEbitData = bereinigungData.anpassungEbit.map(anpassungEbitObj => ({
            year: anpassungEbitObj.year,
            value: anpassungEbitObj.value || 0
        }));

        // Push a dash for the average value
        anpassungEbitData.push({
            year: 'Average',
            value: "-"
        });

        const gehaltValues = bereinigungData.gehalt
            .map(gehaltObj => parseFloat(gehaltObj.value))
            .filter(value => !isNaN(value));

        const gehaltSum = gehaltValues.reduce((sum, value) => sum + value, 0)
        const gehaltAverage = Math.round(gehaltSum / gehaltValues.length);

        console.log("gehaltValues", gehaltValues);
        console.log("gehaltSum", gehaltSum);

        const verguetungGFData = bereinigungData.gehalt.map(gehaltObj => ({
            year: gehaltObj.year,
            value: gehaltObj.value || 0
        }));

        verguetungGFData.push({
            year: 'Average',
            value: gehaltAverage || 0
        });

        const bereinigterEbitData = bereinigungData.bereinigungEbit.map(bereinigterEbitObj => ({
            year: bereinigterEbitObj.year,
            value: bereinigterEbitObj.value || 0
        }));

        bereinigterEbitData.push({
            year: 'Average',
            value: bereinigungData.bereinigungEbitAverage || 0
        });

        const ebitWachstum = calculateEBITWachstum(ebitData);

        const umsatzData = kennzahlenData.umsatz.map(umsatzObj => ({
            year: umsatzObj.year,
            value: umsatzObj.value || 0
        }));

        // Push a dash for the average value
        umsatzData.push({
            year: 'Average',
            value: kennzahlenData.averageValues.averageUmsatz || 0
        });

        const gewinnmargeData = calculateGewinnmarge(bereinigterEbitData, umsatzData);

        console.log("gewinnmargeData", gewinnmargeData);

        const jahresAbschlussAnalyseData = {
            'EBIT': ebitData,
            'Sonst. Bereinigung EBIT': anpassungEbitData,
            'Vergütung GF': verguetungGFData,
            'Bereinigter EBIT': bereinigterEbitData,
            'EBIT Wachstum': ebitWachstum,
            'Umsatz': umsatzData,
            'Gewinnmarge': gewinnmargeData,
        }

        return jahresAbschlussAnalyseData;
    }

    const jahresAbschlussAnalyseData = transformKennzahlenData();

    const columnHeaders = jahresAbschlussAnalyseData['EBIT'].map(datum => datum.year);

    const rowHeaders = Object.keys(jahresAbschlussAnalyseData);

    const tableData = rowHeaders.map(rowHeader => jahresAbschlussAnalyseData[rowHeader].map(datum => datum.value));

    const equityData = {
        'Nettofinanzschulden': equityBridgeData.finanzSchulden,
        'Nicht betriebsnotwendiges Vermögen': equityBridgeData.bargeldBestand,
    };

    const EquityTable = ({ data }) => (
        <View style={styles.table}>
            {Object.entries(data).map(([header, value]) => (
                <View key={header} style={styles.tableRow}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableCellHeader}>{header}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.tableCell]}>{formatCurrency(value)}</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    const Header = () => (
        <View>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: logoImage,
                        method: 'GET',
                        headers: {},
                        body: '',
                    }}
                />
            </View>
            <View style={styles.horizontalLine}></View>
        </View>
    );

    const formatCell = (rowHeaders, rowIndex, cell) => {
        const headersRequireEuro = ['EBIT', 'Sonst. Bereinigung EBIT', 'Vergütung GF', 'Bereinigter EBIT', 'Umsatz'];
        if(headersRequireEuro.includes(rowHeaders[rowIndex]) && cell !== '-' && cell !== null) {
            return `${formatCurrency(cell)}`;
        } else if (cell === null) {
            return '';
        } else {
            return cell;
        }
    }

    const formatUnternehmenswert = (unternehmenswert) => {
        const roundedValue = Math.round(unternehmenswert).toString();
        const formattedValue = roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedValue;
    };

    const Table = ({ rowHeaders, colHeaders, data }) => (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={[styles.tableColHeader, { width: '80%' }]}></View> {/* Empty cell */}
                {colHeaders && colHeaders.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>{cell}</Text>
                    </View>
                ))}
            </View>
            {data.length === 0 ? (
                rowHeaders.map((header, index) => (
                    <View key={index} style={styles.tableRow}>
                        <View style={styles.tableRowHeader}>
                            <Text style={styles.tableCellHeader}>{header}</Text>
                        </View>
                        {colHeaders && colHeaders.map((colHeader, colIndex) => (
                            <View key={colIndex} style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        ))}
                    </View>
                ))
            ) : (
                data.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.tableRow}>
                        <View style={styles.tableRowHeader}>
                            <Text style={styles.tableCellHeader}>{rowHeaders[rowIndex]}</Text>
                        </View>
                        {row.map((cell, cellIndex) => (
                            <View key={cellIndex} style={styles.tableCol}>
                                <Text style={[styles.tableCell, rowHeaders[rowIndex] === 'Bereinigter EBIT' ? { color: '#ffc658' } : null]}>
                                    {formatCell(rowHeaders, rowIndex, cell)}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))
            )}
        </View>
    );

    const PageNumber = ({ pageNumber }) => (
        <Text style={styles.pageNumber}>{pageNumber}</Text>
    );

    return (
        <Document>
            <Page style={[styles.page, { backgroundColor: '#1abc9c' }]}>
                <Header />
                <Text style={styles.title}>Unternehmensbewertung</Text>
                <Text style={[styles.content, { fontSize: 26, textAlign: 'center' }]}>
                    Kundenname: {ergebnisData.firstName} {ergebnisData.lastName}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Schanzenstraße 58, 40549 Düsseldorf</Text>
                    <Text style={styles.footerText}>Tel: 0211 17454919</Text>
                    <Text style={styles.footerText}>Email: stermann@orgaplan-beratung.de</Text>
                </View>
            </Page>
            <Page style={styles.page}>
                <Header />
                <Text style={styles.subtitle}>1. Basis-Informationen</Text>
                <Text style={styles.content}>
                    Branche: {basisInfoData.branche?.text || ''} {'\n'}
                    Lage: {basisInfoData.lage?.text || ''} {'\n'}
                    Alter: {basisInfoData.alter || ''}
                </Text>
                <Text style={styles.subtitle}>2. Jahresabschluss-Analyse</Text>
                <Table rowHeaders={rowHeaders} colHeaders={columnHeaders} data={tableData} />
                <Text style={[styles.content, { marginTop: 50}]}>
                    Branchenübliche Vergütung Geschäftsführer: {formatCurrency(bereinigungData.typischGehalt || 0)}
                </Text>
                <PageNumber pageNumber="1" />
            </Page>
            <Page style={styles.page}>
                <Header />
                <Text style={styles.subtitle}>3. Bandbreite von Bewertungsmultiples</Text>
                <Text style={[styles.content,  { marginBottom: 0 }]}>
                    Die Anwendung von Multiples zur Bewertung von Unternehmen ist in der Praxis weit verbreitet.
                    Sie ermöglichen den Vergleich mit bereits verkauften Unternehmen. Dabei wird der Verkaufspreis
                    als ein Vielfaches (Multiple) einer bestimmten Basisgröße, wie beispielsweise des Umsatzes oder
                    Gewinns des Unternehmens, betrachtet. Bei der Berechnung des Multiplikators durch Orgaplan Beratung
                    basieren wir auf Markt­daten, die wir für vergleichbare Unternehmen (Branche, Größe) beobachtet
                    haben, sowie auf den spezifischen Angaben Ihres Unternehmens. Der EBIT (Ergebnis vor Zinsen und
                    Steuern) wird bei der Bewertung von mittelständischen Unternehmen um Sonderfaktoren und mögliche
                    Kompensationen aufgrund der Unternehmensführung bereinigt, da andernfalls das Ergebnis erheblich
                    verfälscht werden könnte. Der Umsatz-Multiple dient in diesem Bewertungsprozess als zusätzliche
                    Information, hat jedoch in der Regel eine geringere Aussagekraft und wird entsprechend weniger
                    stark gewichtet.
                </Text>
                <Image
                    style={[styles.image]}
                    source={{
                        uri: brancheRadar,
                        method: 'GET',
                        headers: {},
                        body: '',
                    }}
                />
                <Text style={styles.imageTitle}>Abbildung 1: Der EBIT-Umsatzfaktor in verschiedenen Branchengruppen.</Text>
                <PageNumber pageNumber="2" />
            </Page>
            <Page style={styles.page}>
                <Header />
                <Text style={styles.content}>
                    Der Unternehmenswert (Enterprise Value) ist ein wichtiger Kennwert bei der Finanzanalyse eines
                    Unternehmens. Er spiegelt den Gesamtwert des Unternehmens wider, indem der Wert der Aktien und
                    Schulden berechnet und anschließend um den vorhandenen Bargeld- und Bargeldäquivalentenbestand
                    reduziert wird.
                </Text>
                <Text style={styles.content}>
                    Um den Unternehmenswert zu berechnen, müssen Informationen über das Einkommen, den Umsatz, den
                    Gewinn vor Steuern (EBIT) und andere relevante Faktoren gesammelt werden. Anschließend wird der
                    Durchschnittswert des Einkommens berechnet, indem der Wert des Einkommens aggregiert und durch
                    die Anzahl der Einträge geteilt wird. Daraufhin werden Faktoren wie Umsatz, EBIT, Branche und
                    Position des Unternehmens verwendet, um die erforderlichen Komponenten für den Unternehmenswert
                    zu berechnen. Das Ergebnis dieser Berechnung wird zusammengefasst, um den Unternehmenswert zu
                    ermitteln.
                </Text>
                <Image
                    style={[styles.image, { width: 450 , height: 300}]}
                    source={{
                        uri: lage,
                        method: 'GET',
                        headers: {},
                        body: '',
                    }}
                />
                <Text style={styles.imageTitle}>Abbildung 2: Wertfaktor nach Lage (Value Factor based on Location)</Text>
                <PageNumber pageNumber="3" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Image
                    style={[styles.image, {marginTop: 30, width: 580 , height: 400}]}
                    source={{
                        uri: marktDaten,
                        method: 'GET',
                        headers: {},
                        body: '',
                    }}
                />
                <Text style={styles.imageTitle}>Abbildung 3: Wertfaktor von EBIT und Umsatz (Value Factor of EBIT and Revenue)</Text>
                <PageNumber pageNumber="4" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={styles.subtitle}>4. Details zu qualitativen Werttreibern</Text>
                <Text style={styles.content}>
                    Um die Vergleichbarkeit mit ähnlichen Unternehmen herzustellen, werden Zu- und Abschläge verwendet,
                    um Branchen-Multiples zu ermitteln. Bei einer gründlichen Analyse sollten idealerweise eine Vielzahl
                    von Faktoren berücksichtigt und von einem externen Berater analysiert werden. Dies ist wichtig für
                    eine aussagekräftige Bewertung, da der Unternehmer sonst sowohl Akteur als auch Betroffener ist.
                    Der Orgaplan Beratung Firmenwertrechner dient lediglich als erster Anhaltspunkt und fragt daher nur
                    nach den qualitativen Kriterien, die unserer Erfahrung nach die größten Auswirkungen auf den
                    Kaufpreis haben.
                </Text>

                <Text style={styles.content}>Durch Bewertung und Verbesserung der Qualität kann ein Unternehmen seinen Wert steigern. Qualität spielt eine wichtige Rolle bei der Bestimmung des Wettbewerbs und des Gewinnpotenzials eines Unternehmens sowie bei der Anziehung von Investitionen und dem Aufbau von Vertrauen bei Kunden und Stakeholdern.</Text>

                <Text style={[styles.subtitle, { fontSize: 18 }]}>4.1 Klumpenrisiken</Text>
                <Text style={styles.content}>Bewertung des Ausmaßes der Abhängigkeit des Unternehmens von wenigen wichtigen Kunden. Wenn ein Unternehmen nur von wenigen Kunden abhängig ist, besteht ein höheres Risiko, wenn diese Kunden verloren gehen. Ein Unternehmen mit hoher Qualität hat eine vielfältige Kundenbasis und ist nicht stark von wenigen wichtigen Kunden abhängig.</Text>
                <Text style={styles.content}>
                    Klumpenrisiken beziehen sich auf die Risiken, die mit einer starken Abhängigkeit von bestimmten Kunden, Mitarbeitern, Lieferanten oder Produkten in einem Unternehmen verbunden sind. Diese Abhängigkeiten können die Stabilität und Nachhaltigkeit des Unternehmens gefährden.
                </Text>
                <Text style={styles.content}>
                    Im Folgenden finden Sie eine Analyse der wichtigsten Faktoren im Zusammenhang mit Klumpenrisiken:
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.1.1 Kundenabhängigkeit</Text>
                <Text style={styles.content}>
                    Kundenabhängigkeit (kundenabhaengigkeit): Das Ausmaß der Abhängigkeit von Kunden kann sich erheblich auf die Stabilität des Unternehmens auswirken. Wenn das Unternehmen nur von wenigen Top-Kunden abhängig ist, kann es bei Veränderungen in
                </Text>
                <PageNumber pageNumber="5" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={styles.content}>
                    der Beziehung zu diesen Kunden erhebliche Schwierigkeiten haben. Dies gilt insbesondere, wenn strategische Kunden verloren gehen oder wenn Kunden einen großen Anteil des Umsatzes ausmachen. Unternehmen mit einer breiteren Kundenbasis haben ein geringeres Risiko von Klumpenrisiken.
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.1.2 Mitarbeiterabhängigkeit</Text>
                <Text style={styles.content}>
                    Die Abhängigkeit von wichtigen Mitarbeitern kann ein Risikofaktor sein. Wenn Schlüsselmitarbeiter im Unternehmen nur schwer zu ersetzen sind, kann dies den Geschäftsbetrieb und die Entwicklung des Unternehmens beeinträchtigen. Daher ist es wichtig, ein vielfältiges und schnell ersetzbares Mitarbeiter-Team zu haben, um Klumpenrisiken zu minimieren.
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.1.3 Lieferantenabhängigkeit</Text>
                <Text style={styles.content}>
                    Die Abhängigkeit von Lieferanten kann ebenfalls Klumpenrisiken verursachen. Wenn das Unternehmen nur einen einzigen Lieferanten für wichtige Rohstoffe oder Produkte hat, kann der Verlust dieses Lieferanten erheblichen Schaden für das Geschäft verursachen. Um dieses Risiko zu minimieren, ist es wichtig, Lieferanten zu diversifizieren und Partnerschaften mit mehreren Lieferanten aufzubauen.
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.1.4 Produktdiversifikation</Text>
                <Text style={styles.content}>
                    Die Diversifikation der Produkte ist ein wichtiger Faktor zur Minimierung von Klumpenrisiken. Wenn das Unternehmen sich nur auf eine Produktkategorie spezialisiert hat, kann es einem hohen Risiko ausgesetzt sein, wenn sich der Markt oder die Kundennachfrage ändern. Die Diversifikation der Produkte hilft dabei, sich an Marktveränderungen anzupassen und die Abhängigkeit von einem einzelnen Produkt zu reduzieren.
                </Text>
                <Text style={styles.content}>
                    Insgesamt ist es wichtig, Kunden, Mitarbeiter, Lieferanten und Produkte zu diversifizieren, um Klumpenrisiken zu minimieren. Dies erfordert eine umfassende Geschäftsstrategie und sorgfältiges Risikomanagement, um die Stabilität und Nachhaltigkeit des Unternehmens zu gewährleisten.
                </Text>

                <PageNumber pageNumber="6" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={[styles.subtitle, { fontSize: 18 }]}>4.2 Abhängigkeit vom Unternehmer</Text>
                <Text style={styles.content}>Bestimmung des Maßes, in dem das Unternehmen von entscheidenden Unternehmensinhabern abhängt. Ein Unternehmen mit hoher Qualität hat die Fähigkeit, unabhängig von der Anwesenheit der Schlüsselunternehmer zu überleben und zu wachsen. Dies gewährleistet Nachhaltigkeit und die Fähigkeit zur Machtübertragung in der Zukunft.</Text>
                <Text style={styles.content}>
                    Hier sind die Bewertungskriterien für die Abhängigkeit vom Unternehmer:
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.2.1 Tagesgeschäft</Text>
                <Text style={styles.content}>
                    Die Art und Weise, wie der Unternehmer seine Zeit zwischen strategischen Fragen und dem Tagesgeschäft aufteilt, beeinflusst die Abhängigkeit vom Unternehmer. Wenn der Unternehmer intensiv in strategische Fragen involviert ist, kann er sich weniger um das Tagesgeschäft kümmern. Dies ermöglicht eine bessere strategische Ausrichtung des Unternehmens. Wenn der Unternehmer hingegen einen Großteil seiner Zeit dem Tagesgeschäft widmen muss, hat er weniger Zeit für strategische Entscheidungen.
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.2.2 Fernbleiben</Text>
                <Text style={styles.content}>
                    Die Dauer, für die der Unternehmer abwesend ist, hat Auswirkungen auf das Unternehmen. Wenn der Unternehmer nur für kurze Zeiträume abwesend ist, zum Beispiel für einige Tage oder Wochen, kann das Unternehmen den Betrieb reibungslos fortsetzen. Wenn der Unternehmer jedoch für längere Zeiträume, wie Monate oder Jahre, abwesend ist, kann dies zu erheblichen Problemen führen.
                </Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.2.3 Absenz</Text>
                <Text style={styles.content}>
                    Eine unerwartete Abwesenheit des Unternehmers kann das Unternehmen beeinflussen. Wenn der Unternehmer für mehrere Monate abwesend ist und dies keine großen Auswirkungen auf das Unternehmen hat, bedeutet dies, dass das Unternehmen über eine solide Organisationsstruktur und kompetentes Personal verfügt. Wenn jedoch eine unerwartete Abwesenheit des Unternehmers zu Problemen bei unerwarteten Geschäftsvorfällen führt, kann dies auf eine starke Abhängigkeit vom Unternehmer hinweisen.
                </Text>

                <PageNumber pageNumber="7" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={[styles.subtitle, { fontSize: 16 }]}>4.2.4 Kundenbeziehung</Text>
                <Text style={styles.content}>
                    Die persönliche Beziehung des Unternehmers zu den Kunden spielt ebenfalls eine Rolle. Wenn der Unternehmer den Großteil der Kunden persönlich kennt und diese erwarten, dass er sich persönlich um sie kümmert, kann dies zu einer starken Abhängigkeit vom Unternehmer führen. Wenn der Unternehmer zwar einen großen Teil der Kunden persönlich kennt, aber diese nicht erwarten, dass er sich persönlich um sie kümmert, kann die Abhängigkeit geringer sein.
                </Text>
                <Text style={styles.content}>
                    Insgesamt hat die Abhängigkeit vom Unternehmer Auswirkungen auf verschiedene Aspekte des Unternehmens. Eine geringere Abhängigkeit vom Unternehmer ermöglicht eine bessere Fokussierung auf strategische Fragen, eine reibungslose Betriebsfortführung während der Abwesenheit des Unternehmers und eine geringere Abhängigkeit von persönlichen Kundenbeziehungen.
                </Text>
                <Text style={styles.subtitle}>5. Vom Unternehmenswert zum Kaufpreis mittels Equity Bridge</Text>
                <Text style={styles.content}>
                    Der Unternehmenswertrechner ermittelt den Gesamtunternehmenswert, auch als Enterprise Value bezeichnet, des Zielunternehmens anhand von normalisierten Kennzahlen (EBIT) und unter Verwendung branchenüblicher Multiplikatoren. Dieser Wert wird durch qualitative Faktoren angepasst, um die Vergleichbarkeit mit anderen Unternehmen der Branche zu erhöhen.
                </Text>

                <Text style={styles.content}>
                    Der Enterprise Value entspricht nicht dem Kaufpreis, sondern repräsentiert ausschließlich den Wert
                    der operativen Vermögenswerte (Assets) des Unternehmens. Um den Wert des Eigenkapitals zu ermitteln,
                    werden die finanziellen Verbindlichkeiten und andere Faktoren vom Enterprise Value subtrahiert und
                    Barmittel und ähnliche Werte addiert. Es kann erhebliche Unterschiede zwischen dem ermittelten
                    Enterprise Value und dem Kaufpreis für Unternehmensanteile, dem sogenannten Equity Value, geben.
                    Diese Unterschiede hängen unter anderem von der Finanzierung des Zielunternehmens ab. Ohne diese
                    Betrachtung würden Unternehmen mit unterschiedlichen Fremdfinanzierungsgraden immer den gleichen Wert haben.
                </Text>

                <PageNumber pageNumber="8" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={styles.content}>
                    Das folgende Schaubild veranschaulicht die Vorgehensweise der Equity Bridge.
                </Text>
                <Image
                    style={[styles.image]}
                    source={{
                        uri: equity,
                        method: 'GET',
                        headers: {},
                        body: '',
                    }}
                />
                <Text style={styles.imageTitle}>Abbildung 4: Vorgehensweise der Equity Bridge.</Text>
                <Text style={styles.content}>
                    Die Vorgehensweise bei der Durchführung dieses Prozesses hat einen erheblichen Einfluss auf die Unternehmensbewertung und letztendlich auf den Kaufpreis. Es ist von großer Bedeutung sicherzustellen, dass keine wertvollen Vermögenswerte aufgrund von Unwissenheit aufgegeben werden. In solchen Fällen wird dringend empfohlen, einen erfahrenen Transaktionsberater hinzuzuziehen, da sonst leicht beträchtliche Geldbeträge verloren gehen können. Bei der Berechnung des tatsächlichen Firmenwerts werden die Verbindlichkeiten des Unternehmens abgezogen und das nicht-betriebsnotwendige Vermögen hinzugefügt. Dadurch entsteht ein realistischerer Wert für die Bewertung des Unternehmens und die Festlegung des Kaufpreises.
                </Text>
                <EquityTable data={equityData} />
                <PageNumber pageNumber="9" />
            </Page>

            <Page style={styles.page}>
                <Header />
                <Text style={[styles.subtitle, { fontSize: 16 }]}>
                    Wie exakt prognostiziert das Ergebnis einen möglichen Verkaufspreis?
                </Text>

                <Text style={styles.content}>
                    Es gibt keinen objektiven Firmenwert. Wie in der Bandbreite der jeweiligen Multiples deutlich wird, gibt es eine große Streuung der erzielten Verkaufspreise. Letztendlich hängt dies von der jeweiligen Situation ab und ist Verhandlungssache. Der Verkaufspreis wird stark vom Interesse und der Verhandlungsstärke des Verkäufers bzw. des Käufers/Investors beeinflusst. Wenn beispielsweise ein Käufer gute strategische Gründe für eine Übernahme hat, kann der Preis deutlich höher ausfallen. Wenn der Firmeninhaber aus persönlichen Gründen unter Zeitdruck steht, das Unternehmen zu veräußern, können möglicherweise deutlich niedrigere Verkaufspreise erzielt werden. Durch einen clever gestalteten Verkaufsprozess kann die Verhandlungsposition des Verkäufers gestärkt und die Wahrscheinlichkeit eines erfolgreichen Verkaufs erhöht werden.
                </Text>

                <View style={[styles.horizontalLine, { borderBottomColor: '#1abc9c', marginTop: 50 , marginBottom: 10 }]}></View>

                <View style={styles.borderWrapper}>
                    <Text style={styles.leftText}>Ungefährer Wert des Eigenkapitals (Verkaufspreis)</Text>
                    <Text style={styles.rightText}>{formatCurrency(unternehmenswert)}</Text>
                </View>

                <PageNumber pageNumber="10" />
            </Page>
        </Document>
    );
};

export default MyDocument;

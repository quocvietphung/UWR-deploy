import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import {useSelector} from "react-redux";

// Define the CSS styles for the PDF document
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh'
    },
    page: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    section: {
        margin: '20 20',
        padding: 10,
        flexGrow: 1
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 10
    },
    image: {
        margin: '0 auto',
        width: 560,
        height: 380,
    },
    imageTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
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
        borderWidth: 0, // Removed border
        backgroundColor: '#1abc9c',
    },
    borderWrapper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gold',
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
    },
});

const MyDocument = () => {
    const marktDaten = 'assets/images/marktdaten.png';

    const equityData = {
        'Nettofinanzschulden': 100,
        'Nicht betriebsnotwendiges Vermögen': 100,
    };

    const EquityTable = ({ data }) => (
        <View style={styles.table}>
            {Object.entries(data).map(([header, value]) => (
                <View key={header} style={styles.tableRow}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableCellHeader}>{header}</Text>
                    </View>
                    <View key={value} style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.tableCell]}>{value}</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Hello React PDF!</Text>
                    <Text style={styles.paragraph}>
                        This is a simple example of creating a PDF document using @react-pdf/renderer.
                    </Text>
                    <Image style={styles.image} src={marktDaten} />
                    <Text style={styles.imageTitle}>Abbildung 1: Grafik Marktdaten Ebit und Umsatz</Text>
                    <View style={styles.borderWrapper}>
                        <Text style={styles.leftText}>Ungefährer Wert des Eigenkapitals (Verkaufspreis)</Text>
                        <Text style={styles.rightText}>100000 €</Text>
                    </View>
                    <EquityTable data={equityData} />
                </View>
            </Page>
        </Document>
    );
};

const TestPDF = () => (
    <div style={styles.container}>
        <PDFViewer width="600" height="800px">
            <MyDocument />
        </PDFViewer>
    </div>
);

export default TestPDF;

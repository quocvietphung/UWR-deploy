import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Grid, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import './PDF.scss';
import MyDocument from "../components/Ergebnis/MyDocument";

const PDF = () => {
    const unternehmenswert = useSelector((state) => state.sections.sectionData.unternehmenswert);
    const basisInfoData = useSelector(state => state.basisInfo.basisInfoData);
    const kennzahlenData = useSelector((state) => state.kennzahlen.kennzahlenData);
    const bereinigungData = useSelector((state) => state.bereinigung.bereinigungData);
    const equityBridgeData = useSelector((state) => state.equityBridge.equityBridgeData);
    const ergebnisData = useSelector((state) => state.ergebnis.ergebnisData);

    const [isViewing, setIsViewing] = useState(true);

    const handleView = () => {
        setIsViewing(true);
    };

    const handleClose = () => {
        setIsViewing(false);
    };

    useEffect(() => {
        console.log('unternehmenswert:', unternehmenswert);
        console.log('equityBridgeData:', equityBridgeData);
        console.log('ergebnisData:', ergebnisData);
    }, [unternehmenswert, ergebnisData]);

    return (
        <Grid container stackable centered className="grid-container">
            <Grid.Row>
                <Grid.Column>
                    <h1>Create and View PDF</h1>
                    {!isViewing && (
                        <div>
                            <Button className="button" onClick={handleView}>View PDF</Button>
                        </div>
                    )}
                    {isViewing && (
                        <div>
                            <PDFViewer className="pdf-viewer" width={600} height={800}>
                                <MyDocument
                                    kennzahlenData={kennzahlenData}
                                    basisInfoData={basisInfoData}
                                    bereinigungData={bereinigungData}
                                    equityBridgeData={equityBridgeData}
                                    ergebnisData={ergebnisData}
                                    unternehmenswert={unternehmenswert}
                                />
                            </PDFViewer>
                            <PDFDownloadLink
                                className="pdf-download-link"
                                document={
                                    <MyDocument
                                        kennzahlenData={kennzahlenData}
                                        basisInfoData={basisInfoData}
                                        bereinigungData={bereinigungData}
                                        equityBridgeData={equityBridgeData}
                                        ergebnisData={ergebnisData}
                                        unternehmenswert={unternehmenswert}
                                    />
                                }
                                fileName="example.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Generating PDF...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                            <Button className="close-button" onClick={handleClose}>Close</Button>
                        </div>
                    )}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default PDF;

import React, { useState, useEffect } from 'react';
import { Grid, Form, Button, Icon, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setErgebnisData } from '../../redux/ergebnisSlice';
import { pdf } from '@react-pdf/renderer';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import MyDocument from './MyDocument';

const styles = {
    enterpriseResult: {
        margin: '40px auto',
        maxWidth: '1000px',
        borderRadius: '12px',
        backgroundColor: '#f8f9fa',
        padding: '30px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
            padding: '20px',
        },
    },
    headingContainer: {
        padding: '20px 0',
        textAlign: 'center',
        borderBottom: '2px solid #ececec',
        marginBottom: '20px',
    },
    headingTitle: {
        color: '#2c3e50',
        fontSize: '32px',
        fontWeight: 'bold',
        '@media (max-width: 768px)': {
            fontSize: '24px',
        },
    },
    ertragswertContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        marginBottom: '30px',
        '@media (max-width: 768px)': {
            padding: '15px',
        },
    },
    ertragswertTitle: {
        fontSize: '24px',
        color: '#34495e',
        fontWeight: '600',
        marginBottom: '10px',
        '@media (max-width: 768px)': {
            fontSize: '18px',
        },
    },
    ertragswert: (fontSize) => ({
        fontSize: fontSize,
        color: '#1abc9c',
        fontWeight: 'bold',
        marginTop: '10px',
    }),
    resultColumn: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        '@media (max-width: 768px)': {
            padding: '20px',
        },
    },
    resultForm: {
        marginTop: '30px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '24px',
        color: '#34495e',
        fontWeight: '600',
        '@media (max-width: 768px)': {
            fontSize: '20px',
        },
    },
    formDescription: {
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '25px',
        '@media (max-width: 768px)': {
            fontSize: '16px',
        },
    },
    formInput: {
        margin: '15px 0',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ced4da',
        fontSize: '16px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        ':hover': {
            borderColor: '#2980b9',
        },
        '@media (max-width: 768px)': {
            padding: '10px',
            fontSize: '14px',
        },
    },
    formLabel: {
        textAlign: 'left',
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        fontSize: '16px',
        color: '#333',
        '@media (max-width: 768px)': {
            fontSize: '14px',
        },
    },
    formButton: {
        marginTop: '25px',
        backgroundColor: '#2980b9',
        color: '#fff',
        padding: '14px 28px',
        fontSize: '18px',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#1f5a82',
        },
        '@media (max-width: 768px)': {
            padding: '12px 20px',
            fontSize: '16px',
        },
    },
    errorMessage: {
        color: '#e74c3c',
        marginTop: '8px',
        textAlign: 'left',
        fontSize: '14px',
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        padding: '0',
    },
    errorIcon: {
        color: '#e74c3c',
        marginLeft: '5px',
    },
    inputError: {
        borderColor: '#e74c3c',
        boxShadow: '0 0 5px rgba(231, 76, 60, 0.2)',
    },
};

const Ergebnis = () => {
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const unternehmenswert = useSelector((state) => state.sections.sectionData.unternehmenswert);
    const basisInfoData = useSelector(state => state.basisInfo.basisInfoData);
    const kennzahlenData = useSelector((state) => state.kennzahlen.kennzahlenData);
    const bereinigungData = useSelector((state) => state.bereinigung.bereinigungData);
    const equityBridgeData = useSelector((state) => state.equityBridge.equityBridgeData);
    const ergebnisData = useSelector((state) => state.ergebnis.ergebnisData);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        console.log('ergebnisData', ergebnisData);
    }, [ergebnisData]);

    const formatUnternehmenswert = (unternehmenswert) => {
        const roundedValue = Math.round(unternehmenswert).toString();
        const formattedValue = roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        let fontSize;
        if (formattedValue.length > 15) {
            fontSize = '1.5rem';
        } else if (formattedValue.length > 10) {
            fontSize = '2.2rem';
        } else {
            fontSize = '4rem';
        }

        return { formattedValue, fontSize };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setErgebnisData({ ...ergebnisData, [name]: value }));
        if (value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const checkValidity = () => {
        const newErrors = {};
        if (!ergebnisData.firstName) newErrors.firstName = 'Vorname ist erforderlich.';
        if (!ergebnisData.lastName) newErrors.lastName = 'Nachname ist erforderlich.';
        if (!ergebnisData.email || !/\S+@\S+\.\S+/.test(ergebnisData.email)) {
            newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        }
        if (!ergebnisData.phoneNumber) {
            newErrors.phoneNumber = 'Telefonnummer ist erforderlich.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkValidity()) {
            const formData = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                phoneNumber: e.target.phoneNumber.value,
            };
            dispatch(setErgebnisData(formData));
            setSubmitted(true);
            sendEmail();
        }
    };

    const savePdf = () => {
        return new Promise((resolve, reject) => {
            pdf(<MyDocument
                kennzahlenData={kennzahlenData}
                basisInfoData={basisInfoData}
                bereinigungData={bereinigungData}
                equityBridgeData={equityBridgeData}
                ergebnisData={ergebnisData}
                unternehmenswert={unternehmenswert}
            />).toBlob().then(blob => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    if (reader.error) {
                        console.error('Error:', reader.error);
                        showSnackbar('Fehler beim Konvertieren der PDF-Datei. Bitte später erneut versuchen.');
                        reject(reader.error);
                    } else {
                        const base64data = reader.result;

                        const data = {
                            filename: `Unternehmenswert_${ergebnisData.lastName}.pdf`,
                            pdfData: base64data,
                            directoryPath: './pdfs'
                        };

                        axios.post('https://localhost:3000/save-pdf', data)
                            .then(response => {
                                console.log('PDF gespeichert:', response.data);
                                resolve();
                            })
                            .catch(error => {
                                console.error('Fehler:', error);
                                reject(error);
                            });
                    }
                };

                reader.onerror = function (error) {
                    console.error('Fehler:', error);
                    reject(error);
                };

                reader.readAsDataURL(blob);
            }).catch(error => {
                console.error('Fehler:', error);
                reject(error);
            });
        });
    };

    const sendEmail = () => {
        showSnackbar('E-Mail wird gesendet...');
        savePdf()
            .then(() => {
                const formData = {
                    to: [ergebnisData.email, "ub@orgaplan-beratung.de"],
                    subject: 'Orgaplan Unternehmensrechner',
                    body: getEmailCopy(),
                    attachments: [
                        {
                            filename: `Unternehmenswert_${ergebnisData.lastName}.pdf`,
                            path: `./pdfs/Unternehmenswert_${ergebnisData.lastName}.pdf`,
                        },
                    ],
                };

                axios
                    .post('https://localhost:3000/send-email', formData)
                    .then((response) => {
                        console.log('Anfrage:', response.config);
                        console.log('Antwort:', response.data);
                        console.log('E-Mail erfolgreich gesendet');
                        showSnackbar('E-Mail erfolgreich gesendet!');
                    })
                    .catch((error) => {
                        console.error('Fehler beim Senden der E-Mail:', error);
                        showSnackbar('Fehler beim Senden der E-Mail. Bitte später erneut versuchen.');
                    });
            })
            .catch((error) => {
                console.error('Fehler:', error);
            });
    };

    const getEmailCopy = () => {
        return `Sehr geehrte Damen und Herren,

vielen Dank, dass Sie den Unternehmenswertrechner von ORGAPLAN Beratung genutzt haben. Anbei finden Sie Ihren persönlichen Bericht. 

Je früher Sie mit den Vorbereitungen für Ihre Nachfolge anfangen, desto besser. Nutzen Sie unser Angebot eines kostenlosen Erstgespräches, indem Sie gemeinsam mit unserem Transaktionsexperten Ingo Stermann Ihre ganz individuelle Situation besprechen können.

Senden Sie uns einfach eine formlose Besprechungsanfrage an ub@orgaplan-beratung.de. Selbstverständlich sind alle Gespräche unverbindlich und werden mit höchster Diskretion behandelt.

Beste Grüße,
Das Team der ORGAPLAN Beratung GmbH

Mit freundlichen Grüßen,
Ingo Stermann
Vertrieb / Gesellschafter

ORGAPLAN Beratung GmbH
Schanzenstr. 58
40549 Düsseldorf
I-Net: https://orgaplan-beratung.de/
Phone: +49 211 17454919
Mobile: +49 177 9624755
E-Mail: stermann@orgaplan-beratung.de

Gesellschaft mit beschränkter Haftung
Geschäftsführung: Achim Teffahi / Choayb Zeriouh
Sitz: Düsseldorf
Amtsgericht Düsseldorf
HRB: 57912

Über das Internet versandte E-Mails können leicht verfälscht oder unter fremden Namen erstellt werden. Demzufolge müssen wir zu Ihrer und zu unserer Sicherheit die rechtliche Verbindlichkeit der vorstehenden Erklärungen ausschließen. Der Versand von E-Mails dient somit ausschließlich dem Informationsaustausch!`;
    };

    const showSnackbar = (message) => {
        const variant = message.includes('erfolgreich') ? 'success' :
            message.includes('gesendet') ? 'info' : 'error';

        enqueueSnackbar(message, {
            variant: variant,
            autoHideDuration: 2000,
        });
    };

    return (
        <Grid style={styles.enterpriseResult}>
            {submitted ? (
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div style={styles.resultColumn}>
                            <h3 style={styles.formTitle}>Vielen Dank für Ihre Anfrage!</h3>
                            <p style={styles.formDescription}>
                                Danke, dass Sie unsere kostenlose Erstbewertung für Ihr Unternehmen angefragt haben. Wir senden Ihnen in wenigen Minuten die Bewertung zu. Gerne können Sie auch einen Termin buchen, in dem wir ganz individuell auf Ihr Unternehmen eingehen können.
                            </p>
                            <Button
                                primary
                                as="a"
                                href="https://orgaplan-beratung.de/kontakt"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.formButton}
                            >
                                Termin Buchen
                            </Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            ) : (
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div style={styles.resultColumn}>
                            <div style={styles.ertragswertContainer}>
                                <p style={styles.ertragswertTitle}>
                                    Der berechnete Unternehmenswert beträgt:
                                </p>
                                <p style={styles.ertragswert(formatUnternehmenswert(unternehmenswert).fontSize)}>
                                    {formatUnternehmenswert(unternehmenswert).formattedValue} €
                                </p>
                            </div>
                            <Form style={styles.resultForm} onSubmit={handleSubmit}>
                                <Form.Field>
                                    <h3 style={styles.formTitle}>
                                        Laden Sie jetzt Ihren persönlichen PDF-Bericht herunter
                                    </h3>
                                    <p style={styles.formDescription}>
                                        Anonym, kostenlos und unverbindlich
                                    </p>
                                </Form.Field>

                                <Form.Field>
                                    <label style={styles.formLabel}>Vorname *</label>
                                    <Form.Input
                                        placeholder="Ihr Vorname"
                                        style={errors.firstName ? {...styles.formInput, ...styles.inputError} : styles.formInput}
                                        name="firstName"
                                        value={ergebnisData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.firstName && (
                                        <Message style={styles.errorMessage}>
                                            {errors.firstName} <Icon name="exclamation circle"
                                                                     style={styles.errorIcon}/>
                                        </Message>
                                    )}
                                </Form.Field>

                                <Form.Field>
                                    <label style={styles.formLabel}>Nachname *</label>
                                    <Form.Input
                                        placeholder="Ihr Nachname"
                                        style={errors.lastName ? {...styles.formInput, ...styles.inputError} : styles.formInput}
                                        name="lastName"
                                        value={ergebnisData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.lastName && (
                                        <Message style={styles.errorMessage}>
                                            {errors.lastName} <Icon name="exclamation circle" style={styles.errorIcon}/>
                                        </Message>
                                    )}
                                </Form.Field>

                                <Form.Field>
                                    <label style={styles.formLabel}>Ihre E-Mail Adresse *</label>
                                    <Form.Input
                                        placeholder="Geben Sie Ihre E-Mail Adresse ein"
                                        style={errors.email ? {...styles.formInput, ...styles.inputError} : styles.formInput}
                                        name="email"
                                        value={ergebnisData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && (
                                        <Message style={styles.errorMessage}>
                                            {errors.email} <Icon name="exclamation circle" style={styles.errorIcon}/>
                                        </Message>
                                    )}
                                </Form.Field>

                                <Form.Field>
                                    <label style={styles.formLabel}>Telefonnummer *</label>
                                    <Form.Input
                                        placeholder="Geben Sie Ihre Telefonnummer ein"
                                        style={errors.phoneNumber ? {...styles.formInput, ...styles.inputError} : styles.formInput}
                                        name="phoneNumber"
                                        value={ergebnisData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phoneNumber && (
                                        <Message style={styles.errorMessage}>
                                            {errors.phoneNumber} <Icon name="exclamation circle" style={styles.errorIcon}/>
                                        </Message>
                                    )}
                                </Form.Field>

                                <Button type="submit" primary style={styles.formButton}>
                                    Bericht anfragen
                                </Button>
                            </Form>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            )}
        </Grid>
    );
};

export default Ergebnis;

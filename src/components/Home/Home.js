import React, { useState, useEffect } from 'react';
import { Container, Header as SemanticHeader, Icon, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        marginTop: '50px',
        textAlign: 'left',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '80%',
        marginLeft: '10%',
    },
    header: {
        fontSize: '2.5rem',
        color: '#0056b3',
        marginBottom: '20px',
    },
    introText: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: '30px',
    },
    section: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    iconWrapper: {
        display: 'inline-block',
        padding: '15px',
        borderRadius: '50%',
        border: '3px solid #0056b3',
        marginBottom: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    icon: {
        fontSize: '2rem',
        color: '#0056b3',
    },
    sectionText: {
        fontSize: '1rem',
        color: '#333',
        lineHeight: '1.4',
        padding: '0 10px',
    },
    buttonContainer: {
        textAlign: 'center',
        marginTop: '30px',
    },
    button: {
        padding: '12px 25px',
        borderRadius: '30px',
        backgroundColor: '#0056b3',
        color: 'white',
        fontSize: '1.1rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#003d7a',
    }
};

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container style={styles.container}>
            <SemanticHeader as="h1" style={styles.header}>
                <Icon name="briefcase" /> Sichern Sie den Unternehmenswert mit Orgaplan
            </SemanticHeader>
            <p style={styles.introText}>
                Willkommen bei Orgaplan Beratung. Wir bieten maßgeschneiderte Lösungen zur Steigerung und Erhaltung des Unternehmenswerts. Entdecken Sie unsere Dienstleistungen, die auf jahrelanger Erfahrung und fundierter Marktanalyse basieren.
            </p>

            <Grid stackable columns={isMobile ? 1 : 3} divided={!isMobile}>
                <Grid.Row>
                    <Grid.Column>
                        <div style={styles.section}>
                            <div style={styles.iconWrapper}>
                                <Icon name="building outline" style={styles.icon} />
                            </div>
                            <p style={styles.sectionText}>
                                Der Unternehmenswert ist ein entscheidender Faktor für die Zukunft Ihres Unternehmens. Bei Orgaplan bieten wir umfassende Analysen, die den Marktwert Ihrer Aktien, Anleihen und Schulden berücksichtigen, um den echten Unternehmenswert zu berechnen.
                            </p>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={styles.section}>
                            <div style={styles.iconWrapper}>
                                <Icon name="line chart" style={styles.icon} />
                            </div>
                            <p style={styles.sectionText}>
                                Unsere Beratung konzentriert sich auf die Optimierung der Geschäftsentwicklung. Durch strategische Entscheidungen und effektive Planung helfen wir, den Umsatz und die Rentabilität zu steigern und so den Unternehmenswert langfristig zu erhöhen.
                            </p>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={styles.section}>
                            <div style={styles.iconWrapper}>
                                <Icon name="handshake outline" style={styles.icon} />
                            </div>
                            <p style={styles.sectionText}>
                                Vertrauen ist der Schlüssel zum Erfolg. Wir bauen langfristige Beziehungen zu unseren Kunden auf und bieten Unterstützung, die sich positiv auf den Unternehmenswert auswirkt und Investoren anzieht.
                            </p>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <div style={styles.buttonContainer}>
                <Button
                    as={Link}
                    to="/unternehmenswert-berechnen"
                    style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Icon name="calculator" />
                    Unternehmenswert berechnen
                </Button>
            </div>
        </Container>
    );
};

export default Home;

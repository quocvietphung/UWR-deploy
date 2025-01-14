import React from 'react';
import { Container } from 'semantic-ui-react';

const styles = {
    footer: {
        backgroundColor: '#f0f0f0',
        padding: '20px 0',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
    },
    textWhite: {
        color: '#000',
    },
    textOrange: {
        color: '#f2711c',
        fontWeight: 'bold',
    },
    links: {
        display: 'block',
        marginTop: '10px',
        fontSize: '0.9rem',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        margin: '0 10px',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

const Footer = () => {
    return (
        <div className="Footer" style={styles.footer}>
            <Container>
                <p style={styles.textWhite}>
                    <span>
                        Copyright © {new Date().getFullYear()}
                    </span>&nbsp;
                    <span style={styles.textOrange}>ORGAPLAN Beratung GmbH.</span>
                </p>
                <div style={styles.links}>
                    <a href="https://orgaplan-beratung.de/impressum" style={styles.link}>
                        Impressum
                    </a>
                    |
                    <a href="https://orgaplan-beratung.de/datenschutz" style={styles.link}>
                        Datenschutzerklärung
                    </a>
                </div>
            </Container>
        </div>
    );
};

export default Footer;

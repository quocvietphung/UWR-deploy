import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Home from '../Home/Home';
import Unternehmenswertrechner from '../Unternehmenswertrechner/Unternehmenswertrechner';
import Footer from './Footer';
import Navbar from './Navbar';
import Ergebnis from "../Ergebnis/Ergebnis";

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: "url('/assets/images/cover.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: '#333',
    },
    content: {
        flex: 1,
        marginTop: '80px',
        paddingBottom: '60px',
    }
};

const App = () => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={2000}
        >
            <Router>
                <div style={styles.app}>
                    <Navbar />
                    <div style={styles.content}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/unternehmenswert-berechnen" element={<Unternehmenswertrechner />} />
                            <Route path="/result" element={<Ergebnis />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </SnackbarProvider>
    );
};

export default App;

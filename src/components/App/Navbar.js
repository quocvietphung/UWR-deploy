import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        height: '70px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: '1000',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        height: '50px',
    },
    menuItemsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    menuItem: {
        marginLeft: '20px',
        marginRight: '20px',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        transition: 'color 0.3s ease',
    },
    activeMenuItem: {
        color: '#007BFF',
        borderBottom: '2px solid #007BFF',
    },
    mobileMenuIcon: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#333',
        fontSize: '24px',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
    },
    mobileMenu: {
        position: 'fixed',
        top: '70px',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 70px)',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #ddd',
        paddingTop: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        zIndex: '1001',
        overflowY: 'auto',
    },
    mobileMenuItem: {
        margin: '15px 0',
        fontSize: '18px',
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: '1000',
    },
    button: {
        backgroundColor: '#1E90FF',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        marginBottom: '20px',
    },
};

const menuItems = [
    { to: "/", label: "Startseite" },
    { to: "https://kredit-tool.onepage.me/", label: "Über uns", external: true }
];

const Navbar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav style={styles.navbar}>
                <NavLink to="/" exact style={styles.logoContainer}>
                    <img src="/assets/images/ORGAPLANLOGO.png" alt="ORGAPLAN" style={styles.logoImage} />
                </NavLink>

                {!isSmallScreen && (
                    <div style={styles.menuItemsContainer}>
                        {menuItems.map((item) =>
                            item.external ? (
                                <a
                                    key={item.to}
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.menuItem}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <NavLink
                                    key={item.to}
                                    exact={item.to === "/"}
                                    to={item.to}
                                    style={styles.menuItem}
                                    activeStyle={styles.activeMenuItem}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        )}
                        <Button
                            as="a"
                            href="https://kredit-tool.onepage.me/analyse"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.button}
                        >
                            Kostenloses Erstgespräch
                        </Button>
                    </div>
                )}

                {isSmallScreen && (
                    <div style={styles.mobileMenuIcon} onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                )}
            </nav>

            {menuOpen && isSmallScreen && (
                <>
                    <div style={styles.overlay} onClick={handleCloseMenu}></div>
                    <div style={styles.mobileMenu}>
                        {menuItems.map((item) =>
                            item.external ? (
                                <a
                                    key={item.to}
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.mobileMenuItem}
                                    onClick={handleCloseMenu}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <NavLink
                                    key={item.to}
                                    exact={item.to === "/"}
                                    to={item.to}
                                    style={styles.mobileMenuItem}
                                    activeStyle={styles.activeMenuItem}
                                    onClick={handleCloseMenu}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        )}
                        <Button
                            as="a"
                            href="https://kredit-tool.onepage.me/analyse"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ ...styles.button, marginTop: '20px' }}
                        >
                            Kostenloses Erstgespräch
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;

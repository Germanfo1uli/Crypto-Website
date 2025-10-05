import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/', label: 'Главная' },
        { path: '/trade', label: 'Торговля' },
        { path: '/wallet', label: 'Кошелек' },
        { path: '/about', label: 'О нас' },
        { path: '/contacts', label: 'Контакты' }
    ];

    const handleNavClick = (path, e) => {
        e.preventDefault();
        setActiveLink(path);
        setIsMobileMenuOpen(false);
        console.log(`Navigating to: ${path}`);
        window.location.href = path;
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        setActiveLink('/');
        setIsMobileMenuOpen(false);
        console.log('Navigating to home');
        window.location.href = '/';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLoginClick = () => {
        setIsMobileMenuOpen(false);
        onLoginClick();
    };

    const handleRegisterClick = () => {
        setIsMobileMenuOpen(false);
        onRegisterClick();
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <a
                    href="/"
                    className={styles.logoContainer}
                    onClick={handleLogoClick}
                    aria-label="На главную страницу"
                >
                    <FaBitcoin className={styles.logoIcon} />
                    <span className={styles.logo}>
                        CRYPTO<span className={styles.logoHighlight}>VAULT</span>
                    </span>
                </a>

                <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuActive : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path} className={styles.navItem}>
                            <a
                                href={item.path}
                                className={`${styles.navLink} ${
                                    activeLink === item.path ? styles.navLinkActive : ''
                                }`}
                                onClick={(e) => handleNavClick(item.path, e)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}

                    <div className={styles.mobileButtons}>
                        <button
                            className={styles.mobileLoginBtn}
                            onClick={handleLoginClick}
                            aria-label="Войти в аккаунт"
                        >
                            Войти
                        </button>
                        <button
                            className={styles.mobileRegisterBtn}
                            onClick={handleRegisterClick}
                            aria-label="Зарегистрировать аккаунт"
                        >
                            Регистрация
                        </button>
                    </div>
                </ul>

                <div className={styles.navButtons}>
                    <button
                        className={styles.loginBtn}
                        onClick={handleLoginClick}
                        aria-label="Войти в аккаунт"
                    >
                        Войти
                    </button>
                    <button
                        className={styles.registerBtn}
                        onClick={handleRegisterClick}
                        aria-label="Зарегистрировать аккаунт"
                    >
                        Регистрация
                    </button>
                </div>

                <button
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label="Открыть меню"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {isMobileMenuOpen && (
                    <div
                        className={styles.mobileOverlay}
                        onClick={toggleMobileMenu}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
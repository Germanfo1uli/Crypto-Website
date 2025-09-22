import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logoContainer}>
                    <FaBitcoin className={styles.logoIcon} />
                    <span className={styles.logo}>CRYPTO<span className={styles.logoHighlight}>VAULT</span></span>
                </div>

                <ul className={styles.navMenu}>
                    <li className={styles.navItem}>
                        <a href="#" className={styles.navLink}>Главная</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#" className={styles.navLink}>Торговля</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#" className={styles.navLink}>Кошелек</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#" className={styles.navLink}>О нас</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="#" className={styles.navLink}>Контакты</a>
                    </li>
                </ul>

                <div className={styles.navButtons}>
                    <button className={styles.loginBtn} onClick={onLoginClick}>Войти</button>
                    <button className={styles.registerBtn} onClick={onRegisterClick}>Регистрация</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
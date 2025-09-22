import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogo}>
                    <FaBitcoin className={styles.logoIcon} />
                    <span className={styles.logo}>CRYPTO<span className={styles.logoHighlight}>VAULT</span></span>
                </div>

                <div className={styles.footerLinks}>
                    <div className={styles.footerColumn}>
                        <h3 className={styles.footerTitle}>Продукт</h3>
                        <ul className={styles.footerList}>
                            <li><a href="#" className={styles.footerLink}>Торговля</a></li>
                            <li><a href="#" className={styles.footerLink}>Кошелек</a></li>
                            <li><a href="#" className={styles.footerLink}>API</a></li>
                            <li><a href="#" className={styles.footerLink}>Мобильное приложение</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h3 className={styles.footerTitle}>Компания</h3>
                        <ul className={styles.footerList}>
                            <li><a href="#" className={styles.footerLink}>О нас</a></li>
                            <li><a href="#" className={styles.footerLink}>Карьера</a></li>
                            <li><a href="#" className={styles.footerLink}>Блог</a></li>
                            <li><a href="#" className={styles.footerLink}>Пресс-релизы</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h3 className={styles.footerTitle}>Поддержка</h3>
                        <ul className={styles.footerList}>
                            <li><a href="#" className={styles.footerLink}>Помощь</a></li>
                            <li><a href="#" className={styles.footerLink}>Безопасность</a></li>
                            <li><a href="#" className={styles.footerLink}>Условия использования</a></li>
                            <li><a href="#" className={styles.footerLink}>Конфиденциальность</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>© 2025 CRYPTOVAULT. Все права защищены.</p>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon}>f</a>
                        <a href="#" className={styles.socialIcon}>t</a>
                        <a href="#" className={styles.socialIcon}>in</a>
                        <a href="#" className={styles.socialIcon}>ig</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
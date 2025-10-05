import React, { useState } from 'react';
import {
    FaBitcoin,
    FaTwitter,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaTelegram,
    FaArrowUp,
    FaShieldAlt,
    FaRocket,
    FaHeadset,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    const [currentYear] = useState(new Date().getFullYear());

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const socialLinks = [
        { icon: FaTwitter, href: "#", color: "#1DA1F2", label: "Twitter" },
        { icon: FaFacebookF, href: "#", color: "#1877F2", label: "Facebook" },
        { icon: FaLinkedinIn, href: "#", color: "#0A66C2", label: "LinkedIn" },
        { icon: FaInstagram, href: "#", color: "#E4405F", label: "Instagram" },
        { icon: FaTelegram, href: "#", color: "#0088CC", label: "Telegram" }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerMain}>
                        <div className={styles.footerBrand}>
                            <button
                                className={styles.footerLogo}
                                onClick={scrollToTop}
                                aria-label="Наверх"
                            >
                                <div className={styles.logoContainer}>
                                    <FaBitcoin className={styles.logoIcon} />
                                    <span className={styles.logo}>
                                        CRYPTO<span className={styles.logoHighlight}>VAULT</span>
                                    </span>
                                </div>
                            </button>
                            <p className={styles.footerDescription}>
                                Ведущая платформа для торговли криптовалютами.
                                Безопасность, скорость и надежность для миллионов трейдеров по всему миру.
                            </p>
                            <div className={styles.socialLinks}>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className={styles.socialLink}
                                        style={{ '--social-color': social.color }}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <social.icon className={styles.socialIcon} />
                                        <span className={styles.socialTooltip}>{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className={styles.footerLinks}>
                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerTitle}>
                                    <FaRocket className={styles.titleIcon} />
                                    Продукт
                                </h3>
                                <ul className={styles.footerList}>
                                    <li><a href="/trade" className={styles.footerLink}>Торговля</a></li>
                                    <li><a href="/wallet" className={styles.footerLink}>Кошелек</a></li>
                                    <li><a href="/api" className={styles.footerLink}>API</a></li>
                                    <li><a href="/mobile" className={styles.footerLink}>Мобильное приложение</a></li>
                                    <li><a href="/staking" className={styles.footerLink}>Стейкинг</a></li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerTitle}>
                                    <FaShieldAlt className={styles.titleIcon} />
                                    Компания
                                </h3>
                                <ul className={styles.footerList}>
                                    <li><a href="/about" className={styles.footerLink}>О нас</a></li>
                                    <li><a href="/careers" className={styles.footerLink}>Карьера</a></li>
                                    <li><a href="/blog" className={styles.footerLink}>Блог</a></li>
                                    <li><a href="/news" className={styles.footerLink}>Новости</a></li>
                                    <li><a href="/partners" className={styles.footerLink}>Партнеры</a></li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerTitle}>
                                    <FaHeadset className={styles.titleIcon} />
                                    Поддержка
                                </h3>
                                <ul className={styles.footerList}>
                                    <li><a href="/help" className={styles.footerLink}>Помощь</a></li>
                                    <li><a href="/security" className={styles.footerLink}>Безопасность</a></li>
                                    <li><a href="/terms" className={styles.footerLink}>Условия использования</a></li>
                                    <li><a href="/privacy" className={styles.footerLink}>Конфиденциальность</a></li>
                                    <li><a href="/fees" className={styles.footerLink}>Комиссии</a></li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerTitle}>
                                    <FaMapMarkerAlt className={styles.titleIcon} />
                                    Контакты
                                </h3>
                                <div className={styles.contactInfo}>
                                    <div className={styles.contactItem}>
                                        <FaPhone className={styles.contactIcon} />
                                        <span>+7 (999) 123-45-67</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <FaEnvelope className={styles.contactIcon} />
                                        <span>support@cryptovault.com</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <FaMapMarkerAlt className={styles.contactIcon} />
                                        <span>Москва, Пресненская наб., 12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerBottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} CRYPTOVAULT. Все права защищены.
                        </p>
                        <div className={styles.footerLegal}>
                            <a href="/terms" className={styles.legalLink}>Условия</a>
                            <a href="/privacy" className={styles.legalLink}>Конфиденциальность</a>
                            <a href="/cookies" className={styles.legalLink}>Cookies</a>
                        </div>
                        <button
                            className={styles.scrollToTop}
                            onClick={scrollToTop}
                            aria-label="Наверх"
                        >
                            <FaArrowUp className={styles.scrollIcon} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Декоративный элемент */}
            <div className={styles.footerOrnament}></div>
        </footer>
    );
};

export default Footer;
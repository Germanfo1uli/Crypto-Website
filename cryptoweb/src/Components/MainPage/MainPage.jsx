import React, { useState } from 'react';
import { FaEthereum, FaChartLine, FaWallet, FaLock, FaRocket, FaShieldAlt, FaArrowRight, FaBitcoin } from 'react-icons/fa';
import Navbar from '../MoreComponents/Navbar';
import Footer from '../MoreComponents/Footer';
import AuthModal from '../AuthModal/AuthModal';
import styles from './MainPage.module.css';
import Market from "../Market/Market";

const MainPage = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' или 'register'

    const openLoginModal = () => {
        setAuthMode('login');
        setIsAuthModalOpen(true);
    };

    const openRegisterModal = () => {
        setAuthMode('register');
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <div className={styles.container}>
            {/* Навигация */}
            <Navbar onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />

            {/* Герой секция */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Будущее <span className={styles.highlight}>финансов</span> в ваших руках
                    </h1>
                    <p className={styles.heroDescription}>
                        Платформа нового поколения для торговли и хранения криптовалют.
                        Безопасно, быстро и профессионально.
                    </p>
                    <div className={styles.heroButtons}>
                        <button className={styles.primaryBtn} onClick={openRegisterModal}>
                            Начать торговлю <FaArrowRight className={styles.btnIcon} />
                        </button>
                        <button className={styles.secondaryBtn}>
                            Узнать больше
                        </button>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.cryptoCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconContainer}>
                                <FaBitcoin className={styles.cardIcon} />
                            </div>
                            <div className={styles.cardTitle}>Bitcoin</div>
                        </div>
                        <div className={styles.cardValue}>$42,568.32</div>
                        <div className={styles.cardChange}>+2.4%</div>
                        <div className={styles.cardChart}>
                            <div className={styles.chartBar} style={{ height: '40%' }}></div>
                            <div className={styles.chartBar} style={{ height: '60%' }}></div>
                            <div className={styles.chartBar} style={{ height: '75%' }}></div>
                            <div className={styles.chartBar} style={{ height: '50%' }}></div>
                            <div className={styles.chartBar} style={{ height: '85%' }}></div>
                            <div className={styles.chartBar} style={{ height: '70%' }}></div>
                            <div className={styles.chartBar} style={{ height: '90%' }}></div>
                        </div>
                    </div>

                    <div className={styles.cryptoCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconContainer}>
                                <FaEthereum className={styles.cardIcon} />
                            </div>
                            <div className={styles.cardTitle}>Ethereum</div>
                        </div>
                        <div className={styles.cardValue}>$2,845.75</div>
                        <div className={styles.cardChangePositive}>+5.2%</div>
                        <div className={styles.cardChart}>
                            <div className={styles.chartBar} style={{ height: '30%' }}></div>
                            <div className={styles.chartBar} style={{ height: '45%' }}></div>
                            <div className={styles.chartBar} style={{ height: '65%' }}></div>
                            <div className={styles.chartBar} style={{ height: '40%' }}></div>
                            <div className={styles.chartBar} style={{ height: '75%' }}></div>
                            <div className={styles.chartBar} style={{ height: '85%' }}></div>
                            <div className={styles.chartBar} style={{ height: '95%' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Фичи секция */}
            <section className={styles.features}>
                <div className={styles.featuresContainer}>
                    <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
                    <p className={styles.sectionDescription}>
                        Мы предоставляем лучшие условия для торговли и хранения криптовалют
                    </p>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <FaShieldAlt className={styles.featureIcon} />
                            </div>
                            <h3 className={styles.featureTitle}>Безопасность</h3>
                            <p className={styles.featureDescription}>
                                Многоуровневая защита средств и персональных данных с использованием передовых технологий шифрования.
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <FaRocket className={styles.featureIcon} />
                            </div>
                            <h3 className={styles.featureTitle}>Скорость</h3>
                            <p className={styles.featureDescription}>
                                Мгновенные транзакции и торговля с минимальными задержками благодаря нашей мощной инфраструктуре.
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <FaChartLine className={styles.featureIcon} />
                            </div>
                            <h3 className={styles.featureTitle}>Аналитика</h3>
                            <p className={styles.featureDescription}>
                                Профессиональные инструменты для анализа рынка и прогнозирования движения цен криптовалют.
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <FaWallet className={styles.featureIcon} />
                            </div>
                            <h3 className={styles.featureTitle}>Кошелек</h3>
                            <p className={styles.featureDescription}>
                                Удобный и безопасный кошелек для хранения различных криптовалют с возможностью мгновенного обмена.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Market/>
            <section className={styles.cta}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Готовы начать свой путь в криптовалютах?</h2>
                    <p className={styles.ctaDescription}>
                        Присоединяйтесь к тысячам трейдеров, которые уже доверяют нам свои активы
                    </p>
                    <button className={styles.ctaBtn} onClick={openRegisterModal}>
                        Создать аккаунт <FaArrowRight className={styles.btnIcon} />
                    </button>
                </div>
            </section>


            <Footer />

            {/* Модальное окно авторизации */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
                mode={authMode}
                setMode={setAuthMode}
            />
        </div>
    );
};

export default MainPage;
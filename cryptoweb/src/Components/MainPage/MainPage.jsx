import React, { useState, useEffect, useRef } from 'react';
import { FaEthereum, FaChartLine, FaWallet, FaRocket, FaShieldAlt, FaArrowRight, FaBitcoin, FaStar, FaUsers, FaGlobe, FaCoins, FaExchangeAlt, FaCheck } from 'react-icons/fa';
import Navbar from '../MoreComponents/Navbar';
import Footer from '../MoreComponents/Footer';
import AuthModal from '../AuthModal/AuthModal';
import styles from './MainPage.module.css';
import Market from "../Market/Market";

const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, isInView];
};

const MainPage = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const [heroRef, heroInView] = useInView({ threshold: 0.3 });
    const [featuresRef, featuresInView] = useInView({ threshold: 0.2 });
    const [ctaRef, ctaInView] = useInView({ threshold: 0.2 });

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

    const stats = [
        { value: '2M+', label: 'Пользователей' },
        { value: '$50B+', label: 'Объем торгов' },
        { value: '99.9%', label: 'Аптайм' },
        { value: '150+', label: 'Стран' }
    ];

    const features = [
        {
            icon: FaShieldAlt,
            title: 'Безопасность',
            description: 'Холодное хранение активов, многофакторная аутентификация и страховка средств',
            benefits: ['Cold Storage', '2FA защита', 'Страхование']
        },
        {
            icon: FaRocket,
            title: 'Скорость',
            description: 'Торговые операции за 0.001 секунды с минимальными комиссиями',
            benefits: ['0.001с операции', 'Низкие комиссии', 'Высокая ликвидность']
        },
        {
            icon: FaCoins,
            title: 'Доходность',
            description: 'Стейкинг, лендинг и другие способы пассивного заработка',
            benefits: ['Стейкинг до 15%', 'Лендинг', 'Ферминг']
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.animatedBackground}>
                <div className={styles.floatingOrb1}></div>
                <div className={styles.floatingOrb2}></div>
                <div className={styles.gridPattern}></div>
            </div>

            <Navbar onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />

            <section ref={heroRef} className={`${styles.hero} ${heroInView ? styles.animateIn : ''}`}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <FaStar className={styles.badgeIcon} />
                        <span>Лучшая криптоплатформа 2025</span>
                    </div>

                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleLine}>Будущее</span>
                        <span className={`${styles.titleLine} ${styles.highlight}`}>финансов</span>
                        <span className={styles.titleLine}>в ваших руках</span>
                    </h1>

                    <p className={styles.heroDescription}>
                        Платформа нового поколения для торговли и хранения криптовалют.
                        <span className={styles.highlightText}> Безопасно, быстро и профессионально.</span>
                    </p>
                    <div className={styles.stats}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.heroButtons}>
                        <button className={styles.primaryBtn} onClick={openRegisterModal}>
                            <span>Начать торговлю</span>
                            <FaArrowRight className={styles.btnIcon} />
                        </button>
                        <button className={styles.secondaryBtn}>
                            <FaGlobe className={styles.btnIcon} />
                            <span>Демо-платформа</span>
                        </button>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={`${styles.cryptoCard} ${styles.bitcoinCard}`}>
                        <div className={styles.cardGlow}></div>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconContainer}>
                                <FaBitcoin className={styles.cardIcon} />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardTitle}>Bitcoin</div>
                                <div className={styles.cardSymbol}>BTC</div>
                            </div>
                            <div className={styles.cardTrend}>
                                <FaChartLine className={styles.trendIcon} />
                            </div>
                        </div>
                        <div className={styles.cardValue}>$42,568.32</div>
                        <div className={styles.cardChangePositive}>+2.4%</div>
                        <div className={styles.cardChart}>
                            {[40, 60, 75, 50, 85, 70, 90].map((height, index) => (
                                <div
                                    key={index}
                                    className={styles.chartBar}
                                    style={{ height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.cryptoCard} ${styles.ethereumCard}`}>
                        <div className={styles.cardGlow}></div>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconContainer}>
                                <FaEthereum className={styles.cardIcon} />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardTitle}>Ethereum</div>
                                <div className={styles.cardSymbol}>ETH</div>
                            </div>
                            <div className={styles.cardTrend}>
                                <FaChartLine className={styles.trendIcon} />
                            </div>
                        </div>
                        <div className={styles.cardValue}>$2,845.75</div>
                        <div className={styles.cardChangePositive}>+5.2%</div>
                        <div className={styles.cardChart}>
                            {[30, 45, 65, 40, 75, 85, 95].map((height, index) => (
                                <div
                                    key={index}
                                    className={styles.chartBar}
                                    style={{ height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section ref={featuresRef} className={`${styles.features} ${featuresInView ? styles.animateIn : ''}`}>
                <div className={styles.featuresContainer}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
                        <p className={styles.sectionDescription}>
                            Инновационная платформа, созданная для трейдеров нового поколения
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`${styles.featureCard} ${hoveredFeature === index ? styles.featureCardHovered : ''}`}
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={styles.featureIconWrapper}>
                                    <div className={styles.featureIconContainer}>
                                        <feature.icon className={styles.featureIcon} />
                                    </div>
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>

                                <div className={styles.featureBenefits}>
                                    {feature.benefits.map((benefit, benefitIndex) => (
                                        <div key={benefitIndex} className={styles.benefitItem}>
                                            <FaCheck className={styles.benefitIcon} />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={styles.featureButton}>
                                    Узнать больше
                                    <FaArrowRight className={styles.buttonIcon} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Market />

            <section ref={ctaRef} className={`${styles.cta} ${ctaInView ? styles.animateIn : ''}`}>
                <div className={styles.ctaContainer}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>
                            Готовы начать свой путь
                            <span className={styles.highlight}> в криптовалютах?</span>
                        </h2>
                        <p className={styles.ctaDescription}>
                            Присоединяйтесь к миллионам трейдеров по всему миру. Начните с депозита всего от $10.
                        </p>
                        <div className={styles.ctaStats}>
                            <div className={styles.ctaStat}>
                                <FaUsers className={styles.ctaStatIcon} />
                                <div>
                                    <div className={styles.ctaStatValue}>2M+</div>
                                    <div className={styles.ctaStatLabel}>активных трейдеров</div>
                                </div>
                            </div>
                            <div className={styles.ctaStat}>
                                <FaExchangeAlt className={styles.ctaStatIcon} />
                                <div>
                                    <div className={styles.ctaStatValue}>500+</div>
                                    <div className={styles.ctaStatLabel}>торговых пар</div>
                                </div>
                            </div>
                        </div>
                        <button className={styles.ctaBtn} onClick={openRegisterModal}>
                            <span>Создать аккаунт</span>
                            <FaArrowRight className={styles.btnIcon} />
                        </button>
                    </div>
                    <div className={styles.ctaVisual}>
                        <div className={styles.ctaCard}>
                            <div className={styles.ctaCardHeader}>
                                <div className={styles.ctaCardIcon}>
                                    <FaShieldAlt />
                                </div>
                                <h3 className={styles.ctaCardTitle}>Ваши преимущества</h3>
                            </div>
                            <div className={styles.ctaCardContent}>
                                <div className={styles.ctaCardFeature}>
                                    <div className={styles.featureCheck}>✓</div>
                                    <div>
                                        <div className={styles.featureTitle}>Мгновенная регистрация</div>
                                        <div className={styles.featureSubtitle}>Без верификации до $1000</div>
                                    </div>
                                </div>
                                <div className={styles.ctaCardFeature}>
                                    <div className={styles.featureCheck}>✓</div>
                                    <div>
                                        <div className={styles.featureTitle}>Поддержка 24/7</div>
                                        <div className={styles.featureSubtitle}>Помощь в любое время</div>
                                    </div>
                                </div>
                                <div className={styles.ctaCardFeature}>
                                    <div className={styles.featureCheck}>✓</div>
                                    <div>
                                        <div className={styles.featureTitle}>Бесплатное обучение</div>
                                        <div className={styles.featureSubtitle}>Курсы для начинающих</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

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
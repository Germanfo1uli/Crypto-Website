import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaTwitter, FaLinkedin, FaEnvelope, FaArrowLeft, FaShieldAlt, FaUsers, FaLightbulb, FaGlobe, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';
import Navbar from "../MoreComponents/Navbar";
import Footer from "../MoreComponents/Footer";

const AboutPage = () => {
    // Данные о команде
    const teamMembers = [
        {
            id: 1,
            name: 'Александр Иванов',
            position: 'CEO & Основатель',
            bio: 'Более 10 лет опыта в финансовой сфере и блокчейн-технологиях. Бывший трейдер на Уолл-стрит.',
            photo: null,
            social: {
                twitter: '#',
                linkedin: '#',
                email: 'alexander@cryptovault.com'
            }
        },
        {
            id: 2,
            name: 'Екатерина Петрова',
            position: 'CTO',
            bio: 'Эксперт по блокчейну и криптографии с опытом разработки в крупных технологических компаниях.',
            photo: null,
            social: {
                twitter: '#',
                linkedin: '#',
                email: 'ekaterina@cryptovault.com'
            }
        },
        {
            id: 3,
            name: 'Михаил Сидоров',
            position: 'Финансовый директор',
            bio: 'Специалист по финансовому анализу и управлению рисками с опытом работы в инвестиционных банках.',
            photo: null,
            social: {
                twitter: '#',
                linkedin: '#',
                email: 'mikhail@cryptovault.com'
            }
        },
    ];

    // Отзывы клиентов
    const testimonials = [
        {
            id: 1,
            name: 'Дмитрий Волков',
            position: 'Трейдер',
            content: 'CRYPTOVAULT изменил мой подход к торговле криптовалютами. Интуитивно понятный интерфейс и мощные инструменты анализа делают процесс торговли максимально эффективным.',
            rating: 5
        },
        {
            id: 2,
            name: 'Ольга Смирнова',
            position: 'Инвестор',
            content: 'Безопасность и надежность — это то, что я ценю больше всего. CRYPTOVAULT обеспечивает высочайший уровень защиты средств и данных.',
            rating: 5
        },
        {
            id: 3,
            name: 'Николай Попов',
            position: 'Крипто-энтузиаст',
            content: 'Отличная платформа как для новичков, так и для профессионалов. Низкие комиссии и высокая скорость транзакций делают CRYPTOVAULT моим основным выбором.',
            rating: 4
        }
    ];

    // Наша миссия и ценности
    const companyValues = [
        {
            id: 1,
            icon: <FaLightbulb />,
            title: 'Инновации',
            description: 'Мы постоянно совершенствуем наши технологии, чтобы предоставлять вам самые передовые решения для торговли криптовалютами.'
        },
        {
            id: 2,
            icon: <FaShieldAlt />,
            title: 'Безопасность',
            description: 'Защита ваших средств и персональных данных — наш главный приоритет. Мы используем самые современные методы шифрования и защиты.'
        },
        {
            id: 3,
            icon: <FaUsers />,
            title: 'Сообщество',
            description: 'Мы строим сильное сообщество трейдеров и инвесторов, обменивающихся опытом и поддерживающих друг друга.'
        },
        {
            id: 4,
            icon: <FaGlobe />,
            title: 'Глобальность',
            description: 'Наша платформа доступна пользователям по всему миру. Мы поддерживаем множество языков и валют для вашего удобства.'
        }
    ];

    // История компании
    const milestones = [
        {
            year: '2018',
            title: 'Основание компании',
            description: 'CRYPTOVAULT была основана группой энтузиастов блокчейн-технологий с целью создания безопасной и удобной платформы для торговли криптовалютами.'
        },
        {
            year: '2019',
            title: 'Запуск бета-версии',
            description: 'Мы представили бета-версию нашей платформы для ограниченного числа пользователей и получили ценные отзывы для дальнейшего развития.'
        },
        {
            year: '2020',
            title: 'Публичный запуск',
            description: 'Официальный запуск CRYPTOVAULT для всех пользователей. Платформа быстро набрала популярность благодаря инновационным функциям и высокому уровню безопасности.'
        },
        {
            year: '2021',
            title: 'Расширение функционала',
            description: 'Добавление поддержки новых криптовалют, фьючерсной торговли и других продвинутых инструментов для трейдеров.'
        },
        {
            year: '2023',
            title: 'Глобальное присутствие',
            description: 'Достижение отметки в 1 миллион пользователей по всему миру и открытие офисов в ключевых финансовых центрах.'
        }
    ];

    return (
        <div className={styles.aboutContainer}>
            <Navbar/>
            <div className={styles.aboutHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>О компании CRYPTOVAULT</h1>
                    <p className={styles.headerSubtitle}>
                        Мы создаем будущее финансовых технологий сегодня
                    </p>
                </div>
            </div>
            <section className={styles.missionSection}>
                <div className={styles.missionContent}>
                    <div className={styles.missionText}>
                        <h2 className={styles.sectionTitle}>Наша миссия</h2>
                        <p className={styles.missionDescription}>
                            В CRYPTOVAULT мы верим, что криптовалюты и блокчейн-технологии меняют мир финансов к лучшему. Наша миссия — сделать криптовалюты доступными для каждого, предоставив безопасную, интуитивно понятную и мощную платформу для торговли и инвестиций.
                        </p>
                        <p className={styles.missionDescription}>
                            Мы стремимся democratize доступ к финансовым инструментам, которые ранее были доступны только профессиональным трейдерам и финансовым институтам. Независимо от того, являетесь ли вы новичком или опытным трейдером, CRYPTOVAULT предоставляет все необходимые инструменты для достижения ваших финансовых целей.
                        </p>
                    </div>

                    <div className={styles.missionStats}>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>1M+</div>
                            <div className={styles.statLabel}>Активных пользователей</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>50+</div>
                            <div className={styles.statLabel}>Поддерживаемых криптовалют</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>99.9%</div>
                            <div className={styles.statLabel}>Время работы платформы</div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>Поддержка клиентов</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.valuesSection}>
                <div className={styles.valuesContainer}>
                    <h2 className={styles.sectionTitle}>Наши ценности</h2>
                    <div className={styles.valuesGrid}>
                        {companyValues.map(value => (
                            <div key={value.id} className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    {value.icon}
                                </div>
                                <h3 className={styles.valueTitle}>{value.title}</h3>
                                <p className={styles.valueDescription}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.historySection}>
                <div className={styles.historyContainer}>
                    <h2 className={styles.sectionTitle}>Наша история</h2>
                    <p className={styles.sectionDescription}>
                        Путь от идеи до ведущей платформы для торговли криптовалютами
                    </p>

                    <div className={styles.timeline}>
                        {milestones.map((milestone, index) => (
                            <div key={milestone.year} className={styles.timelineItem}>
                                <div className={styles.timelineYear}>{milestone.year}</div>
                                <div className={styles.timelineContent}>
                                    <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                                    <p className={styles.timelineDescription}>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.teamSection}>
                <div className={styles.teamContainer}>
                    <h2 className={styles.sectionTitle}>Наша команда</h2>
                    <div className={styles.teamGrid}>
                        {teamMembers.map(member => (
                            <div key={member.id} className={styles.teamCard}>
                                <div className={styles.teamPhoto}>
                                    {member.photo ? (
                                        <img src={member.photo} alt={member.name} />
                                    ) : (
                                        <div className={styles.teamPhotoPlaceholder}>
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.teamInfo}>
                                    <h3 className={styles.teamName}>{member.name}</h3>
                                    <p className={styles.teamPosition}>{member.position}</p>
                                    <p className={styles.teamBio}>{member.bio}</p>

                                    <div className={styles.teamSocial}>
                                        {member.social.twitter && (
                                            <a href={member.social.twitter} className={styles.socialIcon}>
                                                <FaTwitter />
                                            </a>
                                        )}
                                        {member.social.linkedin && (
                                            <a href={member.social.linkedin} className={styles.socialIcon}>
                                                <FaLinkedin />
                                            </a>
                                        )}
                                        {member.social.email && (
                                            <a href={`mailto:${member.social.email}`} className={styles.socialIcon}>
                                                <FaEnvelope />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.testimonialsSection}>
                <div className={styles.testimonialsContainer}>
                    <h2 className={styles.sectionTitle}>Что говорят наши клиенты</h2>
                    <div className={styles.testimonialsGrid}>
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className={styles.testimonialCard}>
                                <div className={styles.testimonialRating}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`${styles.star} ${i < testimonial.rating ? styles.filled : ''}`}>★</span>
                                    ))}
                                </div>

                                <div className={styles.testimonialContent}>
                                    <FaQuoteLeft className={styles.quoteLeft} />
                                    <p>{testimonial.content}</p>
                                    <FaQuoteRight className={styles.quoteRight} />
                                </div>

                                <div className={styles.testimonialAuthor}>
                                    <div className={styles.authorName}>{testimonial.name}</div>
                                    <div className={styles.authorPosition}>{testimonial.position}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Присоединяйтесь к CRYPTOVAULT сегодня</h2>
                    <p className={styles.ctaDescription}>
                        Начните свой путь в мире криптовалют с надежным партнером
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link to="/trading" className={styles.ctaButtonPrimary}>
                            Начать торговлю
                        </Link>
                        <Link to="/register" className={styles.ctaButtonSecondary}>
                            Создать аккаунт
                        </Link>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default AboutPage;
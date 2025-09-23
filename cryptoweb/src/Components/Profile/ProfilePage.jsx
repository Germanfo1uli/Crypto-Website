import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaWallet, FaEdit, FaCog, FaArrowLeft, FaMoneyBillWave, FaChartLine, FaUser, FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign, FaBell, FaLock, FaGlobe, FaCreditCard, FaHistory, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import Footer from "../MoreComponents/Footer";
import Navbar from "../MoreComponents/Navbar";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState({
        username: 'crypto_trader',
        email: 'trader@example.com',
        bio: 'Опытный трейдер криптовалют с 2018 года. Специализируюсь на BTC и ETH.',
        avatar: null,
        wallets: [
            { id: 1, name: 'Основной BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', currency: 'BTC', balance: 0.52345678 },
            { id: 2, name: 'ETH кошелек', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', currency: 'ETH', balance: 3.78912345 },
            { id: 3, name: 'Трейдинг', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', currency: 'BTC', balance: 0.12345678 }
        ],
        newWallet: {
            name: '',
            address: '',
            currency: 'BTC'
        }
    });

    const [formData, setFormData] = useState({
        username: profileData.username,
        email: profileData.email,
        bio: profileData.bio
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleWalletChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            newWallet: {
                ...prev.newWallet,
                [name]: value
            }
        }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setProfileData(prev => ({
            ...prev,
            username: formData.username,
            email: formData.email,
            bio: formData.bio
        }));
        setIsEditing(false);
    };

    const handleAddWallet = (e) => {
        e.preventDefault();
        if (profileData.newWallet.name && profileData.newWallet.address) {
            const newWallet = {
                id: profileData.wallets.length + 1,
                name: profileData.newWallet.name,
                address: profileData.newWallet.address,
                currency: profileData.newWallet.currency,
                balance: 0
            };

            setProfileData(prev => ({
                ...prev,
                wallets: [...prev.wallets, newWallet],
                newWallet: {
                    name: '',
                    address: '',
                    currency: 'BTC'
                }
            }));
        }
    };

    const handleDeleteWallet = (id) => {
        setProfileData(prev => ({
            ...prev,
            wallets: prev.wallets.filter(wallet => wallet.id !== id)
        }));
    };

    // Функция для получения курса валюты (имитация)
    const getExchangeRate = (currency) => {
        const rates = {
            'BTC': 42568.32,
            'ETH': 2845.75,
            'USD': 1,
            'EUR': 0.93,
            'GBP': 0.79,
            'JPY': 149.52
        };
        return rates[currency] || 1;
    };

    // Функция для получения символа валюты
    const getCurrencySymbol = (currency) => {
        const symbols = {
            'BTC': <FaBitcoin />,
            'ETH': <FaEthereum />,
            'USD': <FaDollarSign />,
            'EUR': <FaEuroSign />,
            'GBP': <FaPoundSign />,
            'JPY': <FaYenSign />
        };
        return symbols[currency] || currency;
    };

    // Расчет общего баланса в USD
    const calculateTotalBalance = () => {
        return profileData.wallets.reduce((total, wallet) => {
            const rate = getExchangeRate(wallet.currency);
            return total + (wallet.balance * rate);
        }, 0);
    };

    // Расчет баланса по каждой валюте
    const calculateBalanceByCurrency = () => {
        const balances = {};

        profileData.wallets.forEach(wallet => {
            if (!balances[wallet.currency]) {
                balances[wallet.currency] = 0;
            }
            balances[wallet.currency] += wallet.balance;
        });

        return balances;
    };

    const balanceByCurrency = calculateBalanceByCurrency();
    const totalBalance = calculateTotalBalance();

    // Табы
    const tabs = [
        { id: 'overview', label: 'Обзор', icon: <FaChartLine /> },
        { id: 'wallets', label: 'Кошельки', icon: <FaWallet /> },
        { id: 'transactions', label: 'Транзакции', icon: <FaHistory /> },
        { id: 'settings', label: 'Настройки', icon: <FaCog /> }
    ];

    return (
        <div className={styles.profileContainer}>
            <Navbar/>
            <div className={styles.profileHeader}>
                <div className={styles.headerBack}>
                    <Link to="/" className={styles.backButton}>
                        <FaArrowLeft /> Вернуться на главную
                    </Link>
                </div>

                <div className={styles.profileInfo}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}>
                            {profileData.avatar ? (
                                <img src={profileData.avatar} alt="Аватар" />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    <FaUser />
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.editButton}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <FaEdit />
                        </button>
                    </div>

                    <div className={styles.profileDetails}>
                        <h1 className={styles.profileUsername}>{profileData.username}</h1>
                        <p className={styles.profileEmail}>{profileData.email}</p>
                        <p className={styles.profileBio}>{profileData.bio}</p>
                    </div>
                </div>
            </div>

            {/* Форма редактирования профиля */}
            {isEditing && (
                <div className={styles.editFormContainer}>
                    <div className={styles.editForm}>
                        <h2 className={styles.editFormTitle}>Редактировать профиль</h2>
                        <form onSubmit={handleSaveProfile}>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Имя пользователя</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="bio">О себе</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>Сохранить</button>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Основной контент с табами */}
            <div className={styles.mainContent}>
                {/* Боковая панель с балансом */}
                <div className={styles.sidebar}>
                    <div className={styles.balanceCard}>
                        <div className={styles.balanceCardHeader}>
                            <h3 className={styles.balanceCardTitle}>Общий баланс</h3>
                            <div className={styles.balanceCardAmount}>
                                <span className={styles.balanceValue}>${totalBalance.toFixed(2)}</span>
                                <span className={styles.balanceChange}>+2.4%</span>
                            </div>
                        </div>

                        <div className={styles.balanceChart}>
                            <div className={styles.chartBar} style={{ height: '40%' }}></div>
                            <div className={styles.chartBar} style={{ height: '60%' }}></div>
                            <div className={styles.chartBar} style={{ height: '75%' }}></div>
                            <div className={styles.chartBar} style={{ height: '50%' }}></div>
                            <div className={styles.chartBar} style={{ height: '85%' }}></div>
                            <div className={styles.chartBar} style={{ height: '70%' }}></div>
                            <div className={styles.chartBar} style={{ height: '90%' }}></div>
                        </div>

                        <div className={styles.balanceActions}>
                            <button className={styles.balanceActionBtn}>
                                <FaCreditCard /> Пополнить
                            </button>
                            <button className={styles.balanceActionBtn}>
                                <FaExchangeAlt /> Обменять
                            </button>
                        </div>
                    </div>

                    <div className={styles.currencyBalances}>
                        <h4 className={styles.currencyBalancesTitle}>Балансы по валютам</h4>
                        {Object.entries(balanceByCurrency).map(([currency, balance]) => (
                            <div key={currency} className={styles.currencyBalanceItem}>
                                <div className={styles.currencyBalanceIcon}>
                                    {getCurrencySymbol(currency)}
                                </div>
                                <div className={styles.currencyBalanceInfo}>
                                    <span className={styles.currencyBalanceName}>{currency}</span>
                                    <span className={styles.currencyBalanceAmount}>{balance.toFixed(8)}</span>
                                </div>
                                <div className={styles.currencyBalanceValue}>
                                    ${(balance * getExchangeRate(currency)).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Контент с табами */}
                <div className={styles.content}>
                    {/* Навигация табов */}
                    <div className={styles.tabsNavigation}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className={styles.tabIcon}>{tab.icon}</span>
                                <span className={styles.tabLabel}>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Контент табов */}
                    <div className={styles.tabContent}>
                        {activeTab === 'overview' && (
                            <div className={styles.overviewContent}>
                                <h3 className={styles.contentTitle}>Обзор аккаунта</h3>

                                <div className={styles.overviewStats}>
                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FaWallet />
                                        </div>
                                        <div className={styles.statInfo}>
                                            <h4 className={styles.statName}>Кошельки</h4>
                                            <p className={styles.statValue}>{profileData.wallets.length}</p>
                                        </div>
                                    </div>

                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FaHistory />
                                        </div>
                                        <div className={styles.statInfo}>
                                            <h4 className={styles.statName}>Транзакции</h4>
                                            <p className={styles.statValue}>24</p>
                                        </div>
                                    </div>

                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FaExchangeAlt />
                                        </div>
                                        <div className={styles.statInfo}>
                                            <h4 className={styles.statName}>Обмены</h4>
                                            <p className={styles.statValue}>12</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.recentActivity}>
                                    <h4 className={styles.activityTitle}>Последняя активность</h4>
                                    <div className={styles.activityList}>
                                        <div className={styles.activityItem}>
                                            <div className={styles.activityIcon}>
                                                <FaBitcoin />
                                            </div>
                                            <div className={styles.activityDetails}>
                                                <p className={styles.activityAction}>Получено BTC</p>
                                                <p className={styles.activityDate}>Сегодня, 14:30</p>
                                            </div>
                                            <div className={styles.activityAmount}>
                                                +0.00123456 BTC
                                            </div>
                                        </div>

                                        <div className={styles.activityItem}>
                                            <div className={styles.activityIcon}>
                                                <FaEthereum />
                                            </div>
                                            <div className={styles.activityDetails}>
                                                <p className={styles.activityAction}>Отправлено ETH</p>
                                                <p className={styles.activityDate}>Вчера, 09:15</p>
                                            </div>
                                            <div className={styles.activityAmount}>
                                                -0.5 ETH
                                            </div>
                                        </div>

                                        <div className={styles.activityItem}>
                                            <div className={styles.activityIcon}>
                                                <FaExchangeAlt />
                                            </div>
                                            <div className={styles.activityDetails}>
                                                <p className={styles.activityAction}>Обмен BTC на ETH</p>
                                                <p className={styles.activityDate}>2 дня назад</p>
                                            </div>
                                            <div className={styles.activityAmount}>
                                                0.01 BTC → 0.15 ETH
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wallets' && (
                            <div className={styles.walletsContent}>
                                <div className={styles.walletsHeader}>
                                    <h3 className={styles.contentTitle}>Ваши кошельки</h3>
                                    <button className={styles.addWalletButton} onClick={() => {
                                        const form = document.getElementById('addWalletForm');
                                        if (form) form.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        + Добавить кошелек
                                    </button>
                                </div>

                                <div className={styles.walletsList}>
                                    {profileData.wallets.map(wallet => (
                                        <div key={wallet.id} className={styles.walletCard}>
                                            <div className={styles.walletHeader}>
                                                <div className={styles.walletNameContainer}>
                                                    <div className={styles.walletIcon}>
                                                        {getCurrencySymbol(wallet.currency)}
                                                    </div>
                                                    <div>
                                                        <h4 className={styles.walletName}>{wallet.name}</h4>
                                                        <p className={styles.walletAddress}>{wallet.address}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className={styles.deleteWalletButton}
                                                    onClick={() => handleDeleteWallet(wallet.id)}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div className={styles.walletBalance}>
                                                <div className={styles.walletBalanceAmount}>
                                                    {wallet.balance.toFixed(8)} {wallet.currency}
                                                </div>
                                                <div className={styles.walletBalanceUsd}>
                                                    ${(wallet.balance * getExchangeRate(wallet.currency)).toFixed(2)}
                                                </div>
                                            </div>

                                            <div className={styles.walletActions}>
                                                <button className={styles.walletActionBtn}>Отправить</button>
                                                <button className={styles.walletActionBtn}>Получить</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.addWalletForm} id="addWalletForm">
                                    <h3 className={styles.addWalletTitle}>Добавить новый кошелек</h3>
                                    <form onSubmit={handleAddWallet}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="walletName">Название кошелька</label>
                                                <input
                                                    type="text"
                                                    id="walletName"
                                                    name="name"
                                                    value={profileData.newWallet.name}
                                                    onChange={handleWalletChange}
                                                    required
                                                />
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label htmlFor="walletCurrency">Тип валюты</label>
                                                <select
                                                    id="walletCurrency"
                                                    name="currency"
                                                    value={profileData.newWallet.currency}
                                                    onChange={handleWalletChange}
                                                >
                                                    <option value="BTC">Bitcoin (BTC)</option>
                                                    <option value="ETH">Ethereum (ETH)</option>
                                                    <option value="USD">US Dollar (USD)</option>
                                                    <option value="EUR">Euro (EUR)</option>
                                                    <option value="GBP">British Pound (GBP)</option>
                                                    <option value="JPY">Japanese Yen (JPY)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="walletAddress">Адрес кошелька</label>
                                            <input
                                                type="text"
                                                id="walletAddress"
                                                name="address"
                                                value={profileData.newWallet.address}
                                                onChange={handleWalletChange}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className={styles.submitButton}>Добавить кошелек</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'transactions' && (
                            <div className={styles.transactionsContent}>
                                <h3 className={styles.contentTitle}>История транзакций</h3>

                                <div className={styles.transactionsFilter}>
                                    <button className={styles.filterButton}>Все</button>
                                    <button className={styles.filterButton}>Отправленные</button>
                                    <button className={styles.filterButton}>Полученные</button>
                                    <button className={styles.filterButton}>Обмены</button>
                                </div>

                                <div className={styles.transactionsList}>
                                    <div className={styles.transactionItem}>
                                        <div className={styles.transactionIcon}>
                                            <FaBitcoin />
                                        </div>
                                        <div className={styles.transactionDetails}>
                                            <p className={styles.transactionAction}>Получено BTC</p>
                                            <p className={styles.transactionDate}>Сегодня, 14:30</p>
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            <span className={styles.transactionValue}>+0.00123456 BTC</span>
                                            <span className={styles.transactionUsd}>≈ $52.56</span>
                                        </div>
                                    </div>

                                    <div className={styles.transactionItem}>
                                        <div className={styles.transactionIcon}>
                                            <FaEthereum />
                                        </div>
                                        <div className={styles.transactionDetails}>
                                            <p className={styles.transactionAction}>Отправлено ETH</p>
                                            <p className={styles.transactionDate}>Вчера, 09:15</p>
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            <span className={`${styles.transactionValue} ${styles.negative}`}>-0.5 ETH</span>
                                            <span className={styles.transactionUsd}>≈ $1,422.88</span>
                                        </div>
                                    </div>

                                    <div className={styles.transactionItem}>
                                        <div className={styles.transactionIcon}>
                                            <FaExchangeAlt />
                                        </div>
                                        <div className={styles.transactionDetails}>
                                            <p className={styles.transactionAction}>Обмен BTC на ETH</p>
                                            <p className={styles.transactionDate}>2 дня назад</p>
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            <span className={styles.transactionValue}>0.01 BTC → 0.15 ETH</span>
                                            <span className={styles.transactionUsd}>≈ $425.68</span>
                                        </div>
                                    </div>

                                    <div className={styles.transactionItem}>
                                        <div className={styles.transactionIcon}>
                                            <FaBitcoin />
                                        </div>
                                        <div className={styles.transactionDetails}>
                                            <p className={styles.transactionAction}>Получено BTC</p>
                                            <p className={styles.transactionDate}>3 дня назад</p>
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            <span className={styles.transactionValue}>+0.005 BTC</span>
                                            <span className={styles.transactionUsd}>≈ $212.84</span>
                                        </div>
                                    </div>

                                    <div className={styles.transactionItem}>
                                        <div className={styles.transactionIcon}>
                                            <FaEthereum />
                                        </div>
                                        <div className={styles.transactionDetails}>
                                            <p className={styles.transactionAction}>Отправлено ETH</p>
                                            <p className={styles.transactionDate}>5 дней назад</p>
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            <span className={`${styles.transactionValue} ${styles.negative}`}>-1.2 ETH</span>
                                            <span className={styles.transactionUsd}>≈ $3,414.90</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.loadMore}>
                                    <button className={styles.loadMoreButton}>Загрузить больше</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className={styles.settingsContent}>
                                <h3 className={styles.contentTitle}>Настройки профиля</h3>

                                <div className={styles.settingsSections}>
                                    <div className={styles.settingsSection}>
                                        <div className={styles.settingsSectionHeader}>
                                            <div className={styles.settingsSectionIcon}>
                                                <FaLock />
                                            </div>
                                            <h4 className={styles.settingsSectionTitle}>Безопасность</h4>
                                        </div>

                                        <div className={styles.settingsOptions}>
                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Двухфакторная аутентификация</h5>
                                                    <p className={styles.settingDescription}>Дополнительный уровень безопасности для вашего аккаунта</p>
                                                </div>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" />
                                                    <span className={styles.slider}></span>
                                                </label>
                                            </div>

                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Уведомления о входе</h5>
                                                    <p className={styles.settingDescription}>Получать уведомления при входе в аккаунт</p>
                                                </div>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span className={styles.slider}></span>
                                                </label>
                                            </div>

                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Сменить пароль</h5>
                                                    <p className={styles.settingDescription}>Обновить пароль для повышения безопасности</p>
                                                </div>
                                                <button className={styles.settingButton}>Сменить</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.settingsSection}>
                                        <div className={styles.settingsSectionHeader}>
                                            <div className={styles.settingsSectionIcon}>
                                                <FaBell />
                                            </div>
                                            <h4 className={styles.settingsSectionTitle}>Уведомления</h4>
                                        </div>

                                        <div className={styles.settingsOptions}>
                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Email уведомления</h5>
                                                    <p className={styles.settingDescription}>Получать важные обновления на email</p>
                                                </div>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span className={styles.slider}></span>
                                                </label>
                                            </div>

                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Push уведомления</h5>
                                                    <p className={styles.settingDescription}>Получать уведомления в браузере</p>
                                                </div>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" />
                                                    <span className={styles.slider}></span>
                                                </label>
                                            </div>

                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>SMS уведомления</h5>
                                                    <p className={styles.settingDescription}>Получать уведомления по SMS</p>
                                                </div>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" />
                                                    <span className={styles.slider}></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.settingsSection}>
                                        <div className={styles.settingsSectionHeader}>
                                            <div className={styles.settingsSectionIcon}>
                                                <FaGlobe />
                                            </div>
                                            <h4 className={styles.settingsSectionTitle}>Предпочтения</h4>
                                        </div>

                                        <div className={styles.settingsOptions}>
                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Валюта отображения</h5>
                                                    <p className={styles.settingDescription}>Выберите основную валюту для отображения балансов</p>
                                                </div>
                                                <div className={styles.currencyOptions}>
                                                    <button className={`${styles.currencyOption} ${styles.activeCurrency}`}>USD</button>
                                                    <button className={styles.currencyOption}>EUR</button>
                                                    <button className={styles.currencyOption}>GBP</button>
                                                    <button className={styles.currencyOption}>JPY</button>
                                                </div>
                                            </div>

                                            <div className={styles.settingOption}>
                                                <div className={styles.settingInfo}>
                                                    <h5 className={styles.settingName}>Язык интерфейса</h5>
                                                    <p className={styles.settingDescription}>Выберите предпочитаемый язык</p>
                                                </div>
                                                <select className={styles.languageSelect}>
                                                    <option>Русский</option>
                                                    <option>English</option>
                                                    <option>Deutsch</option>
                                                    <option>Español</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ProfilePage;
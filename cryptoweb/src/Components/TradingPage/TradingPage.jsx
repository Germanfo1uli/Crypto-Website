import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaEthereum, FaChartLine, FaArrowUp, FaArrowDown, FaExchangeAlt, FaSearch, FaFilter, FaStar, FaCog, FaWallet, FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './TradingPage.module.css';
import Navbar from "../MoreComponents/Navbar";
import Footer from "../MoreComponents/Footer";

const TradingPage = () => {
    const [activeTab, setActiveTab] = useState('spot');
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [tradeType, setTradeType] = useState('buy');
    const [amount, setAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [timeRange, setTimeRange] = useState('1d');

    // Данные криптовалют
    const cryptoData = [
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', price: 42568.32, change24h: 2.4, volume: 28456789012, marketCap: 832456789012 },
        { id: 'ETH', name: 'Ethereum', symbol: 'ETH', price: 2845.75, change24h: 5.2, volume: 15678901234, marketCap: 342567890123 },
        { id: 'BNB', name: 'Binance Coin', symbol: 'BNB', price: 312.45, change24h: -1.2, volume: 1234567890, marketCap: 48901234567 },
        { id: 'SOL', name: 'Solana', symbol: 'SOL', price: 98.76, change24h: 8.7, volume: 2345678901, marketCap: 42345678901 },
        { id: 'ADA', name: 'Cardano', symbol: 'ADA', price: 0.56, change24h: 3.1, volume: 987654321, marketCap: 19876543210 },
        { id: 'XRP', name: 'Ripple', symbol: 'XRP', price: 0.52, change24h: -0.8, volume: 1234567890, marketCap: 27654321098 },
        { id: 'DOT', name: 'Polkadot', symbol: 'DOT', price: 7.23, change24h: 4.5, volume: 876543210, marketCap: 8765432109 },
        { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change24h: 12.3, volume: 3456789012, marketCap: 11234567890 }
    ];

    // Данные для графика (имитация)
    const chartData = {
        '1h': [42100, 42200, 42300, 42400, 42500, 42600, 42700, 42800, 42900, 43000, 42900, 42800, 42700, 42600, 42500, 42400, 42500, 42600, 42700, 42800],
        '4h': [42000, 42200, 42400, 42600, 42800, 43000, 43200, 43400, 43200, 43000, 42800, 42600, 42400, 42200, 42000, 42200, 42400, 42600, 42800, 43000],
        '1d': [40000, 40500, 41000, 41500, 42000, 42500, 43000, 43500, 44000, 43500, 43000, 42500, 42000, 41500, 41000, 41500, 42000, 42500, 43000, 43500],
        '1w': [35000, 36000, 37000, 38000, 39000, 40000, 41000, 42000, 43000, 44000, 43000, 42000, 41000, 40000, 39000, 40000, 41000, 42000, 43000, 44000]
    };

    // Данные для аукционов
    const auctionData = [
        { id: 1, crypto: 'BTC', amount: 0.5, startPrice: 42000, currentBid: 42350, endTime: '2h 15m', participants: 12 },
        { id: 2, crypto: 'ETH', amount: 2.5, startPrice: 2800, currentBid: 2835, endTime: '4h 30m', participants: 8 },
        { id: 3, crypto: 'SOL', amount: 50, startPrice: 95, currentBid: 98.5, endTime: '1h 45m', participants: 15 },
        { id: 4, crypto: 'ADA', amount: 1000, startPrice: 0.54, currentBid: 0.56, endTime: '3h 20m', participants: 6 }
    ];

    // Данные для ордеров
    const orderBookData = {
        buys: [
            { price: 42560.32, amount: 0.5234 },
            { price: 42555.12, amount: 0.3456 },
            { price: 42550.78, amount: 0.7890 },
            { price: 42545.23, amount: 1.2345 },
            { price: 42540.89, amount: 0.5678 }
        ],
        sells: [
            { price: 42575.45, amount: 0.4321 },
            { price: 42580.12, amount: 0.6789 },
            { price: 42585.67, amount: 0.2345 },
            { price: 42590.34, amount: 0.8901 },
            { price: 42595.89, amount: 0.3456 }
        ]
    };

    // Фильтрация криптовалют по поисковому запросу
    const filteredCrypto = cryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Получение текущей выбранной криптовалюты
    const currentCrypto = cryptoData.find(crypto => crypto.id === selectedCrypto) || cryptoData[0];

    // Расчет общего объема ордеров
    const calculateTotalVolume = (orders) => {
        return orders.reduce((total, order) => total + (order.price * order.amount), 0);
    };

    // Обработка отправки торгового ордера
    const handleTradeSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        const tradeData = {
            type: tradeType,
            crypto: currentCrypto.id,
            amount: parseFloat(amount),
            price: currentCrypto.price
        };

        console.log('Trade submitted:', tradeData);
        alert(`${tradeType === 'buy' ? 'Покупка' : 'Продажа'} ${amount} ${currentCrypto.symbol} по цене $${currentCrypto.price.toFixed(2)}`);
        setAmount('');
    };

    // Табы для навигации
    const tabs = [
        { id: 'spot', label: 'Спот', icon: <FaExchangeAlt /> },
        { id: 'futures', label: 'Фьючерсы', icon: <FaChartLine /> },
        { id: 'auctions', label: 'Аукционы', icon: <FaStar /> }
    ];

    // Временные интервалы для графика
    const timeRanges = [
        { id: '1h', label: '1ч' },
        { id: '4h', label: '4ч' },
        { id: '1d', label: '1д' },
        { id: '1w', label: '1н' }
    ];

    return (
        <div className={styles.tradingContainer}>
            <Navbar/>
            <div className={styles.tradingHeader}>
                <div className={styles.headerTitle}>
                    <h1>Торговля криптовалютами</h1>
                    <p>Покупайте, продавайте и обменивайте криптовалюты по лучшим ценам</p>
                </div>
            </div>

            {/* Основной контент */}
            <div className={styles.mainContent}>
                {/* Левая боковая панель со списком криптовалют */}
                <div className={styles.leftSidebar}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Поиск криптовалюты..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className={styles.filterButton}>
                            <FaFilter />
                        </button>
                    </div>

                    <div className={styles.cryptoList}>
                        <div className={styles.cryptoListHeader}>
                            <span>Криптовалюта</span>
                            <span>Цена</span>
                            <span>24ч %</span>
                        </div>

                        <div className={styles.cryptoListItems}>
                            {filteredCrypto.map(crypto => (
                                <div
                                    key={crypto.id}
                                    className={`${styles.cryptoListItem} ${selectedCrypto === crypto.id ? styles.selectedCrypto : ''}`}
                                    onClick={() => setSelectedCrypto(crypto.id)}
                                >
                                    <div className={styles.cryptoInfo}>
                                        <div className={styles.cryptoIcon}>
                                            {crypto.id === 'BTC' && <FaBitcoin />}
                                            {crypto.id === 'ETH' && <FaEthereum />}
                                            {crypto.id !== 'BTC' && crypto.id !== 'ETH' && (
                                                <div className={styles.genericIcon}>{crypto.symbol.charAt(0)}</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className={styles.cryptoName}>{crypto.name}</div>
                                            <div className={styles.cryptoSymbol}>{crypto.symbol}</div>
                                        </div>
                                    </div>
                                    <div className={styles.cryptoPrice}>${crypto.price.toLocaleString()}</div>
                                    <div className={`${styles.cryptoChange} ${crypto.change24h >= 0 ? styles.positive : styles.negative}`}>
                                        {crypto.change24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(crypto.change24h)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Центральная область с графиком и торгами */}
                <div className={styles.centerContent}>
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

                    {/* Информация о выбранной криптовалюте */}
                    <div className={styles.cryptoInfoHeader}>
                        <div className={styles.cryptoMainInfo}>
                            <div className={styles.cryptoHeaderIcon}>
                                {currentCrypto.id === 'BTC' && <FaBitcoin />}
                                {currentCrypto.id === 'ETH' && <FaEthereum />}
                                {currentCrypto.id !== 'BTC' && currentCrypto.id !== 'ETH' && (
                                    <div className={styles.genericIconLarge}>{currentCrypto.symbol.charAt(0)}</div>
                                )}
                            </div>
                            <div>
                                <h2 className={styles.cryptoNameLarge}>{currentCrypto.name} <span className={styles.cryptoSymbolLarge}>{currentCrypto.symbol}</span></h2>
                                <div className={styles.cryptoPriceLarge}>${currentCrypto.price.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className={styles.cryptoStats}>
                            <div className={styles.cryptoStat}>
                                <span className={styles.statLabel}>24ч %</span>
                                <span className={`${styles.statValue} ${currentCrypto.change24h >= 0 ? styles.positive : styles.negative}`}>
                  {currentCrypto.change24h >= 0 ? '+' : ''}{currentCrypto.change24h}%
                </span>
                            </div>
                            <div className={styles.cryptoStat}>
                                <span className={styles.statLabel}>Объем 24ч</span>
                                <span className={styles.statValue}>${(currentCrypto.volume / 1000000).toFixed(2)}M</span>
                            </div>
                            <div className={styles.cryptoStat}>
                                <span className={styles.statLabel}>Маркеткап</span>
                                <span className={styles.statValue}>${(currentCrypto.marketCap / 1000000000).toFixed(2)}B</span>
                            </div>
                        </div>
                    </div>

                    {/* График */}
                    <div className={styles.chartContainer}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>График цены {currentCrypto.name}</h3>
                            <div className={styles.timeRangeSelector}>
                                {timeRanges.map(range => (
                                    <button
                                        key={range.id}
                                        className={`${styles.timeRangeButton} ${timeRange === range.id ? styles.activeTimeRange : ''}`}
                                        onClick={() => setTimeRange(range.id)}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.chart}>
                            <div className={styles.chartArea}>
                                {/* Имитация графика */}
                                <div className={styles.chartBars}>
                                    {chartData[timeRange].map((value, index) => {
                                        const maxValue = Math.max(...chartData[timeRange]);
                                        const minValue = Math.min(...chartData[timeRange]);
                                        const height = ((value - minValue) / (maxValue - minValue)) * 100;

                                        return (
                                            <div
                                                key={index}
                                                className={styles.chartBar}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        );
                                    })}
                                </div>

                                {/* Текущая цена на графике */}
                                <div className={styles.currentPriceLine}>
                                    <div className={styles.currentPriceLabel}>
                                        ${currentCrypto.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Торговая панель */}
                    <div className={styles.tradingPanel}>
                        <div className={styles.tradeTypeSelector}>
                            <button
                                className={`${styles.tradeTypeButton} ${tradeType === 'buy' ? styles.buyActive : ''}`}
                                onClick={() => setTradeType('buy')}
                            >
                                Покупка
                            </button>
                            <button
                                className={`${styles.tradeTypeButton} ${tradeType === 'sell' ? styles.sellActive : ''}`}
                                onClick={() => setTradeType('sell')}
                            >
                                Продажа
                            </button>
                        </div>

                        <form onSubmit={handleTradeSubmit} className={styles.tradeForm}>
                            <div className={styles.formGroup}>
                                <label>Количество ({currentCrypto.symbol})</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                    step="0.00000001"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Цена (USD)</label>
                                <input
                                    type="text"
                                    value={`$${currentCrypto.price.toLocaleString()}`}
                                    readOnly
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Итого</label>
                                <input
                                    type="text"
                                    value={amount ? `$${(parseFloat(amount) * currentCrypto.price).toLocaleString()}` : '$0.00'}
                                    readOnly
                                />
                            </div>

                            <button
                                type="submit"
                                className={`${styles.submitButton} ${tradeType === 'buy' ? styles.buyButton : styles.sellButton}`}
                            >
                                {tradeType === 'buy' ? 'Купить' : 'Продать'} {currentCrypto.symbol}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Правая боковая панель с ордерами */}
                <div className={styles.rightSidebar}>
                    <div className={styles.orderBook}>
                        <h3 className={styles.orderBookTitle}>Стакан ордеров</h3>

                        <div className={styles.orderBookHeader}>
                            <span>Цена (USD)</span>
                            <span>Количество ({currentCrypto.symbol})</span>
                        </div>

                        <div className={styles.orderBookSells}>
                            {orderBookData.sells.map((order, index) => (
                                <div key={index} className={styles.orderBookSell}>
                                    <span className={styles.orderPriceSell}>{order.price.toLocaleString()}</span>
                                    <span>{order.amount}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.currentPrice}>
                            <span>{currentCrypto.price.toLocaleString()}</span>
                        </div>

                        <div className={styles.orderBookBuys}>
                            {orderBookData.buys.map((order, index) => (
                                <div key={index} className={styles.orderBookBuy}>
                                    <span className={styles.orderPriceBuy}>{order.price.toLocaleString()}</span>
                                    <span>{order.amount}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.orderBookSummary}>
                            <div className={styles.orderBookSummaryItem}>
                                <span>Объем продаж:</span>
                                <span>${calculateTotalVolume(orderBookData.sells).toLocaleString()}</span>
                            </div>
                            <div className={styles.orderBookSummaryItem}>
                                <span>Объем покупок:</span>
                                <span>${calculateTotalVolume(orderBookData.buys).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'auctions' && (
                        <div className={styles.auctionsPanel}>
                            <h3 className={styles.auctionsTitle}>Активные аукционы</h3>

                            <div className={styles.auctionsList}>
                                {auctionData.map(auction => (
                                    <div key={auction.id} className={styles.auctionCard}>
                                        <div className={styles.auctionHeader}>
                                            <div className={styles.auctionCrypto}>
                                                {auction.crypto === 'BTC' && <FaBitcoin />}
                                                {auction.crypto === 'ETH' && <FaEthereum />}
                                                {auction.crypto !== 'BTC' && auction.crypto !== 'ETH' && (
                                                    <div className={styles.genericIcon}>{auction.crypto.charAt(0)}</div>
                                                )}
                                                <span>{auction.crypto}</span>
                                            </div>
                                            <div className={styles.auctionEndTime}>
                                                {auction.endTime}
                                            </div>
                                        </div>

                                        <div className={styles.auctionDetails}>
                                            <div className={styles.auctionAmount}>
                                                <span className={styles.auctionLabel}>Количество:</span>
                                                <span>{auction.amount} {auction.crypto}</span>
                                            </div>
                                            <div className={styles.auctionPrice}>
                                                <span className={styles.auctionLabel}>Стартовая цена:</span>
                                                <span>${auction.startPrice.toLocaleString()}</span>
                                            </div>
                                            <div className={styles.auctionCurrentBid}>
                                                <span className={styles.auctionLabel}>Текущая ставка:</span>
                                                <span className={styles.auctionBidValue}>${auction.currentBid.toLocaleString()}</span>
                                            </div>
                                            <div className={styles.auctionParticipants}>
                                                <span className={styles.auctionLabel}>Участники:</span>
                                                <span>{auction.participants}</span>
                                            </div>
                                        </div>

                                        <button className={styles.auctionButton}>
                                            Сделать ставку
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TradingPage;
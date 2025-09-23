import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaEthereum, FaChartLine, FaArrowUp, FaArrowDown, FaExchangeAlt, FaSearch, FaFilter, FaStar, FaCog, FaWallet, FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    ResponsiveContainer, ComposedChart,
    XAxis, YAxis, CartesianGrid, Tooltip,  Scatter
} from 'recharts';
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


    const generateCandlestickData = (basePrice, count = 30) => {
        const data = [];
        let currentPrice = basePrice;
        const now = new Date();

        for (let i = count - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setHours(date.getHours() - i);

            // Генерируем случайные значения для OHLC
            const open = currentPrice;
            const change = (Math.random() - 0.5) * 0.05; // Изменение до 5%
            const close = open * (1 + change);

            // Генерируем максимум и минимум
            const high = Math.max(open, close) * (1 + Math.random() * 0.02);
            const low = Math.min(open, close) * (1 - Math.random() * 0.02);

            data.push({
                date: date.toISOString(),
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
                fullDate: date
            });

            currentPrice = close;
        }

        return data;
    };

    // Данные для графика (свечи)
    const [candlestickData, setCandlestickData] = useState([]);

    // Генерируем данные при монтировании компонента и при изменении выбранной криптовалюты
    useEffect(() => {
        const currentCrypto = cryptoData.find(crypto => crypto.id === selectedCrypto) || cryptoData[0];
        setCandlestickData(generateCandlestickData(currentCrypto.price));
    }, [selectedCrypto]);

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


    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const isPositive = data.close >= data.open;

            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipTime}>{data.fullDate.toLocaleString()}</p>
                    <div className={styles.tooltipPrices}>
                        <div className={styles.tooltipPriceRow}>
                            <span className={styles.tooltipLabel}>Открытие:</span>
                            <span className={styles.tooltipValue}>${data.open.toLocaleString()}</span>
                        </div>
                        <div className={styles.tooltipPriceRow}>
                            <span className={styles.tooltipLabel}>Максимум:</span>
                            <span className={styles.tooltipValue}>${data.high.toLocaleString()}</span>
                        </div>
                        <div className={styles.tooltipPriceRow}>
                            <span className={styles.tooltipLabel}>Минимум:</span>
                            <span className={styles.tooltipValue}>${data.low.toLocaleString()}</span>
                        </div>
                        <div className={styles.tooltipPriceRow}>
                            <span className={styles.tooltipLabel}>Закрытие:</span>
                            <span className={`${styles.tooltipValue} ${isPositive ? styles.positive : styles.negative}`}>
                                ${data.close.toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.tooltipPriceRow}>
                            <span className={styles.tooltipLabel}>Изменение:</span>
                            <span className={`${styles.tooltipValue} ${isPositive ? styles.positive : styles.negative}`}>
                                {isPositive ? '+' : ''}{((data.close - data.open) / data.open * 100).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };


    const Candlestick = (props) => {
        const { cx, cy, payload } = props;
        const { open, close, high, low } = payload;
        const isPositive = close >= open;

        // Цвета для бычьих и медвежьих свечей
        const bullishColor = '#e6b366'; // Теплый золотисто-оранжевый
        const bearishColor = '#d2695e'; // Теплый красно-коричневый

        const color = isPositive ? bullishColor : bearishColor;

        // Рассчитываем размеры и позиции
        const maxPrice = Math.max(high, low);
        const minPrice = Math.min(high, low);
        const priceRange = maxPrice - minPrice || 1; // Избегаем деления на ноль

        // Высота линии максимума/минимума
        const lineHeight = ((high - low) / priceRange) * 50;

        // Позиция Y для тела свечи
        const bodyY = cy - ((Math.max(open, close) - minPrice) / priceRange) * 50;

        // Высота тела свечи
        const bodyHeight = Math.max(1, Math.abs(open - close) / priceRange * 50);

        // Ширина тела свечи
        const bodyWidth = 12;

        return (
            <g>

                <line
                    x1={cx}
                    y1={cy - lineHeight / 2}
                    x2={cx}
                    y2={cy + lineHeight / 2}
                    stroke={color}
                    strokeWidth={1.5}
                />

                <rect
                    x={cx - bodyWidth / 2}
                    y={bodyY}
                    width={bodyWidth}
                    height={bodyHeight}
                    fill={color}
                    stroke={color}
                    strokeWidth={1.5}
                    rx={1}
                    opacity={0.8}
                />
            </g>
        );
    };

    return (
        <div className={styles.tradingContainer}>
            <Navbar/>
            <div className={styles.tradingHeader}>
                <div className={styles.headerTitle}>
                    <h1>Торговля криптовалютами</h1>
                    <p>Покупайте, продавайте и обменивайте криптовалюты по лучшим ценам</p>
                </div>
            </div>

            <div className={styles.mainContent}>
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

                <div className={styles.centerContent}>

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
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        data={candlestickData}
                                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="rgba(255, 255, 255, 0.03)"
                                            horizontal={true}
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#666', fontSize: 12 }}
                                        />
                                        <YAxis
                                            domain={['dataMin - 100', 'dataMax + 100']}
                                            orientation="right"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#666', fontSize: 12 }}
                                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Scatter
                                            dataKey="close"
                                            shape={<Candlestick />}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
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
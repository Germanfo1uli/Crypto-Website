import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { RiSearchLine, RiCurrencyLine } from 'react-icons/ri';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Area, AreaChart, Legend
} from 'recharts';
import styles from './Market.module.css';

// Генерация данных для графика (заглушка)
const generateChartData = (basePrice, volatility = 0.02, points = 24) => {
    const data = [];
    let currentPrice = basePrice;
    const now = new Date();

    for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(time.getHours() - i);

        const change = (Math.random() - 0.5) * 2 * volatility;
        currentPrice = currentPrice * (1 + change);

        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: parseFloat(currentPrice.toFixed(2)),
            fullTime: time
        });
    }

    return data;
};

const Market = () => {
    // Данные для криптовалют (заглушки для будущего бэка)
    const cryptoData = [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: <FaBitcoin />,
            price: 42568.32,
            change: 2.4,
            changePositive: true,
            volume: '28.5B',
            marketCap: '832.4B',
            chartData: [40, 60, 75, 50, 85, 70, 90],
            // Добавляем данные для детального графика
            detailChartData: generateChartData(42568.32)
        },
        {
            id: 2,
            name: 'Ethereum',
            symbol: 'ETH',
            icon: <FaEthereum />,
            price: 2845.75,
            change: 5.2,
            changePositive: true,
            volume: '15.2B',
            marketCap: '341.8B',
            chartData: [30, 45, 65, 40, 75, 85, 95],
            detailChartData: generateChartData(2845.75)
        },
        {
            id: 3,
            name: 'Litecoin',
            symbol: 'LTC',
            icon: <RiCurrencyLine />,
            price: 73.21,
            change: -1.3,
            changePositive: false,
            volume: '2.1B',
            marketCap: '5.3B',
            chartData: [50, 45, 40, 55, 60, 45, 40],
            detailChartData: generateChartData(73.21)
        },
        {
            id: 4,
            name: 'Ripple',
            symbol: 'XRP',
            icon: <RiCurrencyLine />,
            price: 0.6234,
            change: 0.8,
            changePositive: true,
            volume: '1.8B',
            marketCap: '33.7B',
            chartData: [60, 65, 70, 65, 75, 80, 85],
            detailChartData: generateChartData(0.6234)
        },
        {
            id: 5,
            name: 'Cardano',
            symbol: 'ADA',
            icon: <FaChartLine />,
            price: 0.5821,
            change: -0.5,
            changePositive: false,
            volume: '890M',
            marketCap: '20.4B',
            chartData: [45, 50, 45, 40, 35, 30, 35],
            detailChartData: generateChartData(0.5821)
        },
        {
            id: 6,
            name: 'Solana',
            symbol: 'SOL',
            icon: <FaChartLine />,
            price: 98.45,
            change: 8.7,
            changePositive: true,
            volume: '3.2B',
            marketCap: '42.1B',
            chartData: [30, 40, 50, 65, 80, 90, 95],
            detailChartData: generateChartData(98.45)
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);
    const [timePeriod, setTimePeriod] = useState('1D');

    // Функция для получения данных графика в зависимости от выбранного периода
    const getChartDataForPeriod = (crypto, period) => {
        // В реальном приложении здесь был бы запрос к API
        switch(period) {
            case '1D':
                return generateChartData(crypto.price, 0.02, 24);
            case '1W':
                return generateChartData(crypto.price, 0.05, 7);
            case '1M':
                return generateChartData(crypto.price, 0.1, 30);
            case '3M':
                return generateChartData(crypto.price, 0.15, 90);
            case '1Y':
                return generateChartData(crypto.price, 0.2, 365);
            default:
                return generateChartData(crypto.price, 0.02, 24);
        }
    };


    const currentChartData = getChartDataForPeriod(selectedCrypto, timePeriod);

    const filteredCrypto = cryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipTime}>{payload[0].payload.fullTime.toLocaleString()}</p>
                    <p className={styles.tooltipPrice}>
                        ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Определяем цвета в зависимости от изменения цены
    const getChartColors = () => {
        return selectedCrypto.changePositive
            ? {
                stroke: '#e6b366',    // Теплый золотисто-оранжевый для роста
                fill: 'url(#colorPricePositive)',
                dot: '#e6b366'
            }
            : {
                stroke: '#d2695e',    // Теплый красно-коричневый для падения
                fill: 'url(#colorPriceNegative)',
                dot: '#d2695e'
            };
    };

    const chartColors = getChartColors();

    return (
        <section className={styles.market}>
            <div className={styles.marketContainer}>
                <div className={styles.marketHeader}>
                    <h2 className={styles.marketTitle}>Рынок криптовалют</h2>
                    <p className={styles.marketDescription}>
                        Отслеживайте цены и тенденции на рынке криптовалют в реальном времени
                    </p>
                </div>

                <div className={styles.marketContent}>

                    <div className={styles.marketControls}>
                        <div className={styles.searchBox}>
                            <RiSearchLine className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Поиск криптовалюты..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterButtons}>
                            <button className={styles.filterBtnActive}>Все</button>
                            <button className={styles.filterBtn}>Популярные</button>
                            <button className={styles.filterBtn}>Новинки</button>
                            <button className={styles.filterBtn}>Дефли</button>
                        </div>
                    </div>

                    <div className={styles.marketGrid}>

                        <div className={styles.cryptoList}>
                            <div className={styles.listHeader}>
                                <div className={styles.listHeaderCell}>Криптовалюта</div>
                                <div className={styles.listHeaderCell}>Цена</div>
                                <div className={styles.listHeaderCell}>24ч %</div>
                                <div className={styles.listHeaderCell}>График</div>
                            </div>

                            <div className={styles.listBody}>
                                {filteredCrypto.map(crypto => (
                                    <div
                                        key={crypto.id}
                                        className={`${styles.listRow} ${selectedCrypto.id === crypto.id ? styles.activeRow : ''}`}
                                        onClick={() => setSelectedCrypto(crypto)}
                                    >
                                        <div className={styles.listCell}>
                                            <div className={styles.cryptoInfo}>
                                                <div className={styles.cryptoIconContainer}>
                                                    {crypto.icon}
                                                </div>
                                                <div>
                                                    <div className={styles.cryptoName}>{crypto.name}</div>
                                                    <div className={styles.cryptoSymbol}>{crypto.symbol}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.listCell}>
                                            <div className={styles.cryptoPrice}>${crypto.price.toLocaleString()}</div>
                                        </div>
                                        <div className={styles.listCell}>
                                            <div className={`${styles.cryptoChange} ${crypto.changePositive ? styles.positive : styles.negative}`}>
                                                {crypto.changePositive ? <FaArrowUp /> : <FaArrowDown />}
                                                {Math.abs(crypto.change)}%
                                            </div>
                                        </div>
                                        <div className={styles.listCell}>
                                            <div className={styles.miniChart}>
                                                {crypto.chartData.map((value, index) => (
                                                    <div
                                                        key={index}
                                                        className={styles.miniChartBar}
                                                        style={{
                                                            height: `${value}%`,
                                                            backgroundColor: crypto.changePositive ? '#e6b366' : '#d2695e'
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.cryptoDetail}>
                            <div className={styles.detailHeader}>
                                <div className={styles.detailTitleContainer}>
                                    <div className={styles.detailIconContainer}>
                                        {selectedCrypto.icon}
                                    </div>
                                    <div>
                                        <div className={styles.detailName}>{selectedCrypto.name}</div>
                                        <div className={styles.detailSymbol}>{selectedCrypto.symbol}</div>
                                    </div>
                                </div>
                                <div className={styles.detailPriceContainer}>
                                    <div className={styles.detailPrice}>${selectedCrypto.price.toLocaleString()}</div>
                                    <div className={`${styles.detailChange} ${selectedCrypto.changePositive ? styles.positive : styles.negative}`}>
                                        {selectedCrypto.changePositive ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(selectedCrypto.change)}%
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailChart}>
                                <div className={styles.chartHeader}>
                                    <h3 className={styles.chartTitle}>График цены</h3>
                                    <div className={styles.chartPeriods}>
                                        <button
                                            className={`${styles.periodBtn} ${timePeriod === '1D' ? styles.periodBtnActive : ''}`}
                                            onClick={() => setTimePeriod('1D')}
                                        >1D</button>
                                        <button
                                            className={`${styles.periodBtn} ${timePeriod === '1W' ? styles.periodBtnActive : ''}`}
                                            onClick={() => setTimePeriod('1W')}
                                        >1W</button>
                                        <button
                                            className={`${styles.periodBtn} ${timePeriod === '1M' ? styles.periodBtnActive : ''}`}
                                            onClick={() => setTimePeriod('1M')}
                                        >1M</button>
                                        <button
                                            className={`${styles.periodBtn} ${timePeriod === '3M' ? styles.periodBtnActive : ''}`}
                                            onClick={() => setTimePeriod('3M')}
                                        >3M</button>
                                        <button
                                            className={`${styles.periodBtn} ${timePeriod === '1Y' ? styles.periodBtnActive : ''}`}
                                            onClick={() => setTimePeriod('1Y')}
                                        >1Y</button>
                                    </div>
                                </div>

                                <div className={styles.chartContainer}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={currentChartData}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorPricePositive" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#e6b366" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#e6b366" stopOpacity={0.05} />
                                                </linearGradient>
                                                <linearGradient id="colorPriceNegative" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#d2695e" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#d2695e" stopOpacity={0.05} />
                                                </linearGradient>
                                            </defs>
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
                                                domain={['dataMin - 5', 'dataMax + 5']}
                                                orientation="right"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#666', fontSize: 12 }}
                                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                                cursor={{ stroke: 'rgba(255, 255, 255, 0.05)', strokeWidth: 1 }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="price"
                                                stroke={chartColors.stroke}
                                                fillOpacity={1}
                                                fill={chartColors.fill}
                                                activeDot={{ r: 6, fill: chartColors.dot }}
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className={styles.detailStats}>
                                <div className={styles.statRow}>
                                    <div className={styles.statLabel}>Рыночная капитализация</div>
                                    <div className={styles.statValue}>${selectedCrypto.marketCap}</div>
                                </div>
                                <div className={styles.statRow}>
                                    <div className={styles.statLabel}>Объем торгов (24ч)</div>
                                    <div className={styles.statValue}>${selectedCrypto.volume}</div>
                                </div>
                                <div className={styles.statRow}>
                                    <div className={styles.statLabel}>Циркулирующее предложение</div>
                                    <div className={styles.statValue}>19.4M {selectedCrypto.symbol}</div>
                                </div>
                                <div className={styles.statRow}>
                                    <div className={styles.statLabel}>Максимум за 24ч</div>
                                    <div className={styles.statValue}>${(selectedCrypto.price * 1.05).toLocaleString()}</div>
                                </div>
                                <div className={styles.statRow}>
                                    <div className={styles.statLabel}>Минимум за 24ч</div>
                                    <div className={styles.statValue}>${(selectedCrypto.price * 0.95).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className={styles.detailActions}>
                                <button className={styles.buyBtn}>Купить {selectedCrypto.symbol}</button>
                                <button className={styles.sellBtn}>Продать {selectedCrypto.symbol}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Market;
import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaChartLine, FaArrowUp, FaArrowDown, FaSearch as FaSearchOld } from 'react-icons/fa';
import { RiSearchLine, RiCurrencyLine } from 'react-icons/ri';
import styles from './Market.module.css';

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
            chartData: [40, 60, 75, 50, 85, 70, 90]
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
            chartData: [30, 45, 65, 40, 75, 85, 95]
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
            chartData: [50, 45, 40, 55, 60, 45, 40]
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
            chartData: [60, 65, 70, 65, 75, 80, 85]
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
            chartData: [45, 50, 45, 40, 35, 30, 35]
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
            chartData: [30, 40, 50, 65, 80, 90, 95]
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);


    const filteredCrypto = cryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                                            backgroundColor: crypto.changePositive ? '#4dff88' : '#ff4d4d'
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
                                        <button className={styles.periodBtnActive}>1D</button>
                                        <button className={styles.periodBtn}>1W</button>
                                        <button className={styles.periodBtn}>1M</button>
                                        <button className={styles.periodBtn}>3M</button>
                                        <button className={styles.periodBtn}>1Y</button>
                                    </div>
                                </div>

                                <div className={styles.chartContainer}>
                                    {/* Заглушка для графика */}
                                    <div className={styles.chartPlaceholder}>
                                        <div className={styles.chartGrid}>
                                            {/* Горизонтальные линии сетки */}
                                            <div className={styles.gridLine}></div>
                                            <div className={styles.gridLine}></div>
                                            <div className={styles.gridLine}></div>
                                            <div className={styles.gridLine}></div>
                                        </div>

                                        <div className={styles.chartLine}>
                                            {/* График будет здесь */}
                                            <div className={styles.chartArea}></div>
                                        </div>
                                    </div>
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
---
title: "Finance Dashboard"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Real-time financial data with live market updates, trade statistics, and crypto analysis"
markup: "html"
---

<div class="finance-dashboard">
    <header class="finance-header">
        <h1>📊 Finance Dashboard</h1>
        <p>Welcome to the comprehensive finance data center with real-time market information.</p>
    </header>

    <h2>🧮 Calculators</h2>
    <div class="submenu-grid">
        <a href="/finance/investment-calculator/" class="submenu-card">
            <span class="submenu-icon">💰</span>
            <span class="submenu-title">Investment Calculator</span>
            <span class="submenu-desc">Calculate your investment returns</span>
        </a>
        <a href="/finance/pension-calculator/" class="submenu-card">
            <span class="submenu-icon">🏠</span>
            <span class="submenu-title">Pension Calculator</span>
            <span class="submenu-desc">Plan your retirement savings</span>
        </a>
    </div>

    <h2>📈 Market Indices & Commodities</h2>
    <div id="indices-ticker" class="indices-ticker">
        <div class="loading-skeleton">Loading market data...</div>
    </div>

    <h2>₿ Cryptocurrency</h2>
    <div id="crypto-ticker" class="crypto-ticker">
        <div class="loading-skeleton">Loading cryptocurrency data...</div>
    </div>
</div>

<!-- Load Finance API Scripts -->
<script src="/js/finance-core.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    loadMarketData();
    // Refresh market data every 5 minutes (300000ms)
    setInterval(loadMarketData, 300000);
});

async function loadMarketData() {
    try {
        const response = await fetch('/data/market-prices.json');
        if (!response.ok) throw new Error('Failed to load market data');
        const data = await response.json();
        renderIndices(data.indices);
        renderCrypto(data.crypto);
    } catch (error) {
        console.error('Error loading market data:', error);
        document.getElementById('indices-ticker').innerHTML = '<div class="loading-skeleton">Failed to load market data. Please refresh.</div>';
        document.getElementById('crypto-ticker').innerHTML = '<div class="loading-skeleton">Failed to load crypto data. Please refresh.</div>';
    }
}

function renderIndices(indices) {
    const container = document.getElementById('indices-ticker');
    if (!indices) {
        container.innerHTML = '<div class="loading-skeleton">No market data available</div>';
        return;
    }
    
    const items = [];
    if (indices.SP500) items.push(createTickerItem('SP500', '^GSPC', indices.SP500.price, indices.SP500.change_percent, 'S&P 500'));
    if (indices.NASDAQ) items.push(createTickerItem('NASDAQ', '^IXIC', indices.NASDAQ.price, indices.NASDAQ.change_percent, 'NASDAQ'));
    if (indices.GOLD) items.push(createTickerItem('GOLD', 'XAU/USD', indices.GOLD.price, indices.GOLD.change_percent, 'Gold'));
    
    container.innerHTML = items.join('');
}

function renderCrypto(crypto) {
    const container = document.getElementById('crypto-ticker');
    if (!crypto) {
        container.innerHTML = '<div class="loading-skeleton">No crypto data available</div>';
        return;
    }
    
    const items = [];
    if (crypto.BTC) items.push(createTickerItem('BTC', 'BTC/USD', crypto.BTC.price, crypto.BTC.change_pct, 'Bitcoin'));
    if (crypto.ETH) items.push(createTickerItem('ETH', 'ETH/USD', crypto.ETH.price, crypto.ETH.change_pct, 'Ethereum'));
    if (crypto.SOL) items.push(createTickerItem('SOL', 'SOL/USD', crypto.SOL.price, crypto.SOL.change_pct, 'Solana'));
    
    container.innerHTML = items.join('');
}

function createTickerItem(symbol, fullName, price, changePercent, label) {
    const isPositive = changePercent >= 0;
    const sign = isPositive ? '+' : '';
    const changeClass = isPositive ? 'positive' : 'negative';
    
    let displayPrice = price;
    if (price >= 1000) {
        displayPrice = '$' + price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
        displayPrice = '$' + price.toFixed(2);
    }
    
    return `
        <div class="ticker-item">
            <div class="ticker-symbol">
                <span class="ticker-name">${label}</span>
                <span class="ticker-full">${fullName}</span>
            </div>
            <div class="ticker-price">${displayPrice}</div>
            <div class="ticker-change ${changeClass}">
                ${sign}${changePercent.toFixed(2)}%
            </div>
        </div>
    `;
}
</script>

<style>
.submenu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0 30px 0;
}

.submenu-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
}

.submenu-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.submenu-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
}

.submenu-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 6px;
}

.submenu-desc {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
}

/* Ticker styles */
.indices-ticker, .crypto-ticker {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
}

.ticker-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.ticker-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.ticker-symbol {
    display: flex;
    flex-direction: column;
    min-width: 100px;
}

.ticker-name {
    font-weight: 700;
    color: #333;
    font-size: 1rem;
}

.ticker-full {
    font-size: 0.75rem;
    color: #888;
}

.ticker-price {
    flex: 1;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1.1rem;
    text-align: center;
}

.ticker-change {
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 6px;
    min-width: 80px;
    text-align: center;
    font-size: 0.9rem;
}

.ticker-change.positive {
    background-color: #d4edda;
    color: #155724;
}

.ticker-change.negative {
    background-color: #f8d7da;
    color: #721c24;
}

.loading-skeleton {
    text-align: center;
    padding: 20px;
    color: #666;
    background: #f8f9fa;
    border-radius: 8px;
}

@media (max-width: 600px) {
    .ticker-item {
        flex-wrap: wrap;
        gap: 10px;
    }
    .ticker-price {
        text-align: left;
    }
}
</style>

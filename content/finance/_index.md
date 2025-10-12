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

    <h2>Live Market Overview</h2>
    <div id="crypto-ticker" class="crypto-ticker">
        <div class="loading-skeleton">Loading live cryptocurrency data...</div>
    </div>
</div>

<!-- Load Finance API Scripts -->
<script src="/js/finance-core.js"></script>
<script src="/js/finance-data.js"></script>

<style>
.crypto-ticker {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 500px;
    overflow-y: auto;
    padding: 0;
    margin-top: 20px;
}

.ticker-item {
    display: flex;
    align-items: center;
    gap: 16px;
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

.crypto-number {
    background: #4a90e2;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.crypto-symbol {
    font-weight: bold;
    color: #333;
    min-width: 80px;
    font-size: 1rem;
}

.crypto-price {
    font-weight: 600;
    color: #2c3e50;
    flex: 1;
    text-align: center;
    font-size: 1.1rem;
}

.crypto-change {
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
    min-width: 70px;
    text-align: center;
}

.crypto-change.positive {
    background-color: #d4edda;
    color: #155724;
}

.crypto-change.negative {
    background-color: #f8d7da;
    color: #721c24;
}

.loading-skeleton {
    text-align: center;
    padding: 20px;
    color: #666;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for scripts to load
    setTimeout(() => {
        if (typeof window.financeAPI !== 'undefined') {
            initializeDashboard();
        } else {
            console.error('Finance API not loaded, using mock data');
            loadMockData();
        }
    }, 100);
});

async function initializeDashboard() {
    try {
        // Load crypto ticker
        await loadCryptoTicker();
        
        // Setup auto-refresh
        setupAutoRefresh();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

async function loadCryptoTicker() {
    try {
        const cryptoData = await window.financeAPI.getCryptocurrencyData();
        const ticker = document.getElementById('crypto-ticker');
        
        if (cryptoData && cryptoData.length > 0) {
            ticker.innerHTML = cryptoData.map((crypto, index) => `
                <div class="ticker-item">
                    <div class="crypto-number">${index + 1}</div>
                    <span class="crypto-symbol">${crypto.symbol}</span>
                    <span class="crypto-price">${window.financeAPI.formatCurrency(crypto.price)}</span>
                    <span class="crypto-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}">
                        ${window.financeAPI.formatPercentage(crypto.change24h)}
                    </span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading crypto ticker:', error);
    }
}

function setupAutoRefresh() {
    // Refresh crypto ticker every 30 seconds
    setInterval(async () => {
        await loadCryptoTicker();
    }, 30000);
}

function loadMockData() {
    // Mock cryptocurrency data for testing
    const mockData = [
        { symbol: 'BTC', price: 67500, change24h: 2.45 },
        { symbol: 'ETH', price: 3420, change24h: -1.23 },
        { symbol: 'SOL', price: 145.67, change24h: 5.67 },
        { symbol: 'ADA', price: 0.45, change24h: -0.89 },
        { symbol: 'DOT', price: 8.23, change24h: 1.34 },
        { symbol: 'MATIC', price: 0.89, change24h: -2.45 }
    ];
    
    const ticker = document.getElementById('crypto-ticker');
    ticker.innerHTML = mockData.map((crypto, index) => `
        <div class="ticker-item">
            <div class="crypto-number">${index + 1}</div>
            <span class="crypto-symbol">${crypto.symbol}</span>
            <span class="crypto-price">$${crypto.price.toLocaleString()}</span>
            <span class="crypto-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}">
                ${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%
            </span>
        </div>
    `).join('');
}
</script>
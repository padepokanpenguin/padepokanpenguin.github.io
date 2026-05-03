---
title: "Financial News"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Latest financial news from MarketWatch, Investing.com, CNBC, FT, and WSJ Markets"
markup: "html"
---

<div class="news-page">
    <header class="news-header">
        <h1>📰 Financial News</h1>
        <p>Latest headlines from global financial news sources</p>
        <div class="news-meta">
            <span id="news-timestamp" class="news-timestamp">Loading...</span>
            <span class="news-sources" id="news-sources"></span>
        </div>
    </header>

    <div id="news-list" class="news-list">
        <div class="loading-skeleton">Loading news...</div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    // Refresh news every 15 minutes
    setInterval(loadNews, 900000);
});

async function loadNews() {
    try {
        const response = await fetch('/data/financial-news.json');
        if (!response.ok) throw new Error('Failed to load news');
        const data = await response.json();
        renderNews(data);
    } catch (error) {
        console.error('Error loading news:', error);
        document.getElementById('news-list').innerHTML = '<div class="loading-skeleton">Failed to load news. Please refresh.</div>';
    }
}

function renderNews(data) {
    // Update timestamp
    const ts = document.getElementById('news-timestamp');
    const date = new Date(data.timestamp);
    ts.textContent = 'Updated: ' + date.toLocaleString();

    // Update sources
    const src = document.getElementById('news-sources');
    src.textContent = 'Sources: ' + data.sources.join(', ');

    // Render news items
    const container = document.getElementById('news-list');
    if (!data.items || data.items.length === 0) {
        container.innerHTML = '<div class="loading-skeleton">No news available</div>';
        return;
    }

    container.innerHTML = data.items.map((item, i) => {
        const sourceColors = {
            'MarketWatch': '#c00',
            'Investing.com': '#0d6849',
            'CNBC Crypto': '#10b981',
            'Financial Times': '#ff8000',
            'WSJ Markets': '#0158a1'
        };
        const color = sourceColors[item.source] || '#666';
        const icon = getSourceIcon(item.source);
        
        return `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-item">
                <div class="news-item-number">${i + 1}</div>
                <div class="news-item-content">
                    <div class="news-item-meta">
                        <span class="news-source" style="background-color: ${color}">${icon} ${item.source}</span>
                        <span class="news-date">${formatDate(item.published)}</span>
                    </div>
                    <h3 class="news-title">${item.title}</h3>
                    ${item.description ? `<p class="news-description">${item.description}</p>` : ''}
                </div>
                <div class="news-item-arrow">→</div>
            </a>
        `;
    }).join('');
}

function getSourceIcon(source) {
    const icons = {
        'MarketWatch': '📊',
        'Investing.com': '📈',
        'CNBC Crypto': '₿',
        'Financial Times': '📰',
        'WSJ Markets': '🏛'
    };
    return icons[source] || '📰';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    } catch {
        return dateStr;
    }
}
</script>

<style>
.news-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.news-header {
    text-align: center;
    margin-bottom: 30px;
}

.news-header h1 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.news-meta {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.news-timestamp {
    color: #888;
}

.news-sources {
    color: #aaa;
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.news-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
}

.news-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.news-item-number {
    background: #4a90e2;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.85rem;
    flex-shrink: 0;
}

.news-item-content {
    flex: 1;
    min-width: 0;
}

.news-item-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.news-source {
    color: white;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
}

.news-date {
    color: #999;
    font-size: 0.8rem;
}

.news-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #222;
    margin: 0 0 8px 0;
    line-height: 1.4;
}

.news-description {
    font-size: 0.875rem;
    color: #555;
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-item-arrow {
    color: #ccc;
    font-size: 1.2rem;
    flex-shrink: 0;
    align-self: center;
}

.news-item:hover .news-item-arrow {
    color: #4a90e2;
}

.loading-skeleton {
    text-align: center;
    padding: 30px;
    color: #666;
    background: #f8f9fa;
    border-radius: 8px;
}

@media (max-width: 600px) {
    .news-item {
        flex-wrap: wrap;
    }
    .news-item-arrow {
        display: none;
    }
}
</style>

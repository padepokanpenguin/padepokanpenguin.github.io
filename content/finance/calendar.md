---
title: "Economic Calendar"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Kalender ekonomi global: Fed, BI Rate, NFP, CPI, PMI, dan event penting lainnya."
markup: html
---

<div class="calendar-page">
    <header class="calendar-header">
        <h1>📅 Economic Calendar</h1>
        <p>Kalender event ekonomi penting — Fed, BI Rate, NFP, CPI, PMI, dan bank sentral dunia</p>
    </header>

    <div class="calendar-filters">
        <button class="filter-btn active" data-filter="all">Semua</button>
        <button class="filter-btn" data-filter="US">🇺🇸 AS</button>
        <button class="filter-btn" data-filter="ID">🇮🇩 Indonesia</button>
        <button class="filter-btn" data-filter="EU">🇪🇺 Eropa</button>
        <button class="filter-btn" data-filter="CN">🇨🇳 China</button>
        <button class="filter-btn" data-filter="global">🌐 Global</button>
    </div>

    <div id="calendar-today" class="calendar-section">
        <h2 class="calendar-section-title">🔥 Hari Ini</h2>
        <div id="today-events" class="event-list">Loading...</div>
    </div>

    <div id="calendar-upcoming" class="calendar-section">
        <h2 class="calendar-section-title">📆 Minggu Ini</h2>
        <div id="upcoming-events" class="event-list">Loading...</div>
    </div>

    <div id="calendar-next" class="calendar-section">
        <h2 class="calendar-section-title">🗓️ Minggu Depan</h2>
        <div id="next-events" class="event-list">Loading...</div>
    </div>
</div>

<script>
const COUNTRY_FLAGS = {
    'US': '🇺🇸', 'ID': '🇮🇩', 'EU': '🇪🇺', 'CN': '🇨🇳', 'GL': '🌐'
};
const COUNTRY_NAMES = { 'US': 'Amerika Serikat', 'ID': 'Indonesia', 'EU': 'Eropa', 'CN': 'China', 'GL': 'Global' };
const IMPACT_COLORS = { 'high': '#dc3545', 'medium': '#fd7e14', 'low': '#28a745' };
const IMPACT_LABELS = { 'high': 'Tinggi', 'medium': 'Sedang', 'low': 'Rendah' };

document.addEventListener('DOMContentLoaded', function() {
    loadCalendar();
    setupFilters();
});

async function loadCalendar() {
    try {
        const res = await fetch('/data/economic-calendar.json');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        renderCalendar(data);
    } catch (e) {
        document.getElementById('today-events').innerHTML =
            document.getElementById('upcoming-events').innerHTML =
            document.getElementById('next-events').innerHTML =
            '<div class="event-empty">Gagal memuat data kalender.</div>';
    }
}

function renderCalendar(data) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 86400000);
    const weekEnd = new Date(todayEnd.getTime() + 7 * 86400000);
    const nextWeekEnd = new Date(weekEnd.getTime() + 7 * 86400000);

    const today = [], thisWeek = [], nextWeek = [];

    data.events.forEach(ev => {
        const d = new Date(ev.date);
        if (d >= todayStart && d < todayEnd) today.push(ev);
        else if (d >= todayEnd && d < weekEnd) thisWeek.push(ev);
        else if (d >= weekEnd && d < nextWeekEnd) nextWeek.push(ev);
    });

    renderEvents('today-events', today);
    renderEvents('upcoming-events', thisWeek);
    renderEvents('next-events', nextWeek);
}

function renderEvents(containerId, events) {
    const container = document.getElementById(containerId);
    if (!events.length) {
        container.innerHTML = '<div class="event-empty">Tidak ada event.</div>';
        return;
    }

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = events.map(ev => {
        const flag = COUNTRY_FLAGS[ev.country] || '🌐';
        const impactColor = IMPACT_COLORS[ev.impact] || '#666';
        const impactLabel = IMPACT_LABELS[ev.impact] || ev.impact;
        const prev = ev.previous ? `<span class="ev-prev">Prev: <strong>${ev.previous}</strong></span>` : '';
        const forecast = ev.forecast ? `<span class="ev-forecast">Avg: <strong>${ev.forecast}</strong></span>` : '';
        const actual = ev.actual ? `<span class="ev-actual">Actual: <strong>${ev.actual}</strong></span>` : '';

        return `
        <div class="event-card" data-country="${ev.country}">
            <div class="event-left">
                <div class="event-date-block">
                    <span class="ev-day">${new Date(ev.date).getDate()}</span>
                    <span class="ev-month">${new Date(ev.date).toLocaleString('id-ID', { month: 'short' })}</span>
                </div>
            </div>
            <div class="event-body">
                <div class="ev-meta">
                    <span class="ev-flag">${flag}</span>
                    <span class="ev-country">${COUNTRY_NAMES[ev.country] || ev.country}</span>
                    <span class="ev-impact" style="background:${impactColor}20;color:${impactColor};">${impactLabel}</span>
                    ${ev.bank ? `<span class="ev-bank">🏦 ${ev.bank}</span>` : ''}
                </div>
                <h3 class="ev-title">${ev.name}</h3>
                <div class="ev-data">
                    ${prev}${forecast}${actual}
                </div>
            </div>
        </div>`;
    }).join('');
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            document.querySelectorAll('.event-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.country === filter) ? '' : 'none';
            });
        });
    });
}
</script>

<style>
.calendar-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.calendar-header {
    text-align: center;
    margin-bottom: 24px;
}

.calendar-header h1 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.calendar-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 30px;
    justify-content: center;
}

.filter-btn {
    padding: 8px 16px;
    border: 2px solid #e0e0e0;
    background: white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
}

.filter-btn:hover {
    border-color: #4a90e2;
    color: #4a90e2;
}

.filter-btn.active {
    background: #4a90e2;
    border-color: #4a90e2;
    color: white;
}

.calendar-section {
    margin-bottom: 36px;
}

.calendar-section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #eee;
}

.event-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.event-card {
    display: flex;
    gap: 16px;
    background: white;
    border-radius: 12px;
    padding: 18px 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.event-left {
    flex-shrink: 0;
}

.event-date-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    background: #e8f4fd;
    border-radius: 10px;
}

.ev-day {
    font-size: 1.3rem;
    font-weight: 800;
    color: #4a90e2;
    line-height: 1;
}

.ev-month {
    font-size: 0.7rem;
    font-weight: 600;
    color: #4a90e2;
    text-transform: uppercase;
}

.event-body {
    flex: 1;
    min-width: 0;
}

.ev-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
}

.ev-flag {
    font-size: 0.9rem;
}

.ev-country {
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
}

.ev-impact {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
}

.ev-bank {
    font-size: 0.75rem;
    color: #666;
    font-weight: 600;
}

.ev-title {
    font-size: 1rem;
    font-weight: 700;
    color: #222;
    margin: 0 0 8px 0;
    line-height: 1.3;
}

.ev-data {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 0.8rem;
}

.ev-prev { color: #666; }
.ev-forecast { color: #4a90e2; }
.ev-actual { color: #28a745; font-weight: 600; }
.ev-prev strong, .ev-forecast strong, .ev-actual strong { font-weight: 700; }

.event-empty {
    text-align: center;
    padding: 20px;
    color: #999;
    font-size: 0.9rem;
    background: #f8f9fa;
    border-radius: 8px;
}

@media (max-width: 600px) {
    .event-card { flex-direction: column; gap: 12px; }
    .event-date-block { flex-direction: row; width: auto; height: auto; gap: 6px; padding: 6px 12px; }
    .ev-day { font-size: 1rem; }
    .ev-month { font-size: 0.8rem; }
    .calendar-header h1 { font-size: 1.5rem; }
}
</style>

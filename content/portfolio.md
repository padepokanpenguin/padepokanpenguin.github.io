---
title: "Portfolio"
draft: false
disableShare: true
disableHLJS: false
hideSummary: true
searchHidden: true
ShowReadingTime: false
ShowBreadCrumbs: false
hideAuthor: true
outputs: ["html"]
---

## Featured Project

<div class="project-card">
  <div class="project-header">
    <div class="project-logo">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#2563EB"/>
        <path d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM18.6 21.6C17.538 21.6 16.68 22.458 16.68 23.52C16.68 24.582 17.538 25.44 18.6 25.44C19.662 25.44 20.52 24.582 20.52 23.52C20.52 22.458 19.662 21.6 18.6 21.6ZM29.4 21.6C28.338 21.6 27.48 22.458 27.48 23.52C27.48 24.582 28.338 25.44 29.4 25.44C30.462 25.44 31.32 24.582 31.32 23.52C31.32 22.458 30.462 21.6 29.4 21.6ZM24 33.6C20.862 33.6 18.24 32.052 16.8 29.76H31.2C29.76 32.052 27.138 33.6 24 33.6Z" fill="white"/>
      </svg>
    </div>
    <div class="project-title-area">
      <h2 class="project-title">MitraChat.id</h2>
      <p class="project-subtitle">AI WhatsApp Automation Platform</p>
    </div>
    <a href="https://mitrachat.id" target="_blank" class="project-link-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      Kunjungi Website
    </a>
  </div>

  <div class="project-description">
    <p><strong>MitraChat.id</strong> adalah platform AI WhatsApp automation yang membantu bisnis mengotomasi chat WhatsApp untuk meningkatkan penjualan, dukungan pelanggan, dan follow-up lead secara otomatis dalam satu dashboard.</p>
  </div>

  <div class="project-features">
    <div class="feature-tag">FAQ Automation</div>
    <div class="feature-tag">Lead Capture</div>
    <div class="feature-tag">Customer Support</div>
    <div class="feature-tag">Auto Follow-up</div>
    <div class="feature-tag">Multi-Agent</div>
    <div class="feature-tag">Dashboard Analytics</div>
  </div>

</div>

---

## Other Projects

Coming soon...

<style>
.project-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 16px;
  padding: 28px;
  margin: 24px 0;
  transition: box-shadow 0.3s ease;
}
.project-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}
.project-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.project-logo {
  flex-shrink: 0;
}
.project-title-area {
  flex: 1;
  min-width: 200px;
}
.project-title {
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  margin: 0 0 4px 0 !important;
  color: var(--text-color, #1a1a1a);
}
.project-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}
.project-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #2563EB;
  color: white !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none !important;
  transition: background 0.2s ease;
  flex-shrink: 0;
}
.project-link-btn:hover {
  background: #1d4ed8;
}
.project-description {
  color: #374151;
  line-height: 1.7;
  margin-bottom: 20px;
}
.project-description p {
  margin: 0;
}
.project-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.feature-tag {
  background: #eff6ff;
  color: #2563EB;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
@media (max-width: 640px) {
 .project-header {
   flex-direction: column;
   align-items: flex-start;
 }
 .project-link-btn {
   width: 100%;
   justify-content: center;
 }
}
/* Dark mode support */
[data-theme="dark"] .project-card {
 --card-bg: #1f2937;
 --border-color: #374151;
 --text-color: #f9fafb;
 --bg-secondary: #111827;
}
[data-theme="dark"] .project-title {
 color: #f9fafb !important;
}
[data-theme="dark"] .project-description {
 color: #d1d5db;
}
[data-theme="dark"] .feature-tag {
 background: #1e3a5f;
 color: #60a5fa;
}
</style>


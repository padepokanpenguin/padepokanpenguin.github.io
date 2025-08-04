/**
 * Gemini Chatbot for Hugo PaperMod Theme
 * Provides AI-powered chat functionality with a clean modal interface
 */

class GeminiChatbot {
    constructor(config = {}) {
        this.apiKey = config.apiKey || '';
        this.model = config.model || 'gemini-1.5-flash';
        this.proxyMode = config.proxyMode || false;
        this.proxyUrl = config.proxyUrl || '';
        this.isOpen = false;
        this.conversationHistory = [];
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.loadConversationHistory();
    }

    createChatbotHTML() {
        // Create chatbot button
        const chatbotButton = document.createElement('div');
        chatbotButton.id = 'chatbot-button';
        chatbotButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V18L6 14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2ZM20 12H5.17L4 13.17V4H20V12Z" fill="currentColor"/>
                <circle cx="8" cy="8" r="1" fill="currentColor"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
                <circle cx="16" cy="8" r="1" fill="currentColor"/>
            </svg>
        `;
        chatbotButton.title = 'Chat with AI Assistant';

        // Create chatbot modal
        const chatbotModal = document.createElement('div');
        chatbotModal.id = 'chatbot-modal';
        chatbotModal.innerHTML = `
            <div>
                <div class="chatbot-header">
                    <h3>AI Assistant</h3>
                    <button id="chatbot-close" aria-label="Close chat">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>Hello! I'm your AI assistant. How can I help you today?</p>
                        </div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
                <div class="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Type your message..." maxlength="1000">
                    <button id="chatbot-send" aria-label="Send message">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L9 11L6 8L18 2ZM18 2L12 18L9 11L18 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="chatbot-status" id="chatbot-status"></div>
            </div>
        `;

        document.body.appendChild(chatbotButton);
        document.body.appendChild(chatbotModal);
    }

    attachEventListeners() {
        const button = document.getElementById('chatbot-button');
        const modal = document.getElementById('chatbot-modal');
        const closeBtn = document.getElementById('chatbot-close');
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');

        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeChat();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const modal = document.getElementById('chatbot-modal');
        modal.classList.add('active');
        this.isOpen = true;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 300);
    }

    closeChat() {
        const modal = document.getElementById('chatbot-modal');
        modal.classList.remove('active');
        this.isOpen = false;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Check if API key is configured
            if (!this.apiKey && !this.proxyMode) {
                throw new Error('Chatbot is not properly configured. Please contact the site administrator.');
            }

            let response;
            if (this.proxyMode && this.proxyUrl) {
                response = await this.callProxyAPI(message);
            } else {
                response = await this.callGeminiAPI(message);
            }

            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.saveConversationHistory();
        } catch (error) {
            this.hideTypingIndicator();
            console.error('Chatbot error:', error);
            this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot', true);
        }
    }

    async callGeminiAPI(message) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: message
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from Gemini API');
        }

        return data.candidates[0].content.parts[0].text;
    }

    async callProxyAPI(message) {
        const response = await fetch(`${this.proxyUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    }

    addMessage(content, sender, isError = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error-message' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(content)}</p>
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store in conversation history
        this.conversationHistory.push({
            content,
            sender,
            timestamp: new Date().toISOString()
        });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('chatbot-history', JSON.stringify(this.conversationHistory.slice(-20))); // Keep last 20 messages
        } catch (error) {
            console.warn('Could not save conversation history:', error);
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('chatbot-history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Don't restore messages to keep the interface clean on page load
            }
        } catch (error) {
            console.warn('Could not load conversation history:', error);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get configuration from Hugo site params
    const chatbotConfig = window.chatbotConfig || {};
    
    if (chatbotConfig.enabled) {
        new GeminiChatbot(chatbotConfig);
    }
});

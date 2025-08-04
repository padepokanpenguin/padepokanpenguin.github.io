/**
 * Example Proxy Server for Gemini API
 * This server helps secure your API key by handling requests server-side
 * Deploy this to services like Vercel, Railway, or Heroku
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:1313', 'https://padepokanpenguin.github.io'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
});

app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
        }

        if (message.length > 1000) {
            return res.status(400).json({ error: 'Message too long. Maximum 1000 characters allowed.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
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
            console.error('Gemini API error:', errorData);
            
            if (response.status === 429) {
                return res.status(429).json({ error: 'API rate limit exceeded. Please try again later.' });
            }
            
            return res.status(500).json({ error: 'Failed to process your request. Please try again.' });
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('Invalid response format from Gemini API:', data);
            return res.status(500).json({ error: 'Invalid response from AI service' });
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        
        res.json({ 
            response: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});

module.exports = app;

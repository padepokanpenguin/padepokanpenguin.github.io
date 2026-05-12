---
title: "Membangun Gemini Flash API Menggunakan Node.js"
date: 2026-05-12
description: "Tutorial lengkap membuat REST API untuk Gemini Flash 2.0 menggunakan Node.js dan Express — dari setup hingga deployment."
tags: [nodejs, api, gemini, javascript, backend, tutorial]
categories: [Writing]
draft: false
---

Pernah nggak feeling mau bikin project yang butuh AI tapi bingung mulai dari mana? Atau mungkin selama ini你们 selalu rely on OpenAI dan pengen explore alternatif lain yang nggak kalah mumpuni?

Kabar baiknya, **Gemini Flash 2.0** dari Google udah cukup powerful untuk mayoritas use case — dan yang lebih keren lagi, **GRATIS** dengan batasan tertentu. Dalam artikel ini, kita akan bangun REST API lengkap menggunakan Node.js dan Express untuk consume Gemini Flash. Vamos!

## Apa Itu Gemini Flash?

Gemini Flash adalah model AI dari Google yang dirancang untuk memberikan balance antara **kecepatan** dan **kemampuan**. Sesuai namanya, model ini optimized buat response yang cepat, cocok untuk aplikasi real-time yang butuh interaksi AI tanpa harus nunggu lama.

Keunggulan Gemini Flash:
- **Cepat** — Dirancang untuk low-latency response
- **Cost-efficient** — Gratuity dengan tier gratis yang cukup longgar
- **Multimodal** — Bisa handle text, image, audio, dan video
- **Context window besar** — Support up to 1 juta tokens (tergantung versi)

## Setup Project

Pertama-tama, initialize project Node.js dan install dependencies yang needed:

```bash
mkdir gemini-flash-api
cd gemini-flash-api
npm init -y
npm install express @google/generative-ai cors dotenv
npm install --save-dev nodemon
```

Keterangan packages:
- **express** — Web framework buat bikin REST API
- **@google/generative-ai** — Official SDK dari Google buat akses Gemini
- **cors** — Biar API bisa diakses dari frontend tanpa masalah
- **dotenv** — Buat manage environment variables

## Struktur Project

Saya biasa organize project seperti ini:

```
gemini-flash-api/
├── src/
│   ├── routes/
│   │   └── gemini.js
│   ├── controllers/
│   │   └── geminiController.js
│   ├── config/
│   │   └── gemini.js
│   └── app.js
├── .env
├── .gitignore
└── package.json
```

## Configuration

Pertama, setup configuration untuk Gemini SDK. Buat file `src/config/gemini.js`:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize dengan API key dari environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ambil model — untuk Flash 2.0, gunakan 'gemini-2.0-flash'
// atau 'gemini-1.5-flash' untuk versi stabil
export const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 2048,
    topP: 0.95,
    topK: 40,
  },
});

export default model;
```

## Environment Variables

Buat file `.env` di root project:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

**Tips**: Jangan pernah commit file `.env` ke Git! Tambahkan ke `.gitignore`:

```gitignore
node_modules/
.env
```

### Cara Dapat API Key

1. Buka [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Login dengan Google account
3. Klik "Get API Key"
4. Create new API key (atau use existing)
5. Copy dan paste ke `.env` kamu

## Controller: Logika Utama

Ini bagian inti — kita define apa yang bisa dilakukan sama API ini. Buat file `src/controllers/geminiController.js`:

```javascript
import model from '../config/gemini.js';

/**
 * Generate text dari prompt
 * POST /api/gemini/generate
 */
export const generateText = async (req, res) => {
  try {
    const { prompt, temperature = 0.9, maxOutputTokens = 2048 } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and must be a string',
      });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: {
        text,
        usage: {
          promptTokens: result.usageMetadata?.promptTokenCount || 'N/A',
          candidatesTokenCount: result.usageMetadata?.candidatesTokenCount || 'N/A',
        },
      },
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};

/**
 * Chat conversation (multi-turn)
 * POST /api/gemini/chat
 */
export const chat = async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'messages array is required',
      });
    }

    // Start chat dengan optional system instruction
    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      systemInstruction: systemInstruction
        ? { parts: [{ text: systemInstruction }] }
        : undefined,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: {
        text,
        usage: {
          promptTokens: result.usageMetadata?.promptTokenCount || 'N/A',
          candidatesTokenCount: result.usageMetadata?.candidatesTokenCount || 'N/A',
        },
      },
    });
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};

/**
 * Generate dengan image (multimodal)
 * POST /api/gemini/vision
 */
export const generateFromImage = async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt } = req.body;

    if (!imageBase64 || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'imageBase64 and prompt are required',
      });
    }

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: { text },
    });
  } catch (error) {
    console.error('Gemini Vision Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};
```

## Routes

Sekarang define endpoints API. Buat `src/routes/gemini.js`:

```javascript
import express from 'express';
import {
  generateText,
  chat,
  generateFromImage,
} from '../controllers/geminiController.js';

const router = express.Router();

// POST /api/gemini/generate — generate text dari prompt
router.post('/generate', generateText);

// POST /api/gemini/chat — multi-turn conversation
router.post('/chat', chat);

// POST /api/gemini/vision — generate dari image + text
router.post('/vision', generateFromImage);

export default router;
```

## App Entry Point

Bikin `src/app.js` sebagai entry point utama:

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import geminiRoutes from './routes/gemini.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handle large payloads
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/gemini', geminiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Gemini Flash API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Generate: POST http://localhost:${PORT}/api/gemini/generate`);
  console.log(`   Chat: POST http://localhost:${PORT}/api/gemini/chat`);
  console.log(`   Vision: POST http://localhost:${PORT}/api/gemini/vision`);
});
```

Update `package.json` biar support ES modules:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

## Testing

Jalankan server:

```bash
npm run dev
```

### Test Generate Text

```bash
curl -X POST http://localhost:3000/api/gemini/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Jelaskan perbedaan antara REST API dan GraphQL dalam 3 kalimat."
  }'
```

Response:

```json
{
  "success": true,
  "data": {
    "text": "REST API menggunakan endpoint tetap dengan metode HTTP berbeda untuk operasi CRUD...",
    "usage": {
      "promptTokens": 25,
      "candidatesTokenCount": 89
    }
  }
}
```

### Test Chat

```bash
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Siapa president Indonesia?" },
      { "role": "model", "content": "President Indonesia saat ini adalah Prabowo Subianto." },
      { "role": "user", "content": "Kapan dia dilantik?" }
    ],
    "systemInstruction": "Kamu adalah asisten yang selalu menjawab dalam Bahasa Indonesia."
  }'
```

## Deployment

Salah satu opsi termudah adalah deploy ke **Railway** atau **Render** yang support Node.js. Alternatif lain adalah VPS dengan Nginx sebagai reverse proxy.

Untuk deployment, yang perlu diperhatikan:

1. Set `GEMINI_API_KEY` sebagai environment variable di platform deployment
2. Jangan lupa set `NODE_ENV=production`
3. Kalau pakai Nginx, tambahkan proxy config:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Rate Limiting & Security

Untuk production, beberapa hal yang perlu di-add:

### 1. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' },
});

app.use('/api/gemini', limiter, geminiRoutes);
```

### 2. API Key Authentication

Buat simple API key middleware:

```javascript
const API_KEYS = process.env.ALLOWED_API_KEYS?.split(',') || [];

export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || !API_KEYS.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or missing API key',
    });
  }

  next();
};
```

## Penutup

Dengan setup ini, kalian udah punya Gemini Flash API yang siap dipake untuk berbagai project — dari chatbot, content generator, sampai image analysis. Lumayan bukan, dapat AI capabilities dengan gratis?

Yang menarik dari Gemini Flash adalah **context window-nya yang gede** dan **harga yang terjangkau**. Untuk use case yang nggak butuh GPT-4 level reasoning, Gemini Flash udah lebih dari enough.

Ada pertanyaan atau mau explorasi fitur lain dari Gemini? Feel free reach out! 🚀

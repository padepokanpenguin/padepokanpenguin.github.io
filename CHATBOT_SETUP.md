# 🤖 Gemini Chatbot Setup Guide

## Overview

This chatbot integration adds an AI assistant powered by Google's Gemini API to your Hugo PaperMod site. The chatbot appears as a floating button in the bottom-right corner and opens a clean modal interface for user interaction.

## Features

- 🎨 Beautiful, responsive design that matches your PaperMod theme
- 🌙 Dark/light mode support
- 📱 Mobile-friendly interface
- 🔒 Secure API key handling options
- 💬 Conversation history (local storage)
- ⚡ Real-time typing indicators
- 🚀 Easy Hugo integration

## Setup Options

### Option 1: Direct API Integration (Simple)

**Best for:** Testing, low-traffic sites, personal blogs

1. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key securely

2. **Configure Hugo**
   - Update your `config.yml`:
   ```yaml
   params:
     chatbot:
       enabled: true
       apiKey: "your-gemini-api-key-here"
       model: "gemini-1.5-flash"
       proxyMode: false
   ```

3. **Deploy**
   - Commit your changes
   - Push to GitHub
   - Your chatbot will be live!

### Option 2: Proxy Server Integration (Recommended for Production)

**Best for:** Production sites, higher security requirements, rate limiting

1. **Deploy Proxy Server**
   
   **Using Vercel:**
   ```bash
   # Create a new directory for your proxy
   mkdir chatbot-proxy
   cd chatbot-proxy
   
   # Copy the proxy files
   cp ../example-proxy-server.js ./index.js
   cp ../proxy-package.json ./package.json
   
   # Create vercel.json
   echo '{
     "functions": {
       "index.js": {
         "maxDuration": 30
       }
     },
     "env": {
       "GEMINI_API_KEY": "@gemini-api-key"
     }
   }' > vercel.json
   
   # Deploy to Vercel
   npx vercel
   ```

   **Using Railway:**
   ```bash
   # Create railway.json
   echo '{
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start"
     }
   }' > railway.json
   
   # Deploy to Railway
   npx @railway/cli deploy
   ```

2. **Configure Environment Variables**
   - Set `GEMINI_API_KEY` in your hosting platform
   - Set `ALLOWED_ORIGINS` to your domain(s)

3. **Update Hugo Configuration**
   ```yaml
   params:
     chatbot:
       enabled: true
       apiKey: "" # Leave empty for proxy mode
       model: "gemini-1.5-flash"
       proxyMode: true
       proxyUrl: "https://your-proxy-domain.com"
   ```

## File Structure

```
your-hugo-site/
├── config.yml                           # Chatbot configuration
├── layouts/partials/
│   ├── extend_head.html                 # CSS inclusion
│   └── extend_footer.html               # JS inclusion & config
├── static/
│   ├── css/
│   │   └── chatbot.css                  # Chatbot styles
│   └── js/
│       └── chatbot.js                   # Chatbot functionality
├── example-proxy-server.js              # Optional proxy server
└── proxy-package.json                   # Proxy dependencies
```

## Configuration Options

### Hugo Config Parameters

```yaml
params:
  chatbot:
    enabled: true                        # Enable/disable chatbot
    apiKey: ""                          # Your Gemini API key (direct mode)
    model: "gemini-1.5-flash"           # Gemini model to use
    proxyMode: false                    # Use proxy server
    proxyUrl: ""                        # Proxy server URL
```

### Supported Gemini Models

- `gemini-1.5-flash` (recommended) - Fast, efficient, good for chat
- `gemini-1.5-pro` - More capable, slower, higher cost
- `gemini-pro` - Legacy model

## Customization

### Styling

Edit `static/css/chatbot.css` to customize:

- **Colors:** Modify the gradient backgrounds
- **Position:** Change `bottom` and `right` values
- **Size:** Adjust `width` and `height`
- **Animation:** Modify transition timings

### Behavior

Edit `static/js/chatbot.js` to customize:

- **Welcome message:** Change the initial bot message
- **Conversation history:** Adjust storage limits
- **API parameters:** Modify temperature, maxTokens, etc.

## Troubleshooting

### Common Issues

**Chatbot button doesn't appear:**
- Check browser console for JavaScript errors
- Verify `chatbot.enabled: true` in config.yml
- Ensure files are in correct locations

**API calls fail:**
- Verify API key is correct and has quota
- Check CORS settings for proxy mode
- Review network tab in developer tools

**Styling issues:**
- Clear browser cache
- Check CSS file is loading correctly
- Verify no conflicting styles

### Browser Console Debugging

Open browser developer tools (F12) and check:

1. **Console tab:** JavaScript errors
2. **Network tab:** Failed requests
3. **Application tab:** Local storage data

## Security Best Practices

1. **Never commit API keys** to your repository
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** in production
4. **Validate user inputs** server-side
5. **Monitor API usage** and costs

## Performance Considerations

- **Lazy loading:** Chatbot only loads when enabled
- **Debounced requests:** Prevents spam clicking
- **Local storage:** Reduces redundant API calls
- **Efficient DOM:** Minimal impact on page load

## Rate Limits & Costs

### Gemini API Limits (Free Tier)
- 15 requests per minute
- 1,500 requests per day
- Monitor usage at [Google AI Studio](https://makersuite.google.com/)

### Cost Optimization
- Use `gemini-1.5-flash` for lower costs
- Implement caching for repeated queries
- Set reasonable `maxOutputTokens` limits

## Deployment Checklist

- [ ] API key configured securely
- [ ] Chatbot enabled in config.yml
- [ ] All files committed to repository
- [ ] Site redeployed and tested
- [ ] Mobile responsiveness verified
- [ ] Dark mode compatibility checked
- [ ] Error handling tested

## Support

For issues or questions:

1. Check this documentation first
2. Review browser console for errors
3. Test with simple messages first
4. Verify API key and quota status
5. Check Hugo build logs for errors

## Updates

To update the chatbot:

1. **Backup** your customizations
2. **Replace** the chatbot files with new versions
3. **Merge** your customizations back
4. **Test** thoroughly before deploying

---

**Happy chatting! 🚀**

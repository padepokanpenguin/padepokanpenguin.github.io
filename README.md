# 🧑🏾‍💻 arianurjamal - Personal Blog & Portfolio

[![Hugo](https://img.shields.io/badge/Hugo-0.123.0-FF4088?style=flat&logo=hugo)](https://gohugo.io/)
[![PaperMod](https://img.shields.io/badge/Theme-PaperMod-blue)](https://github.com/adityatelange/hugo-PaperMod)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-brightgreen)](https://padepokanpenguin.github.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, responsive personal blog and portfolio website built with Hugo and enhanced with AI-powered chatbot functionality.

🌐 **Live Site:** [https://padepokanpenguin.github.io/](https://padepokanpenguin.github.io/)

## ✨ Features

- 📝 **Blog Posts** - Technical articles and personal insights
- 🎨 **Clean Design** - Minimalist PaperMod theme with dark/light mode
- 🤖 **AI Chatbot** - Integrated Gemini AI assistant for visitor interaction
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🚀 **Fast Performance** - Static site generation with Hugo
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- 📊 **Analytics** - Google Analytics integration
- 🔄 **Auto Deploy** - GitHub Actions for continuous deployment

## 🛠️ Tech Stack

- **Static Site Generator:** [Hugo](https://gohugo.io/) v0.123.0
- **Theme:** [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/)
- **Deployment:** GitHub Pages with GitHub Actions
- **Analytics:** Google Analytics
- **Styling:** CSS with theme customization

## 🚀 Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.112.4+
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (for chatbot proxy server, optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/padepokanpenguin/padepokanpenguin.github.io.git
   cd padepokanpenguin.github.io
   ```

2. **Initialize submodules**
   ```bash
   git submodule update --init --recursive
   ```

3. **Start the development server**
   ```bash
   hugo server -D
   ```

4. **Open your browser**
   ```
   http://localhost:1313
   ```

## 🤖 Chatbot Setup

The site includes an AI-powered chatbot using Google's Gemini API. For security, the API key is stored in GitHub Secrets.

### Setting up the Chatbot

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key

2. **Add GitHub Secret**
   - Go to your repository settings
   - Navigate to `Secrets and variables` → `Actions`
   - Add a new secret:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** Your Gemini API key

3. **Deploy**
   - The chatbot will automatically work after the next deployment

For detailed setup instructions, see [CHATBOT_SETUP.md](CHATBOT_SETUP.md).

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── hugo.yaml              # GitHub Actions deployment
├── archetypes/
│   └── default.md                 # Content templates
├── content/
│   ├── about.md                   # About page
│   ├── portfolio.md               # Portfolio page
│   └── blog/                      # Blog posts
│       ├── computational-thinking-bukan-hanyak-untuk-anak-it.md
│       ├── debugging-github-pages-deployment-a-developer-journey.md
│       ├── deploy-hugo-dengan-github-action-pada-github-pages.md
│       ├── membangun-gemini-flash-api-menggunakan-node-js.md
│       └── problem-solving-skill.md
├── layouts/
│   └── partials/
│       ├── extend_head.html       # Custom head content
│       └── extend_footer.html     # Custom footer content
├── static/
│   ├── css/
│   │   └── chatbot.css           # Chatbot styling
│   ├── js/
│   │   └── chatbot.js            # Chatbot functionality
│   └── assets/
│       └── images/               # Site images
├── themes/
│   └── PaperMod/                 # Hugo theme (submodule)
├── config.yml                    # Hugo configuration
├── example-proxy-server.js       # Optional proxy server
└── README.md                     # This file
```

## 📝 Content Management

### Creating New Blog Posts

1. **Create a new post**
   ```bash
   hugo new blog/my-new-post.md
   ```

2. **Edit the front matter**
   ```yaml
   ---
   title: "My New Post"
   date: 2025-01-01T00:00:00+07:00
   draft: false
   tags: ["tag1", "tag2"]
   categories: ["category"]
   description: "Post description"
   ---
   ```

3. **Write your content** in Markdown

4. **Preview locally**
   ```bash
   hugo server -D
   ```

### Supported Front Matter

- `title` - Post title
- `date` - Publication date
- `draft` - Draft status (true/false)
- `tags` - Array of tags
- `categories` - Array of categories
- `description` - Meta description
- `author` - Author name
- `ShowReadingTime` - Show reading time estimate
- `ShowWordCount` - Show word count

## 🎨 Customization

### Theme Configuration

The site uses the PaperMod theme with custom configurations in `config.yml`:

- **Dark/Light Mode:** Auto-switching based on system preference
- **Social Icons:** GitHub, LinkedIn, Twitter, Medium, Telegram, Upwork
- **Features:** Reading time, share buttons, breadcrumbs, code copy buttons
- **Analytics:** Google Analytics and GoatCounter integration

### Chatbot Customization

Edit `static/css/chatbot.css` and `static/js/chatbot.js` to customize:

- **Appearance:** Colors, animations, positioning
- **Behavior:** Welcome messages, conversation history
- **Integration:** Proxy server setup for enhanced security

## 🚀 Deployment

The site automatically deploys to GitHub Pages using GitHub Actions when changes are pushed to the `master` branch.

### Manual Deployment

1. **Build the site**
   ```bash
   hugo --gc --minify
   ```

2. **Deploy to GitHub Pages**
   - The `public/` folder contains the generated site
   - GitHub Actions handles automatic deployment

### Environment Variables

- `GEMINI_API_KEY` - Gemini API key (GitHub Secret)
- `HUGO_ENVIRONMENT` - Set to `production` for optimizations

## 📊 Analytics & Monitoring

- **Google Analytics:** Configured with ID `G-X60YCVVTT6`
- **GoatCounter:** Alternative analytics with `padepokanpenguin` site code
- **Performance:** Lighthouse scores and Core Web Vitals monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Documentation

- [Chatbot Setup Guide](CHATBOT_SETUP.md) - Detailed chatbot configuration
- [GitHub Secrets Setup](GITHUB_SECRETS_SETUP.md) - Security configuration
- [Testing Guide](TESTING_GUIDE.md) - Testing procedures
- [Hugo Documentation](https://gohugo.io/documentation/) - Hugo framework docs
- [PaperMod Documentation](https://github.com/adityatelange/hugo-PaperMod/wiki) - Theme documentation

## 🐛 Troubleshooting

### Common Issues

**Chatbot not working:**
- Verify `GEMINI_API_KEY` secret is set
- Check GitHub Actions logs for deployment errors
- Ensure API key has proper permissions

**Build failures:**
- Check Hugo version compatibility
- Verify submodule initialization
- Review GitHub Actions workflow logs

**Theme issues:**
- Update PaperMod submodule: `git submodule update --remote`
- Check theme configuration in `config.yml`

### Getting Help

- 📧 [Contact via Telegram](https://t.me/kalang_kabut)
- 💼 [LinkedIn](https://www.linkedin.com/in/aria-nur-jamal-ba5856231/)
- 🐙 [GitHub Issues](https://github.com/padepokanpenguin/padepokanpenguin.github.io/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aria Nur Jamal**
- 🌐 Website: [padepokanpenguin.github.io](https://padepokanpenguin.github.io/)
- 🐙 GitHub: [@padepokanpenguin](https://github.com/padepokanpenguin)
- 💼 LinkedIn: [aria-nur-jamal](https://www.linkedin.com/in/aria-nur-jamal-ba5856231/)
- 🐦 Twitter: [@aria_nur_jamal](https://twitter.com/aria_nur_jamal)
- 📝 Medium: [@tripletwinsco](https://tripletwinsco.medium.com/)

## 🙏 Acknowledgments

- [Hugo](https://gohugo.io/) - The world's fastest framework for building websites
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod) - Beautiful, fast, and minimal Hugo theme
- [Google Gemini](https://ai.google.dev/) - AI API for chatbot functionality
- [GitHub Pages](https://pages.github.com/) - Free hosting for static sites
- The open-source community for inspiration and tools

---

<div align="center">

**Made with ❤️ using Hugo**

[⬆ Back to top](#-arianurjamal---personal-blog--portfolio)

</div>

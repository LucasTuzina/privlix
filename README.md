# Privlix

> **🎬 Your Personal Netflix Experience for Local Media**

A modern, privacy-focused media library application with Netflix-style interface for organizing and watching your local video collections. Built with Electron, Vue 3, and TypeScript.

![Version](https://img.shields.io/badge/version-0.1.0--alpha-orange)
![Status](https://img.shields.io/badge/status-alpha%20testing-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Current Features (Alpha v0.1.0)

### � **Core Functionality**

- **📁 Smart Media Detection** - Automatically scans and organizes your video folders
- **🎬 Movie & Series Recognition** - Intelligent categorization based on file names and structure
- **🔍 Powerful Search** - Fast fuzzy search across your entire media library
- **⏯️ Custom Video Player** - Netflix-style player with custom controls and progress tracking
- **� Watch Progress** - Remembers where you stopped watching each video
- **🎨 Modern UI/UX** - Dark theme with Netflix-inspired responsive design

### 🛠️ **Technical Features**

- **🔒 100% Privacy** - All data stays local on your computer
- **🌍 Multi-Language** - English and German language support
- **💻 Cross-Platform** - Works on macOS, Windows, and Linux
- **📱 Responsive** - Optimized for various screen sizes
- **⚡ Fast Performance** - Built with modern web technologies

### 🎮 **User Experience**

- **🏠 Home Dashboard** - Overview of your media collection with continue watching
- **📂 Folder Management** - Easy media folder selection and management
- **⚙️ Settings Panel** - Customize language, folder paths, and preferences
- **🎥 Fullscreen Support** - Immersive video watching experience
- **⌨️ Keyboard Shortcuts** - Space (play/pause), F (fullscreen), M (mute), Escape (back)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/LucasTuzina/privlix.git
   cd privlix
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **First Setup**:
   - Launch the application
   - Click "Select Media Folder" on the welcome screen
   - Choose your video directory (e.g., `/Users/yourname/Movies`)
   - Wait for the automatic media scan to complete
   - Start watching your collection!

### Build for Production

```bash
# Build the application
npm run build

# Package for distribution (macOS example)
npm run dist
```

---

## 📖 Documentation

For detailed information, please check our comprehensive documentation in the `/docs` folder:

| Document                                              | Description                                              |
| ----------------------------------------------------- | -------------------------------------------------------- |
| 📋 **[Installation Guide](docs/installation.md)**     | Detailed setup, development, and deployment instructions |
| 🏗️ **[Architecture Overview](docs/architecture.md)**  | Technical architecture and design patterns               |
| 📁 **[Project Structure](docs/project-structure.md)** | Directory organization and code structure                |
| 🎨 **[UI Components](docs/layout-system.md)**         | Layout system and component documentation                |
| 🌍 **[Internationalization](docs/i18n.md)**           | Multi-language support implementation                    |
| 📖 **[Usage Guide](docs/usage.md)**                   | How to effectively use the application                   |
| 🚀 **[Development Roadmap](docs/roadmap.md)**         | Planned features and future development                  |

---

## ⚠️ Alpha Version Notice

**This is an early alpha version (0.1.0) for testing purposes.**

### What Works:

✅ Media folder scanning and organization  
✅ Movie and series recognition  
✅ Video playback with custom controls  
✅ Search functionality  
✅ Watch progress tracking  
✅ Settings and preferences  
✅ Multi-language support

### Known Limitations:

⚠️ Limited video format support  
⚠️ No automatic thumbnail generation  
⚠️ No subtitle support yet  
⚠️ Basic metadata handling  
⚠️ Limited error handling for corrupted files

### Planned for Beta:

🔄 Enhanced video format support  
🔄 Automatic thumbnail extraction  
🔄 Subtitle support  
🔄 Better metadata recognition  
🔄 Cloud sync options

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development with hot reload
npm run dev:renderer     # Start renderer process only
npm run dev:main         # Start main process only

# Building
npm run build           # Build for production
npm run build:renderer  # Build renderer process
npm run build:main      # Build main process

# Quality Assurance
npm run lint           # Check code style
npm run lint:fix       # Fix code style issues
npm run type-check     # TypeScript type checking

# Distribution
npm run dist           # Package for current platform
npm run dist:mac       # Package for macOS
npm run dist:win       # Package for Windows
npm run dist:linux     # Package for Linux
```

### Tech Stack

- **Frontend**: Vue 3 (Composition API), TypeScript, Vite
- **Backend**: Electron (Node.js)
- **Styling**: CSS Custom Properties, Modern CSS
- **State Management**: Pinia
- **Internationalization**: Vue I18n
- **Architecture**: Domain-Driven Design principles

---

## 🤝 Contributing

We welcome contributions! This project follows modern development practices:

1. **Fork & Clone** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code standards**: Use TypeScript, Vue 3 Composition API
4. **Test your changes**: Ensure all functionality works
5. **Submit a Pull Request** with detailed description

### Development Guidelines

- Use **TypeScript** for type safety
- Follow **Vue 3 Composition API** patterns
- Write **clean, documented code**
- Follow **Domain-Driven Design** principles
- Maintain **responsive design** standards

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/LucasTuzina/privlix/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Development**: Follow our contributing guidelines for code contributions

---

<p align="center">
  <strong>Built with ❤️ for privacy-conscious media enthusiasts</strong>
</p>

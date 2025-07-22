# Installation & Development Guide

Complete guide for setting up, developing, and deploying Privlix.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### System Requirements

- **macOS**: 10.14 (Mojave) or higher
- **Windows**: Windows 10 or higher
- **Linux**: Ubuntu 18.04+ or equivalent

## 🚀 Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/LucasTuzina/privlix.git
cd privlix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development

```bash
npm run dev
```

The application will start with:

- **Renderer Process**: Vue.js frontend on `http://localhost:3000`
- **Main Process**: Electron wrapper
- **Hot Reload**: Automatic updates on code changes

## 🛠️ Development

### Available Scripts

#### Development Scripts

```bash
# Full development environment
npm run dev              # Start both main and renderer processes

# Individual processes
npm run dev:renderer     # Start Vue.js frontend only
npm run dev:main         # Start Electron main process only
```

#### Build Scripts

```bash
# Production builds
npm run build           # Build both main and renderer
npm run build:renderer  # Build Vue.js frontend only
npm run build:main      # Build Electron main process only
```

#### Quality Assurance

```bash
# Code quality
npm run lint           # Check code style (ESLint)
npm run lint:fix       # Auto-fix code style issues
npm run type-check     # TypeScript type checking

# Testing (when available)
npm run test           # Run test suite
npm run test:watch     # Run tests in watch mode
```

#### Distribution

```bash
# Package for current platform
npm run dist

# Platform-specific builds
npm run dist:mac       # macOS (.dmg, .zip)
npm run dist:win       # Windows (.exe, .nsis)
npm run dist:linux     # Linux (.AppImage, .deb, .rpm)

# Multi-platform build
npm run dist:all       # Build for all platforms
```

## 🏗️ Project Structure

```
privlix/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.ts       # Main entry point
│   │   ├── preload.ts     # Preload scripts
│   │   └── services/      # Backend services
│   ├── renderer/          # Vue.js frontend
│   │   ├── components/    # Vue components
│   │   ├── views/         # Page components
│   │   ├── stores/        # Pinia state management
│   │   ├── styles/        # Global styles
│   │   └── locales/       # Internationalization
│   └── shared/            # Shared code
│       ├── types/         # TypeScript interfaces
│       └── services/      # Shared services
├── docs/                  # Documentation
├── dist/                  # Production builds
└── release/               # Distribution packages
```

## 🔧 Development Environment

### IDE Setup

**Recommended: VS Code** with extensions:

- Vue Language Features (Vetur or Volar)
- TypeScript Importer
- ESLint
- Prettier
- Electron

### Environment Variables

Create `.env.local` for development overrides:

```bash
# Development settings
NODE_ENV=development
ELECTRON_IS_DEV=true

# Debug options
DEBUG_MODE=true
DEVTOOLS_ENABLED=true
```

### Hot Reload

The development environment supports hot reload for:

- **Vue Components**: Instant updates
- **Styles**: Live CSS injection
- **Main Process**: Automatic restart

## 📦 Building & Distribution

### Development Build

```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Production Distribution

```bash
npm run dist
```

#### Output Formats

**macOS**:

- `.app` - Application bundle
- `.dmg` - Disk image installer
- `.zip` - Compressed application

**Windows**:

- `.exe` - Portable executable
- `-Setup.exe` - NSIS installer
- `.appx` - Microsoft Store package

**Linux**:

- `.AppImage` - Universal Linux package
- `.deb` - Debian/Ubuntu package
- `.rpm` - Red Hat/SUSE package

### Build Configuration

Edit `electron-builder` configuration in `package.json`:

```json
{
  "build": {
    "appId": "com.astronsoft.privlix",
    "productName": "Privlix",
    "directories": {
      "output": "release"
    },
    "files": ["dist/**/*"]
  }
}
```

## 🧪 Testing

### Unit Tests

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

### E2E Tests

```bash
npm run test:e2e         # End-to-end tests
npm run test:e2e:dev     # E2E in development mode
```

### Manual Testing

1. **Media Detection**: Test with various folder structures
2. **Video Playback**: Test different video formats
3. **Search**: Test search functionality
4. **Settings**: Test preference changes
5. **Multi-Language**: Test language switching

## 🐛 Troubleshooting

### Common Issues

**Node Version Issues**:

```bash
# Check Node version
node --version
# Should be v18+

# Use nvm to manage Node versions
nvm install 18
nvm use 18
```

**Permission Issues (macOS)**:

```bash
# Fix npm permissions
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

**Build Failures**:

```bash
# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist/
npm run build
```

**Electron Issues**:

```bash
# Rebuild native modules
npm run electron:rebuild
```

### Development Tips

1. **Use TypeScript**: Leverage type checking for better development experience
2. **Component Structure**: Follow Vue 3 Composition API patterns
3. **State Management**: Use Pinia for complex state
4. **Styling**: Utilize CSS custom properties for theming
5. **Performance**: Monitor Electron memory usage during development

### Getting Help

- **Documentation**: Check `/docs` folder for guides
- **Issues**: Report problems on GitHub Issues
- **Development**: Join our development discussions
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking
- `npm run electron` - Run the built Electron app

## Technology Stack

### Frontend

- **Vue.js 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **Vue i18n** for internationalization (English/German)
- **Vite** for fast development and building

### Backend

- **Electron** for desktop application
- **Node.js** with TypeScript
- **Modular architecture** with clean separation
- **Chokidar** for file system watching
- **Fuse.js** for intelligent search

## Development Principles

The project follows modern development practices:

- Clean Code principles
- Modular design patterns
- TypeScript for type safety
- Component-based architecture
- Reactive state management

# Installation & Development

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Type checking**:
   ```bash
   npm run type-check
   ```

4. **Production build**:
   ```bash
   npm run build
   npm run dist
   ```

## Development Scripts

- `npm run dev` - Start development with hot reload
- `npm run dev:renderer` - Start only the Vue.js frontend
- `npm run dev:main` - Start only the Electron main process
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
- **Domain-Driven Design** architecture
- **Chokidar** for file system watching
- **Fuse.js** for intelligent search

## Development Principles

The project follows modern development practices:
- Clean Code principles
- Domain-Driven Design patterns
- TypeScript for type safety
- Component-based architecture
- Reactive state management

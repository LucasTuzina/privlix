# Privlix

A private media library with Netflix-style interface for local video collections, built with modern Domain-Driven Design principles.

## Features

- 🎬 **Automatic Media Detection**: Scans folders and automatically recognizes movies and series
- 📺 **Netflix-Style Interface**: Modern, user-friendly interface with dark theme
- 🔍 **Intelligent Search**: Fast search through entire media library using fuzzy matching
- 📱 **Responsive Design**: Works on various screen sizes
- 🔒 **100% Private**: All data stays local on your computer
- 📂 **Series/Movie Recognition**: Automatic categorization based on file structure
- ⏯️ **Watch Progress**: Remembers where you left off
- 🏗️ **Domain-Driven Design**: Clean architecture with separated concerns
- 📝 **TypeScript**: Full type safety and modern development experience

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

### Architecture Layers
- **Domain**: Core business logic and entities
- **Application**: Use cases, commands, and queries
- **Infrastructure**: Data persistence and external services
- **Presentation**: Vue.js components and stores

## Project Structure

```
privlix/
├── src/
│   ├── domain/                      # Domain Layer (Business Logic)
│   │   ├── entities/               # Domain entities and types
│   │   ├── repositories/           # Repository interfaces
│   │   └── services/               # Domain services
│   ├── application/                # Application Layer (Use Cases)
│   │   ├── commands/               # Command handlers
│   │   ├── queries/                # Query handlers
│   │   └── services/               # Application services
│   ├── infrastructure/             # Infrastructure Layer (Data & External Services)
│   │   └── repositories/           # Repository implementations
│   ├── main/                       # Electron Main Process
│   │   ├── index.ts               # Main process entry point
│   │   └── preload.js             # Preload script for secure IPC
│   └── renderer/                   # Vue.js Frontend
│       ├── app/                   # Application factory and configuration
│       ├── components/            # Vue components (Composition API)
│       ├── views/                 # Vue views/pages
│       ├── router/                # Vue Router configuration
│       ├── store/                 # Pinia store configuration
│       ├── plugins/               # Vue plugin registration
│       ├── config/                # Application configuration
│       ├── i18n.ts                # Internationalization setup
│       ├── locales/               # Translation files (en.json, de.json)
│       ├── utils/                 # Utility functions
│       ├── constants/             # Application constants
│       ├── types/                 # TypeScript type definitions
│       ├── App.vue                # Main app component
│       ├── main.ts                # Vue entry point (TypeScript)
│       └── index.html             # HTML template
├── dist/                          # Build output
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── package.json
```

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

## Domain-Driven Design Architecture

### Domain Layer
- **Entities**: `MediaFile`, `Movie`, `Episode`, `Series`, `WatchProgress`
- **Value Objects**: `MediaStats`, `SearchResult`
- **Services**: `MediaParsingService` for business logic

### Application Layer
- **Commands**: `ScanMediaFolderCommand`, `UpdateWatchProgressCommand`
- **Queries**: `MediaQueries` for read operations
- **Services**: `MediaApplicationService` orchestrating use cases

### Infrastructure Layer
- **Repositories**: `InMemoryMediaRepository`, `ChokidarFileSystemRepository`
- **External Services**: File system operations, search indexing

## Supported Formats

- MP4 (.mp4)
- MKV (.mkv) 
- AVI (.avi)
- MOV (.mov)
- WMV (.wmv)
- FLV (.flv)
- WebM (.webm)
- M4V (.m4v)

## Series Recognition

The application automatically recognizes series through:
- File names with S01E01 pattern
- Multiple video files in the same directory
- Standardized naming conventions

## Usage

1. **First Use**: Welcome screen appears on first launch
2. **Select Media Folder**: Click "Select Media Folder" and choose your video directory
3. **Automatic Scan**: The app scans all subdirectories for supported video files
4. **Browse & Search**: Use the navigation bar to browse or search your collection

## Development Principles

- **Clean Architecture**: Clear separation of concerns
- **SOLID Principles**: Single responsibility, open/closed, dependency inversion
- **Type Safety**: Full TypeScript coverage
- **Composition API**: Modern Vue.js patterns
- **Reactive Programming**: Pinia stores with reactive state
- **Dependency Injection**: Proper DI container setup

## Future Roadmap

- [ ] Video thumbnail generation with FFmpeg
- [ ] SQLite database persistence
- [ ] Advanced metadata extraction
- [ ] Integrated video player
- [ ] Subtitle support
- [ ] Backup/sync functionality
- [ ] Advanced filtering and sorting
- [ ] User ratings and reviews
- [ ] Watch lists and favorites

## Architecture Benefits

- **Testability**: Separated layers make unit testing easier
- **Maintainability**: Clear boundaries between business logic and infrastructure
- **Scalability**: Easy to add new features without breaking existing code
- **Type Safety**: TypeScript prevents runtime errors
- **Developer Experience**: Modern tooling with hot reload and type checking

## Migration Status ✅

All core components have been successfully migrated to TypeScript and Vue Composition API:

### Completed Migrations:
- ✅ **Core Architecture**: Domain-Driven Design with TypeScript
- ✅ **Domain Layer**: All entities, repositories, and services
- ✅ **Application Layer**: Commands, queries, and application services
- ✅ **Infrastructure Layer**: Repositories and file system integration
- ✅ **Main Process**: Electron main process converted to TypeScript
- ✅ **Stores**: Pinia store with full TypeScript support
- ✅ **Components**: All Vue components using Composition API + TypeScript
  - ✅ HeroSection.vue
  - ✅ WelcomeScreen.vue
  - ✅ NavBar.vue
  - ✅ MediaRow.vue
  - ✅ StatsFooter.vue
  - ✅ NotificationContainer.vue
- ✅ **Views**: All views migrated to Composition API + TypeScript
  - ✅ Home.vue
  - ✅ Search.vue
  - ✅ Settings.vue  
  - ✅ VideoPlayer.vue
- ✅ **Localization**: All texts translated to English
- ✅ **Build System**: TypeScript compilation and type checking
- ✅ **Type Safety**: Full type coverage with proper interfaces
- ✅ **Internationalization**: Complete i18n setup with English and German
  - ✅ Vue i18n integration with TypeScript
  - ✅ Language detection and persistence  
  - ✅ Language switcher component in navigation
  - ✅ All templates localized with translation keys
  - ✅ Settings page with language selection
  - ✅ Automatic fallback to English

### Language Support:
- 🇺🇸 **English** (default)
- 🇩🇪 **German** (Deutsch)
- 🔧 **Extensible** for additional languages

### Build Status:
- ✅ TypeScript compilation: No errors
- ✅ Renderer build: Success
- ✅ Main process build: Success
- ✅ Type checking: All passed

## Contributing

The project follows modern development practices:
- Clean Code principles
- Domain-Driven Design patterns
- TypeScript for type safety
- Component-based architecture
- Reactive state management

## License

MIT License
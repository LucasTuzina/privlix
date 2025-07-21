# Project Structure

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
│   │   └── preload.ts             # Preload script for secure IPC (TypeScript)
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
├── docs/                          # Documentation files
├── dist/                          # Build output
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── package.json
```

## Directory Explanations

### Domain Layer (`src/domain/`)
Contains the core business logic, completely independent of frameworks or external dependencies:
- **entities/**: Core business objects like `Movie`, `Series`, `MediaFile`
- **repositories/**: Abstract interfaces for data access
- **services/**: Domain-specific business rules and logic

### Application Layer (`src/application/`)
Orchestrates use cases and coordinates between domain and infrastructure:
- **commands/**: Write operations (create, update, delete)
- **queries/**: Read operations with specific data requirements
- **services/**: Application-specific workflow coordination

### Infrastructure Layer (`src/infrastructure/`)
Handles external concerns like data persistence, file system access:
- **repositories/**: Concrete implementations of domain repository interfaces

### Main Process (`src/main/`)
Electron's main process handling desktop application lifecycle:
- **index.ts**: Main process entry point and window management
- **preload.ts**: Secure bridge between main and renderer processes

### Renderer Process (`src/renderer/`)
Vue.js frontend application running in Electron's renderer process:
- **components/**: Reusable Vue components using Composition API
- **views/**: Page-level components for routing
- **stores/**: Pinia state management
- **router/**: Vue Router configuration and guards
- **i18n/**: Internationalization setup and translation files

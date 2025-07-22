# Architecture

## Component-Based Architecture

Privlix follows a modular component-based architecture with clear separation of concerns:

### Architecture Layers

- **Components**: Reusable UI components with TypeScript
- **Stores**: Pinia state management for data flow
- **Services**: Media scanning and file system operations
- **Utilities**: Helper functions and shared logic

### Component Layer

- **Core Components**: `MediaRow`, `VideoPlayer`, `NavBar`, `PrivlixLogo`
- **Layout Components**: `AppLayout`, `WelcomeScreen`, `HeroSection`
- **Utility Components**: `LanguageSwitcher`, `PrivlixButton`

### Store Layer

- **MediaStore**: Centralized media state management
- **Settings**: Application preferences and configuration

### Services Layer

- **Media Services**: File scanning and media recognition
- **File System**: Directory watching and file operations

## Development Principles

- **Component Architecture**: Reusable, modular components
- **Type Safety**: Full TypeScript coverage across all layers
- **Composition API**: Modern Vue.js reactive patterns
- **State Management**: Centralized Pinia stores
- **Single Responsibility**: Each component has a clear purpose
- **Separation of Concerns**: Clean boundaries between UI, logic, and data

## Architecture Benefits

- **Maintainability**: Clear component boundaries and responsibilities
- **Reusability**: Modular components can be easily reused
- **Type Safety**: TypeScript prevents runtime errors
- **Developer Experience**: Modern tooling with hot reload and type checking
- **Scalability**: Easy to extend with new components and features
- **Testing**: Isolated components are easier to unit test

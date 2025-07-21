# Architecture

## Domain-Driven Design Architecture

Privlix follows Domain-Driven Design (DDD) principles with clean architecture separation:

### Architecture Layers
- **Domain**: Core business logic and entities
- **Application**: Use cases, commands, and queries
- **Infrastructure**: Data persistence and external services
- **Presentation**: Vue.js components and stores

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

## Development Principles

- **Clean Architecture**: Clear separation of concerns
- **SOLID Principles**: Single responsibility, open/closed, dependency inversion
- **Type Safety**: Full TypeScript coverage
- **Composition API**: Modern Vue.js patterns
- **Reactive Programming**: Pinia stores with reactive state
- **Dependency Injection**: Proper DI container setup

## Architecture Benefits

- **Testability**: Separated layers make unit testing easier
- **Maintainability**: Clear boundaries between business logic and infrastructure
- **Scalability**: Easy to add new features without breaking existing code
- **Type Safety**: TypeScript prevents runtime errors
- **Developer Experience**: Modern tooling with hot reload and type checking

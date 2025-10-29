# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Build with watch mode for development
npm run watch

# Run tests
npm test
```

## Project Architecture

This is an Angular 20 application using standalone components (no NgModules) with a modular layout system.

### Key Architectural Patterns

- **Standalone Components**: All components use Angular's standalone component architecture with direct imports
- **Layout Wrapper Pattern**: A single `LayoutComponent` wraps all pages and manages the header, sidebar, and footer
- **Service-Based Data Management**: Uses a mock `DataService` with RxJS Observables for data operations
- **TypeScript Interfaces**: Centralized in `src/app/types/index.ts` for type safety

### Directory Structure

```
src/app/
├── layout/
│   ├── components/           # Reusable layout components (header, sidebar, footer)
│   └── layout.component.*   # Main layout wrapper that contains router-outlet
├── pages/                   # Feature components (dashboard, projects, skills, etc.)
├── services/               # Data management services
├── types/                  # TypeScript interface definitions
├── utils/                  # Helper functions
├── app.*                   # Root application files
└── app.routes.ts           # Route configuration
```

### Routing Architecture

- Uses nested routing with `LayoutComponent` as the parent route
- Default route redirects to `/dashboard`
- All page components are children of the layout component

### Data Layer

- `DataService` provides CRUD operations with mock data and simulated network delays
- All methods return RxJS Observables for consistent reactive patterns
- Mock data is initialized with realistic portfolio content

### Styling Architecture

- **Tailwind CSS v3** configured with PostCSS
- **SCSS** for component-specific styles
- Angular schematics configured to generate components with SCSS and skip tests by default
- Prettier configured with Angular HTML parser and single quotes

### Component Design

- All components are standalone with explicit imports
- Components follow single responsibility principle
- Layout components handle UI state (e.g., sidebar toggle)
- Page components focus on content display and user interactions

### Build Configuration

- Angular's application builder with inline SCSS support
- Production builds include budget limits (500kB initial, 1MB error)
- Karma configured for testing with Tailwind Vite plugin
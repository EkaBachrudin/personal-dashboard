# Portfolio Dashboard

A modern, responsive portfolio dashboard built with Angular 20 and Tailwind CSS v3. This application provides a clean interface to manage and showcase your projects, skills, experience, and contact information.

## 🚀 Features

- **Modern Design**: Clean and professional UI with Tailwind CSS
- **Responsive Layout**: Mobile-first design with collapsible sidebar
- **Component Architecture**: Reusable, standalone Angular components
- **TypeScript Support**: Full type safety throughout the application
- **Modular Structure**: Well-organized folder structure for maintainability

## 📁 Project Structure

```
src/
├── app/
│   ├── layout/                    # Layout components
│   │   ├── components/           # Reusable UI components
│   │   │   ├── header/           # Header component
│   │   │   ├── sidebar/          # Sidebar navigation
│   │   │   └── footer/           # Footer component
│   │   └── layout.component.*    # Main layout wrapper
│   ├── pages/                    # Feature pages
│   │   ├── dashboard/            # Dashboard overview
│   │   ├── projects/             # Projects management
│   │   ├── skills/               # Skills showcase
│   │   ├── experience/           # Work experience
│   │   └── contact/              # Contact information
│   ├── services/                 # Data services
│   ├── utils/                    # Utility functions
│   ├── types/                    # TypeScript interfaces
│   ├── app.ts                    # Root component
│   ├── app.html                  # Main template
│   └── app.routes.ts             # Routing configuration
├── styles.scss                   # Global styles
└── main.ts                       # Application bootstrap
```

## 🛠️ Technology Stack

- **Angular 20** - Modern framework with standalone components
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v3** - Utility-first CSS framework
- **SCSS** - CSS preprocessor
- **RxJS** - Reactive programming

## 🏗️ Architecture

### Layout Components

The application uses a modular layout system:

- **Header**: Contains navigation menu, notifications, and user profile
- **Sidebar**: Collapsible navigation with active state management
- **Footer**: Copyright information and social links
- **Layout Wrapper**: Coordinates all layout components and routing

### Component Design Principles

1. **Standalone Components**: No NgModules, direct imports
2. **Single Responsibility**: Each component has one clear purpose
3. **Reusability**: Components are designed to be reusable
4. **Responsive**: Mobile-first design approach
5. **Accessibility**: Semantic HTML and ARIA attributes

### State Management

- Component-level state for simple interactions
- Service-based state for data management
- Reactive patterns with RxJS for data flow

## 🎨 Styling

- **Tailwind CSS**: Utility-first approach for rapid development
- **Custom Theme**: Extended color palette with primary brand colors
- **Responsive Design**: Breakpoint-aware layouts
- **Animations**: Subtle transitions and micro-interactions

## 📊 Data Structure

TypeScript interfaces are defined for:

- **Projects**: Portfolio project management
- **Skills**: Technical skills and proficiency levels
- **Experience**: Work history and timeline
- **Contact**: Personal and professional contact information

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open http://localhost:4200 in your browser

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Responsive Design

- **Mobile (< 768px)**: Collapsible sidebar with hamburger menu
- **Tablet (768px - 1024px)**: Compact sidebar layout
- **Desktop (> 1024px)**: Full sidebar with expanded navigation

## 🔧 Configuration

### Tailwind CSS Configuration

The `tailwind.config.js` file extends the default theme with:

- Custom color palette
- Extended spacing utilities
- Custom animations
- Font family configuration

### Angular Configuration

The `angular.json` file includes:

- SCSS support
- Build optimizations
- Development server settings
- Asset management

## 🎯 Key Features

### Dashboard

- Overview statistics
- Recent activity feed
- Quick action buttons
- Performance metrics

### Projects Management

- Project showcase
- Technology tags
- Status tracking
- Link management

### Skills Display

- Skill categorization
- Proficiency levels
- Experience tracking
- Visual representations

### Experience Timeline

- Chronological work history
- Company information
- Technology stack used
- Duration tracking

## 🔮 Future Enhancements

- [ ] Add authentication system
- [ ] Implement CRUD operations for all entities
- [ ] Add data persistence with a backend API
- [ ] Include advanced filtering and search
- [ ] Add dark mode support
- [ ] Implement export functionality
- [ ] Add blog/section integration
- [ ] Include analytics dashboard

## 📝 Development Notes

- The application uses Angular's standalone components (no NgModules)
- Tailwind CSS is integrated with PostCSS for optimal performance
- All components follow the single responsibility principle
- TypeScript provides full type safety
- The project structure is optimized for scalability and maintenance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Angular and Tailwind CSS

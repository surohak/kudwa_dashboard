# KUDWA Financial Dashboard

A modern, responsive financial dashboard application built with React, TypeScript, and Tailwind CSS. The application provides interactive data visualization for financial metrics and reports.

## Live Demo
https://kudwa-dashboard-six.vercel.app/

## Features

- **Interactive Dashboard**: Dynamic KPI cards and charts for financial metrics
- **Financial Reports**: Expandable/collapsible detailed financial reports with nested data
- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices
- **Period Switching**: Toggle between monthly, quarterly, and yearly data views
- **Modern UI**: Clean and intuitive interface with consistent styling
- **Adaptive Navigation**: Sidebar on desktop, bottom navigation on mobile
- **State Management**: Centralized state management with Redux Toolkit

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Charts**: ECharts (via echarts-for-react)
- **Icons**: Heroicons
- **Routing**: React Router
- **State Management**: Redux Toolkit for centralized state management
- **Utilities**: classnames for conditional class assignment
- **Testing**: Vitest, React Testing Library, MSW for API mocking

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kudwa_task.git
cd kudwa_task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
kudwa_task/
├── public/            # Static assets and data files
│   └── data/          # JSON data for dashboard and reports
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable UI components
│   │   ├── layout/    # Layout components (sidebar, etc.)
│   │   └── ui/        # UI components (buttons, cards, etc.)
│   ├── pages/         # Page components
│   │   ├── Dashboard/ # Main dashboard page components
│   │   └── Report/    # Financial report page components
│   ├── services/      # API services and data fetching
│   │   └── Api/       # API service implementations
│   ├── store/         # Redux store configuration
│   │   └── slices/    # Redux slices for state management
│   ├── __tests__/     # Test files and testing setup
│   └── utils/         # Utility functions
├── App.tsx            # Root application component
└── main.tsx          # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Testing

The project uses Vitest as the test runner along with React Testing Library for component testing and MSW (Mock Service Worker) for API mocking.

### Test Structure

- `src/__tests__/` - Contains test files and test setup
  - `Dashboard.test.tsx` - Tests for Dashboard component
  - `Report.test.tsx` - Tests for Report component
  - `setup/` - Test setup files including API mocks

### Running Tests

To run the tests once:
```bash
npm run test
```

To run tests in watch mode during development:
```bash
npm run test:watch
```

To view test coverage:
```bash
npm run test:coverage
```

## Key Features In Detail

### Dashboard

The dashboard displays key financial metrics and interactive charts:
- KPI cards showing critical financial indicators
- Interactive charts for visualizing trends and comparisons
- Period switcher to toggle between monthly, quarterly, and yearly views

### Financial Report

The financial report page provides detailed financial data with:
- Expandable/collapsible sections for organized data viewing
- Hierarchical data display with nested fields
- Clean formatting of financial figures
- Consistent period switching across the application

### Responsive Design

The application is fully responsive:
- Desktop: Full sidebar navigation with collapsible option
- Mobile: Bottom navigation bar for easy thumb access
- Properly sized content and typography across all screen sizes

### State Management with Redux

The application uses Redux Toolkit for state management:
- **Centralized Store**: Single source of truth for application state
- **Redux Slices**: Modular state management for different features
  - Dashboard slice for managing dashboard data and state
  - Report slice for managing report data and state
- **Async Thunks**: Handle asynchronous operations like API calls
- **Type-Safe**: Fully typed Redux implementation with TypeScript
- **Performance**: Optimized rendering with selective state subscriptions

## Future Enhancements

- User authentication and personalized dashboards
- Data export functionality
- Dark/light theme toggle
- Advanced filtering options
- Real-time data updates
- Persistent state with localStorage/sessionStorage

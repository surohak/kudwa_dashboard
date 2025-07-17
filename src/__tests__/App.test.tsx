import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from '../App';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
  };
});

// Mock the components used in App
vi.mock('../components/layout/RootLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-root-layout">{children}</div>,
}));

vi.mock('../pages/Dashboard', () => ({
  default: () => <div data-testid="mock-dashboard">Dashboard Page</div>,
}));

vi.mock('../pages/Report', () => ({
  default: () => <div data-testid="mock-report">Report Page</div>,
}));

describe('App', () => {
  it('renders with RootLayout', () => {
    render(<App />);
    expect(screen.getByTestId('mock-root-layout')).toBeInTheDocument();
  });

  it('renders Dashboard and Report pages', () => {
    render(<App />);
    expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('mock-report')).toBeInTheDocument();
  });
});

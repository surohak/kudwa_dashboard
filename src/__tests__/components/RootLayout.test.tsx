import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RootLayout from 'components/layout/RootLayout/RootLayout';

// Mock the Sidebar component
vi.mock('components/layout/Sidebar', () => ({
  default: () => <div data-testid="sidebar-component">Sidebar Component</div>,
}));

describe('RootLayout', () => {
  it('renders the Sidebar component', () => {
    render(
      <MemoryRouter>
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('sidebar-component')).toBeInTheDocument();
  });

  it('renders the children content', () => {
    render(
      <MemoryRouter>
        <RootLayout>
          <div data-testid="test-content">Test Content</div>
        </RootLayout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has the expected layout structure', () => {
    const { container } = render(
      <MemoryRouter>
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      </MemoryRouter>,
    );

    // Check for flex layout classes
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).toContain('flex');
    expect(rootDiv.className).toContain('md:flex-row');
    expect(rootDiv.className).toContain('min-h-screen');

    // Check for flex-grow on content container
    const contentContainer = rootDiv.lastChild as HTMLElement;
    expect(contentContainer.className).toContain('flex-grow');
  });
});

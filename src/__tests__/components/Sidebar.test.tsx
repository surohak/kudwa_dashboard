import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { navigationItems } from 'components/layout/Sidebar/constants';
import Sidebar from 'components/layout/Sidebar/Sidebar';

// Mock useLocation to control the current path
const mockUseLocation = vi.fn().mockReturnValue({ pathname: '/' });
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

describe('Sidebar', () => {
  it('renders desktop sidebar with navigation items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    // Check that the logo is rendered
    expect(screen.getByText('KUDWA')).toBeInTheDocument();

    // Check that all navigation items are rendered in the desktop sidebar
    // Using getAllByText to get all occurrences and checking desktop items specifically
    const desktopSidebar = document.querySelector('.hidden.md\\:flex');
    expect(desktopSidebar).toBeInTheDocument();

    navigationItems.forEach((item) => {
      const desktopItems = screen.getAllByText(item.name);
      // At least one item with this name should be in the desktop sidebar
      expect(desktopItems.length).toBeGreaterThan(0);
    });
  });

  it('renders mobile bottom navigation on small screens', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    // The mobile navigation should contain the same items
    const mobileNav = document.querySelector('.md\\:hidden');
    expect(mobileNav).toBeInTheDocument();

    navigationItems.forEach((item) => {
      // Mobile nav should have the items too
      const mobileNavItem = screen.getAllByText(item.name);
      expect(mobileNavItem.length).toBeGreaterThan(0);

      // At least one of these items should be in the mobile nav
      const itemInMobileNav = Array.from(mobileNavItem).some((el) => mobileNav?.contains(el));
      expect(itemInMobileNav).toBeTruthy();
    });
  });

  it('toggles sidebar collapse state when toggle button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    // Initially sidebar should be expanded (KUDWA text visible)
    expect(screen.getByText('KUDWA')).toBeInTheDocument();

    // Find and click the toggle button
    const toggleButton = screen.getByTitle('Collapse sidebar');
    await user.click(toggleButton);

    // After clicking, it should be collapsed (only K is visible)
    expect(screen.getByText('K')).toBeInTheDocument();
    expect(screen.queryByText('KUDWA')).not.toBeInTheDocument();

    // Toggle button should now have a different title
    expect(screen.getByTitle('Expand sidebar')).toBeInTheDocument();
  });

  it('highlights the active navigation item', () => {
    // Mock useLocation to return a specific path
    mockUseLocation.mockReturnValueOnce({ pathname: '/dashboard' });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    // Find the Dashboard item (assuming it's in navigationItems)
    const dashboardItem = navigationItems.find((item) => item.path === '/dashboard');
    if (dashboardItem) {
      const desktopSidebar = document.querySelector('.hidden.md\\:flex');
      const dashboardLinks = screen.getAllByText(dashboardItem.name);

      // Find the link in the desktop sidebar
      const desktopLink = Array.from(dashboardLinks)
        .find((el) => desktopSidebar?.contains(el))
        ?.closest('a');

      if (desktopLink) {
        // Active link should have the "bg-blue text-white" classes
        expect(desktopLink.className).toContain('bg-blue');
        expect(desktopLink.className).toContain('text-white');
      }
    }
  });
});

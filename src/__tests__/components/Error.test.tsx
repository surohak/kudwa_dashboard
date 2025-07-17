import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Error from '../../components/ui/Error/Error';

describe('Error component', () => {
  beforeEach(() => {
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true,
    });
  });

  it('renders error message correctly', () => {
    render(<Error error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('displays the warning icon', () => {
    render(<Error error="Test error message" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('has a try again button', () => {
    render(<Error error="Test error message" />);
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it('reloads the page when try again button is clicked', () => {
    render(<Error error="Test error message" />);
    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);
    expect(window.location.reload).toHaveBeenCalled();
  });
});

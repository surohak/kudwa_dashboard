import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loading from '../../components/ui/Loading/Loading';

describe('Loading component', () => {
  it('renders the loading spinner', () => {
    render(<Loading />);
    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  it('has the correct styling', () => {
    const { container } = render(<Loading />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('items-center');
    expect(mainDiv).toHaveClass('justify-center');

    // Check for the spinner element
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});

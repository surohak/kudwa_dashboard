import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoData from '../../components/ui/NoData/NoData';

describe('NoData component', () => {
  it('renders the no data message', () => {
    render(<NoData />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('has the correct styling', () => {
    const { container } = render(<NoData />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('items-center');
    expect(mainDiv).toHaveClass('justify-center');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SectionHeader from '../../pages/Report/components/SectionHeader';

describe('SectionHeader component', () => {
  it('renders the title correctly', () => {
    render(<SectionHeader title="Test Section" />);
    expect(screen.getByText('Test Section')).toBeInTheDocument();
  });

  it('applies the correct styling', () => {
    const { container } = render(<SectionHeader title="Test Section" />);
    const headerDiv = container.firstChild;
    expect(headerDiv).toHaveClass('bg-gray-50');
    expect(headerDiv).toHaveClass('px-6');
    expect(headerDiv).toHaveClass('py-3');

    const heading = screen.getByText('Test Section');
    expect(heading).toHaveClass('text-lg');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('text-gray-900');
  });
});

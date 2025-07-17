import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PeriodSwitcher from 'components/ui/PeriodSwitcher/PeriodSwitcher';

import type { PeriodType } from 'services/Api/types';

describe('PeriodSwitcher', () => {
  const mockOnPeriodChange = vi.fn();

  beforeEach(() => {
    mockOnPeriodChange.mockReset();
  });

  it('renders correctly with all period options', () => {
    render(<PeriodSwitcher activePeriod="monthly" onPeriodChange={mockOnPeriodChange} />);

    // Check that all periods are rendered (in desktop view)
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Quarterly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('highlights the active period', () => {
    render(<PeriodSwitcher activePeriod="quarterly" onPeriodChange={mockOnPeriodChange} />);

    // Get all buttons
    const monthlyButton = screen.getByText('Monthly').closest('button');
    const quarterlyButton = screen.getByText('Quarterly').closest('button');
    const yearlyButton = screen.getByText('Yearly').closest('button');

    // Check active state (using disabled attribute as per component implementation)
    expect(monthlyButton).not.toBeDisabled();
    expect(quarterlyButton).toBeDisabled(); // Active button is disabled to prevent re-clicking
    expect(yearlyButton).not.toBeDisabled();
  });

  it('calls onPeriodChange when a period is clicked', async () => {
    const user = userEvent.setup();

    render(<PeriodSwitcher activePeriod="monthly" onPeriodChange={mockOnPeriodChange} />);

    // Click on the yearly button
    const yearlyButton = screen.getByText('Yearly').closest('button');
    await user.click(yearlyButton as HTMLElement);

    // Check if the callback was called with correct period
    expect(mockOnPeriodChange).toHaveBeenCalledTimes(1);
    expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly' as PeriodType);
  });

  it('shows short labels on small screens', () => {
    render(<PeriodSwitcher activePeriod="monthly" onPeriodChange={mockOnPeriodChange} />);

    // Short labels should be in the document but hidden on larger screens
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('Q')).toBeInTheDocument();
    expect(screen.getByText('Y')).toBeInTheDocument();
  });
});

import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from 'pages/Dashboard/components/Header';
import { describe, expect, it, vi } from 'vitest';

import type { DashboardResponse } from 'services/Api/dashboardService';
import type { PeriodType } from 'services/Api/types';

// Mock the PeriodSwitcher component
vi.mock('components/ui/PeriodSwitcher', () => ({
  default: ({
    activePeriod,
    onPeriodChange,
  }: {
    activePeriod: PeriodType;
    onPeriodChange: (period: PeriodType) => void;
  }) => (
    <div data-testid="period-switcher">
      <button disabled={activePeriod === 'monthly'} onClick={() => onPeriodChange('monthly')}>
        Monthly
      </button>
      <button disabled={activePeriod === 'quarterly'} onClick={() => onPeriodChange('quarterly')}>
        Quarterly
      </button>
      <button disabled={activePeriod === 'yearly'} onClick={() => onPeriodChange('yearly')}>
        Yearly
      </button>
    </div>
  ),
}));

describe('Dashboard Header Component', () => {
  const mockDashboardData: DashboardResponse = {
    mainDashboard: {
      period: 'monthly',
      startDate: '2023-01-01',
      // eslint-disable-next-line sonarjs/no-duplicate-string
      endDate: '2023-01-31',
      metricDate: '2023-01-31',
      dateArray: ['2023-01-01', '2023-01-31'],
      charts: {
        cashAtBank: [],
        expenseSplit: [],
        indirectCashflow: [],
        totalRevenuesSplit: [],
      },
    },
    mainDashboardKPIs: {
      KPIs: [],
      topKPIs: [],
    },
  };

  const mockProps = {
    dashboardData: mockDashboardData,
    activePeriod: 'monthly' as PeriodType,
    setActivePeriod: vi.fn(),
  };

  const renderHeader = (props = mockProps) => {
    return render(
      <BrowserRouter>
        <Header {...props} />
      </BrowserRouter>,
    );
  };

  it('renders the title and dashboard info', () => {
    renderHeader();

    expect(screen.getByText('Main Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Data Period')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01 - 2023-01-31')).toBeInTheDocument();
    expect(screen.getByText('Metric Date')).toBeInTheDocument();
    expect(screen.getByText('2023-01-31')).toBeInTheDocument();
  });

  it('renders the period switcher component', () => {
    renderHeader();

    expect(screen.getByTestId('period-switcher')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Quarterly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('passes the correct period to PeriodSwitcher', () => {
    renderHeader();

    // The monthly button should be disabled (active)
    const monthlyButton = screen.getByText('Monthly');
    expect(monthlyButton).toBeDisabled();

    // Other buttons should not be disabled
    const quarterlyButton = screen.getByText('Quarterly');
    const yearlyButton = screen.getByText('Yearly');
    expect(quarterlyButton).not.toBeDisabled();
    expect(yearlyButton).not.toBeDisabled();
  });

  it('passes the onPeriodChange callback to PeriodSwitcher', async () => {
    renderHeader();

    // Click on the yearly button
    const yearlyButton = screen.getByText('Yearly');
    yearlyButton.click();

    // Check if the callback was called with correct period
    expect(mockProps.setActivePeriod).toHaveBeenCalledWith('yearly');
  });
});

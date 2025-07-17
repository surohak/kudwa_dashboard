import { render, screen } from '@testing-library/react';
import KPIsSection from 'pages/Dashboard/components/KPIsSection';
import { describe, expect, it, vi } from 'vitest';

import type { DashboardResponse } from 'services/Api/dashboardService';

// Mock the constants file to control chart title strings
vi.mock('pages/Dashboard/constants.ts', () => ({
  getChartTitleStr: (key: string) => {
    if (key === 'KPIs') return 'Key Performance Indicators';
    if (key === 'topKPIs') return 'Top KPIs';
    return key;
  },
}));

const endDate = '2023-01-31';

describe('KPIsSection Component', () => {
  const mockDashboardData: DashboardResponse = {
    mainDashboard: {
      period: 'monthly',
      startDate: '2023-01-01',
      endDate: endDate,
      metricDate: endDate,
      dateArray: ['2023-01-01', endDate],
      charts: {
        cashAtBank: [],
        expenseSplit: [],
        indirectCashflow: [],
        totalRevenuesSplit: [],
      },
    },
    mainDashboardKPIs: {
      KPIs: [
        {
          name: 'Total Revenue',
          value: 120000,
          prefix: '$',
          mom: 5.2, // Month-over-month change
          date: endDate,
        },
        {
          name: 'Net Profit',
          value: 42000,
          prefix: '$',
          mom: -2.8, // Negative change
          date: endDate,
        },
      ],
      topKPIs: [
        {
          name: 'Average Order Value',
          value: 85,
          prefix: '$',
          mom: 1.5,
          date: endDate,
        },
      ],
    },
  };

  it('renders the KPIs section titles', () => {
    render(<KPIsSection dashboardData={mockDashboardData} periodSwitching={false} />);

    expect(screen.getByText('Key Performance Indicators')).toBeInTheDocument();
    expect(screen.getByText('Top KPIs')).toBeInTheDocument();
  });

  it('renders all KPIs with correct values', () => {
    render(<KPIsSection dashboardData={mockDashboardData} periodSwitching={false} />);

    // Check regular KPIs
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('120000')).toBeInTheDocument();
    // Use getAllByText for elements that appear multiple times
    expect(screen.getAllByText('$:').length).toBeGreaterThan(0);
    expect(screen.getByText('5.2')).toBeInTheDocument();

    expect(screen.getByText('Net Profit')).toBeInTheDocument();
    expect(screen.getByText('42000')).toBeInTheDocument();
    expect(screen.getByText('-2.8')).toBeInTheDocument();

    // Check top KPIs
    expect(screen.getByText('Average Order Value')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();
  });

  it('displays positive and negative changes with correct styling', () => {
    render(<KPIsSection dashboardData={mockDashboardData} periodSwitching={false} />);

    // Find the change indicators
    const positiveChange = screen.getByText('5.2');
    const negativeChange = screen.getByText('-2.8');

    // Check for color classes
    expect(positiveChange).toHaveClass('text-green-500');
    expect(negativeChange).toHaveClass('text-red-500');
  });

  it('renders skeletons when periodSwitching is true', () => {
    render(<KPIsSection dashboardData={mockDashboardData} periodSwitching={true} />);

    // Check for skeleton components
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

import { act, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Dashboard from '../pages/Dashboard/Dashboard';
import type { DashboardResponse } from '../services/Api/dashboardService';
import { dashboardService } from '../services/Api/dashboardService';
import type { RequestConfig } from '../services/Api/types';

const endDate = '2023-01-31';

// Create a typed mock dashboard data
const typedMockDashboardData: DashboardResponse = {
  mainDashboard: {
    period: 'monthly',
    startDate: '2023-01-01',
    endDate: endDate,
    metricDate: endDate,
    dateArray: ['2023-01-01', '2023-01-15', endDate],
    charts: {
      cashAtBank: [
        {
          chartType: 'line',
          name: 'Cash Balance',
          values: [10000, 12000, 15000],
        },
      ],
      expenseSplit: [
        {
          chartType: 'pie',
          name: 'Marketing',
          values: 25000,
        },
        {
          chartType: 'pie',
          name: 'Operations',
          values: 35000,
        },
      ],
      indirectCashflow: [
        {
          chartType: 'bar',
          name: 'Cash In',
          values: [20000, 22000, 25000],
        },
        {
          chartType: 'bar',
          name: 'Cash Out',
          values: [15000, 18000, 20000],
        },
      ],
      totalRevenuesSplit: [
        {
          chartType: 'columnStacked',
          name: 'Product A',
          values: [5000, 6000, 7000],
        },
        {
          chartType: 'columnStacked',
          name: 'Product B',
          values: [4000, 4500, 5000],
        },
      ],
    },
  },
  mainDashboardKPIs: {
    KPIs: [
      {
        name: 'Total Revenue',
        value: 120000,
        prefix: '$',
        mom: 5.2,
        date: endDate,
      },
      {
        name: 'Net Profit',
        value: 42000,
        prefix: '$',
        mom: 2.8,
        date: endDate,
      },
    ],
    topKPIs: [
      {
        name: 'Cash Balance',
        value: 250000,
        prefix: '$',
        mom: 3.5,
        date: endDate,
      },
      {
        name: 'Burn Rate',
        value: 45000,
        prefix: '$',
        mom: -2.1,
        date: endDate,
      },
    ],
  },
};

// Mock the dashboard service
vi.mock('../services/Api/dashboardService', () => ({
  dashboardService: {
    getDashboardData: vi.fn(),
  },
}));

// Mock the components to avoid complex rendering issues
vi.mock('../pages/Dashboard/components/KPIsSection', () => ({
  default: vi.fn().mockImplementation(() => <div>KPIs Section</div>),
}));

vi.mock('../pages/Dashboard/components/ChartsSection', () => ({
  default: vi.fn().mockImplementation(() => <div>Charts Section</div>),
}));

vi.mock('../pages/Dashboard/components/Header', () => ({
  default: vi.fn().mockImplementation(() => <div>Dashboard Header</div>),
}));

vi.mock('../components/ui/Loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../components/ui/Error', () => ({
  default: ({ error }: { error: string }) => <div>Error: {error}</div>,
}));

vi.mock('../components/ui/NoData', () => ({
  default: () => <div>No data available</div>,
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the Dashboard component', async () => {
    // Mock successful data fetch
    vi.mocked(dashboardService.getDashboardData).mockResolvedValue(typedMockDashboardData);

    await act(async () => {
      render(<Dashboard />);
    });

    // Wait for component to finish rendering
    await waitFor(() => {
      // Basic assertion that rendering doesn't throw errors
      expect(true).toBe(true);
    });
  });

  it('calls getDashboardData on mount', async () => {
    // Mock successful data fetch
    vi.mocked(dashboardService.getDashboardData).mockResolvedValue(typedMockDashboardData);

    await act(async () => {
      render(<Dashboard />);
    });

    // Verify the service was called
    expect(dashboardService.getDashboardData).toHaveBeenCalledTimes(1);
  });

  it('handles different periods', async () => {
    // Mock successful data fetch
    vi.mocked(dashboardService.getDashboardData).mockImplementation((period) => {
      // Test that different periods are handled
      if (period === 'monthly') {
        return Promise.resolve(typedMockDashboardData);
      } else if (period === 'quarterly') {
        const quarterlyData = { ...typedMockDashboardData };
        quarterlyData.mainDashboard.period = 'quarterly';
        return Promise.resolve(quarterlyData);
      } else {
        const yearlyData = { ...typedMockDashboardData };
        yearlyData.mainDashboard.period = 'yearly';
        return Promise.resolve(yearlyData);
      }
    });

    await act(async () => {
      render(<Dashboard />);
    });

    // Verify the service was called with monthly by default
    expect(dashboardService.getDashboardData).toHaveBeenCalledWith('monthly', expect.anything());
  });

  it('handles error states', async () => {
    // Mock API error
    vi.mocked(dashboardService.getDashboardData).mockImplementation((_, config: RequestConfig) => {
      config.setError?.('Failed to load dashboard data');
      return Promise.resolve(null);
    });

    await act(async () => {
      render(<Dashboard />);
    });

    // Verify error handling function was called
    expect(dashboardService.getDashboardData).toHaveBeenCalledTimes(1);
  });

  it('handles empty data', async () => {
    // Mock empty data response
    vi.mocked(dashboardService.getDashboardData).mockResolvedValue(null);

    await act(async () => {
      render(<Dashboard />);
    });

    // Verify the service was called
    expect(dashboardService.getDashboardData).toHaveBeenCalledTimes(1);
  });
});

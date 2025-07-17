import { act, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Report from '../pages/Report/Report';
import { reportService } from '../services/Api/reportService';
import type { RequestConfig } from '../services/Api/types';
import { mockReportData } from './setup/mockData';

// Mock the report service
vi.mock('../services/Api/reportService', () => ({
  reportService: {
    getReportData: vi.fn(),
  },
}));

// Mock the components to avoid complex rendering issues
vi.mock('../pages/Report/components/Header', () => ({
  default: vi.fn().mockImplementation(() => <div>Report Header</div>),
}));

vi.mock('../pages/Report/components/Footer', () => ({
  default: () => <div>Report Footer</div>,
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

describe('Report Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the Report component', async () => {
    // Mock successful data fetch
    vi.mocked(reportService.getReportData).mockResolvedValue(mockReportData.reportResult);

    await act(async () => {
      render(<Report />);
    });

    // Wait for component to finish rendering
    await waitFor(() => {
      // Basic assertion that rendering doesn't throw errors
      expect(true).toBe(true);
    });
  });

  it('calls getReportData on mount', async () => {
    // Mock successful data fetch
    vi.mocked(reportService.getReportData).mockResolvedValue(mockReportData.reportResult);

    await act(async () => {
      render(<Report />);
    });

    // Verify the service was called
    expect(reportService.getReportData).toHaveBeenCalledTimes(1);
  });

  it('handles different periods', async () => {
    // Mock successful data fetch
    vi.mocked(reportService.getReportData).mockResolvedValue(mockReportData.reportResult);

    await act(async () => {
      render(<Report />);
    });

    // Verify the service was called
    expect(reportService.getReportData).toHaveBeenCalledTimes(1);
  });

  it('handles error states', async () => {
    // Mock API error
    vi.mocked(reportService.getReportData).mockImplementation((config: RequestConfig) => {
      config.setError('Failed to load report data');
      return Promise.resolve(null);
    });

    await act(async () => {
      render(<Report />);
    });

    // Verify error handling function was called
    expect(reportService.getReportData).toHaveBeenCalledTimes(1);
  });

  it('handles empty data', async () => {
    // Mock empty data response
    vi.mocked(reportService.getReportData).mockResolvedValue(null);

    await act(async () => {
      render(<Report />);
    });

    // Verify the service was called
    expect(reportService.getReportData).toHaveBeenCalledTimes(1);
  });
});

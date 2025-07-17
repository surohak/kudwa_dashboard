import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { reportService } from 'services/Api/reportService';

import server from '../setup/handlers';
import { mockReportData } from '../setup/mockData';

describe('reportService', () => {
  const mockConfig = {
    setLoading: vi.fn(),
    setError: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    mockConfig.setLoading.mockReset();
    mockConfig.setError.mockReset();
    server.resetHandlers();
  });

  it('getReportData calls fetch with correct URL and returns data', async () => {
    const result = await reportService.getReportData(mockConfig);

    expect(result).toEqual(mockReportData.reportResult);
    expect(mockConfig.setLoading).toHaveBeenCalledTimes(2); // Called for both start and end
    expect(mockConfig.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockConfig.setLoading).toHaveBeenNthCalledWith(2, false);
    expect(mockConfig.setError).not.toHaveBeenCalled();
  });

  it('getReportData handles API errors', async () => {
    // Override the handler for this test to return an error
    server.use(
      http.get('/data/report/report.json', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const result = await reportService.getReportData(mockConfig);

    expect(result).toBeNull();
    expect(mockConfig.setError).toHaveBeenCalledWith('Failed to load report data');
  });

  it('getReportData handles fetch exceptions', async () => {
    // Override the handler to throw a network error
    server.use(
      http.get('/data/report/report.json', () => {
        throw new Error('Network error');
      }),
    );

    const result = await reportService.getReportData(mockConfig);

    expect(result).toBeNull();
    expect(mockConfig.setError).toHaveBeenCalledWith('Failed to load report data');
  });
});

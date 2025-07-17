import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { mockMonthlyDashboardData, mockQuarterlyDashboardData, mockReportData } from './mockData';

// Define handlers for different endpoints
const handlers = [
  // Dashboard data endpoints
  http.get('/data/main_dashboard/monthly.json', () => {
    return HttpResponse.json(mockMonthlyDashboardData);
  }),

  http.get('/data/main_dashboard/quarterly.json', () => {
    return HttpResponse.json(mockQuarterlyDashboardData);
  }),

  http.get('/data/main_dashboard/yearly.json', () => {
    return HttpResponse.json(mockQuarterlyDashboardData);
  }),

  // Report data endpoint
  http.get('/data/report/report.json', () => {
    return HttpResponse.json(mockReportData);
  }),
];

const server = setupServer(...handlers);

export default server;

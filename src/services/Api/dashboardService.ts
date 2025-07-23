import { delay } from 'utils/helpers.ts';

import type { PeriodType, RequestConfig } from './types.ts';

export interface ChartData {
  chartType: 'line' | 'bar' | 'columnStacked' | 'pie' | 'donut';
  name: string;
  values: number | number[];
}

export interface KPI {
  name: string;
  value: number;
  prefix: string;
  mom: number; // Month-over-month change
  date: string; // Date of the KPI value
}

export interface MainDashboardKPI {
  KPIs: KPI[];
  topKPIs: KPI[];
}

export interface MainDashboardData {
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  metricDate: string;
  dateArray: string[];
  charts: {
    cashAtBank: ChartData[];
    expenseSplit: ChartData[];
    indirectCashflow: (ChartData | null)[];
    totalRevenuesSplit: ChartData[];
  };
}

export interface DashboardResponse {
  mainDashboard: MainDashboardData;
  mainDashboardKPIs: MainDashboardKPI;
}

class DashboardService {
  private static readonly BASE_URL = '/data/main_dashboard';

  async getDashboardData(period: PeriodType, config: RequestConfig): Promise<DashboardResponse | null> {
    try {
      config.setLoading?.(true);

      // Add a small delay for smooth transition
      await delay();

      const response = await fetch(`${DashboardService.BASE_URL}/${period}.json`);

      if (!response.ok) {
        config.setError?.(`Failed to load ${period} dashboard data`);
        return null;
      }

      return await response.json();
    } catch (error) {
      config.setError?.(`Error fetching ${period} dashboard data: ${error}`);
      return null;
    } finally {
      config.setLoading?.(false);
    }
  }

  async getAllPeriodData(config: RequestConfig): Promise<Record<PeriodType, DashboardResponse | null>> {
    try {
      config.setLoading?.(true);

      // Add a small delay for smooth transition
      await delay();

      const [monthly, quarterly, yearly] = await Promise.all([
        this.getDashboardData('monthly', config),
        this.getDashboardData('quarterly', config),
        this.getDashboardData('yearly', config),
      ]);

      return {
        monthly,
        quarterly,
        yearly,
      };
    } catch (error) {
      config.setError?.(`Error fetching all period data: ${error}`);
      return { monthly: null, quarterly: null, yearly: null };
    } finally {
      config.setLoading?.(false);
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;

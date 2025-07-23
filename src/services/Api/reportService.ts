import { delay } from 'utils/helpers.ts';

import type { RequestConfig } from './types.ts';

export interface UniqueReference {
  sheetType: string;
  integrationSourceId: number;
  sourceType: string;
  accountId: string;
  accountName: string;
  metric: boolean;
}

export interface ActualData {
  id: number;
  topLevelFieldId: number | null;
  fieldId: number;
  value: number[];
  createdAt: string;
  updatedAt: string;
  source: string | null;
}

export interface ReportField {
  id: number;
  topLevelFieldId: number;
  name: string;
  code: string | null;
  uniqueReference: UniqueReference;
  order: number | null;
  description: string | null;
  style: string | null;
  fieldType: string | null;
  createdAt: string;
  updatedAt: string;
  fieldId: number | null;
  actualData: ActualData[];
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
  quarterlyResult?: number[];
  yearlyResult?: number[];
  fields?: ReportField[]; // Nested fields
}

export interface ProfitLossSection {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  actualData: ActualData[];
  fields: ReportField[];
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
  quarterlyResult?: number[];
  yearlyResult?: number[];
  pastMonth?: number[];
  quarterlyPastMonth?: number[];
  yearlyPastMonth?: number[];
  totalResult?: number[];
}

export interface ComputedFieldData {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  actualData: ActualData[];
  fields: ReportField[];
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
}

export interface Metric {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  actualData: ActualData[];
  fields: ReportField[];
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
}

export interface MetricsContainer {
  [key: string]: Metric;
}

export interface ReportResult {
  id: number;
  scenarioId: number;
  startingDate: string;
  endingDate: string;
  createdAt: string;
  updatedAt: string;
  profitnLoss: ProfitLossSection[];
  computedFields: ComputedFieldData[];
  metrics: MetricsContainer;
}

export interface ReportData {
  reportResult: ReportResult;
}

class ReportService {
  private static readonly BASE_URL = '/data/report';

  async getReportData(config: RequestConfig): Promise<ReportResult | null> {
    try {
      config.setLoading?.(true);

      // Add a small delay for smooth transition
      await delay();

      const response = await fetch(`${ReportService.BASE_URL}/report.json`);

      if (!response.ok) {
        config.setError?.('Failed to load report data');
        return null;
      }

      return (await response.json()).reportResult;
    } catch (error) {
      config.setError?.(`Error fetching report data: ${error}`);
      return null;
    } finally {
      config.setLoading?.(false);
    }
  }
}

export const reportService = new ReportService();
export default reportService;

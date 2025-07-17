import type { ProfitLossSection, ReportField } from 'services/Api/reportService';
import type { PeriodType } from 'services/Api/types';

export const getPeriodValues = (activePeriod: PeriodType, section: ProfitLossSection | ReportField) => {
  switch (activePeriod) {
    case 'quarterly':
      return section.quarterly || section.quarterlyResult || [];
    case 'yearly':
      return section.yearly || section.yearlyResult || [];
    default:
      return 'totalResult' in section ? section.totalResult || [] : section.result || [];
  }
};

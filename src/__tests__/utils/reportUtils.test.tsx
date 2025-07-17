import { describe, expect, it } from 'vitest';

import { getPeriodValues } from '../../pages/Report/utils';
import type { ProfitLossSection, ReportField } from '../../services/Api/reportService';

describe('Report utils', () => {
  describe('getPeriodValues', () => {
    const mockSection: Partial<ProfitLossSection> = {
      result: [100, 200, 300],
      quarterly: [400, 500, 600],
      yearly: [1000, 2000],
      totalResult: [5000],
    };

    const mockField: Partial<ReportField> = {
      result: [10, 20, 30],
      quarterly: [40, 50, 60],
      yearly: [100, 200],
      quarterlyResult: [400, 500],
      yearlyResult: [1000],
    };

    it('returns monthly values for default period', () => {
      const values = getPeriodValues('monthly', mockSection as ProfitLossSection);
      expect(values).toEqual([5000]);
    });

    it('returns quarterly values for quarterly period', () => {
      const values = getPeriodValues('quarterly', mockSection as ProfitLossSection);
      expect(values).toEqual([400, 500, 600]);
    });

    it('returns yearly values for yearly period', () => {
      const values = getPeriodValues('yearly', mockSection as ProfitLossSection);
      expect(values).toEqual([1000, 2000]);
    });

    it('returns result values for field with monthly period', () => {
      const values = getPeriodValues('monthly', mockField as ReportField);
      expect(values).toEqual([10, 20, 30]);
    });

    it('returns quarterlyResult values for field with quarterly period', () => {
      const values = getPeriodValues('quarterly', mockField as ReportField);
      expect(values).toEqual([40, 50, 60]);
    });

    it('returns yearlyResult values for field with yearly period', () => {
      const values = getPeriodValues('yearly', mockField as ReportField);
      expect(values).toEqual([100, 200]);
    });

    it('returns empty array if values are undefined', () => {
      const emptySection: Partial<ProfitLossSection> = {};
      const values = getPeriodValues('monthly', emptySection as ProfitLossSection);
      expect(values).toEqual([]);
    });
  });
});

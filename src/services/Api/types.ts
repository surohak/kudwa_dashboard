export interface RequestConfig {
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

export type PeriodType = 'monthly' | 'quarterly' | 'yearly';

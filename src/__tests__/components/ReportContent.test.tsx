import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ReportContent from '../../pages/Report/components/ReportContent';
import type { ComputedFieldData, Metric, ReportResult } from '../../services/Api/reportService';

// Mock the child components
vi.mock('../../pages/Report/components/SectionHeader', () => ({
  default: vi.fn().mockImplementation(({ title }) => <h2 data-testid="section-header">{title}</h2>),
}));

vi.mock('../../pages/Report/components/ExpandableSection', () => ({
  default: vi.fn().mockImplementation(({ section }) => <div data-testid="expandable-section">{section.name}</div>),
}));

vi.mock('../../pages/Report/components/ComputedField', () => ({
  default: vi.fn().mockImplementation(({ field }) => <div data-testid="computed-field">{field.name}</div>),
}));

vi.mock('../../pages/Report/components/ExpandableMetric', () => ({
  default: vi.fn().mockImplementation(({ metricKey, metric }) => (
    <div data-testid="expandable-metric">
      {metricKey}: {metric.name}
    </div>
  )),
}));

describe('ReportContent component', () => {
  const mockProfitLossSection = {
    id: 1,
    financialReportId: 123,
    name: 'Revenue',
    type: 'income',
    description: 'Revenue section',
    style: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    actualData: [],
    fields: [],
    result: [100, 200, 300],
    quarterly: [1000, 2000],
    yearly: [10000],
  };

  const mockComputedField: ComputedFieldData = {
    id: 2,
    financialReportId: 123,
    name: 'Gross Profit',
    type: 'computed',
    description: 'Gross profit calculation',
    style: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    actualData: [],
    fields: [],
    result: [50, 100, 150],
    quarterly: [500, 1000],
    yearly: [5000],
  };

  const mockMetric: Metric = {
    id: 3,
    financialReportId: 123,
    name: 'Profit Margin',
    type: 'metric',
    description: 'Profit margin calculation',
    style: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    actualData: [],
    fields: [],
    result: [5, 10, 15],
    quarterly: [50, 100],
    yearly: [500],
  };

  const mockReportData: ReportResult = {
    id: 1,
    scenarioId: 123,
    startingDate: '2023-01-01',
    endingDate: '2023-01-31',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    profitnLoss: [mockProfitLossSection],
    computedFields: [mockComputedField],
    metrics: {
      PM: mockMetric,
    },
  };

  it('renders the profit & loss section', () => {
    render(<ReportContent reportData={mockReportData} activePeriod="monthly" />);
    expect(screen.getByText('Profit & Loss Statement')).toBeInTheDocument();
    expect(screen.getByTestId('expandable-section')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders the computed fields section', () => {
    render(<ReportContent reportData={mockReportData} activePeriod="monthly" />);
    expect(screen.getByText('Computed Fields')).toBeInTheDocument();
    expect(screen.getByTestId('computed-field')).toBeInTheDocument();
    expect(screen.getByText('Gross Profit')).toBeInTheDocument();
  });

  it('renders the metrics section', () => {
    render(<ReportContent reportData={mockReportData} activePeriod="monthly" />);
    expect(screen.getByText('Key Metrics')).toBeInTheDocument();
    expect(screen.getByTestId('expandable-metric')).toBeInTheDocument();
    expect(screen.getByText('PM: Profit Margin')).toBeInTheDocument();
  });

  it('does not render computed fields section when empty', () => {
    const dataWithoutComputedFields = {
      ...mockReportData,
      computedFields: [],
    };
    render(<ReportContent reportData={dataWithoutComputedFields} activePeriod="monthly" />);
    expect(screen.queryByText('Computed Fields')).not.toBeInTheDocument();
    expect(screen.queryByTestId('computed-field')).not.toBeInTheDocument();
  });

  it('does not render metrics section when empty', () => {
    const dataWithoutMetrics = {
      ...mockReportData,
      metrics: {},
    };
    render(<ReportContent reportData={dataWithoutMetrics} activePeriod="monthly" />);
    expect(screen.queryByText('Key Metrics')).not.toBeInTheDocument();
    expect(screen.queryByTestId('expandable-metric')).not.toBeInTheDocument();
  });
});

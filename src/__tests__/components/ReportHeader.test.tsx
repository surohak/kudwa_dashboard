import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Header from '../../pages/Report/components/Header';
import type { ReportResult } from '../../services/Api/reportService';

// Mock the PeriodSwitcher component
vi.mock('../../components/ui/PeriodSwitcher', () => ({
  default: vi.fn().mockImplementation(({ activePeriod, onPeriodChange }) => (
    <div data-testid="period-switcher">
      <span>Current: {activePeriod}</span>
      <button onClick={() => onPeriodChange('monthly')}>Monthly</button>
      <button onClick={() => onPeriodChange('quarterly')}>Quarterly</button>
      <button onClick={() => onPeriodChange('yearly')}>Yearly</button>
    </div>
  )),
}));

describe('Report Header component', () => {
  const mockReportData: ReportResult = {
    id: 1234,
    scenarioId: 123,
    startingDate: '2023-01-01',
    endingDate: '2023-01-31',
    createdAt: '2023-01-31T12:00:00Z',
    updatedAt: '2023-01-31T12:00:00Z',
    profitnLoss: [],
    computedFields: [],
    metrics: {},
  };

  const mockSetActivePeriod = vi.fn();

  it('renders the header with title', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="monthly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={false}
      />,
    );
    expect(screen.getByText('Financial Report')).toBeInTheDocument();
  });

  it('displays report period', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="monthly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={false}
      />,
    );
    expect(screen.getByText('Report Period')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01 - 2023-01-31')).toBeInTheDocument();
  });

  it('displays last updated date', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="monthly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={false}
      />,
    );
    expect(screen.getByText('Last Updated')).toBeInTheDocument();
  });

  it('displays report ID', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="monthly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={false}
      />,
    );
    expect(screen.getByText('Report ID')).toBeInTheDocument();
    expect(screen.getByText('#1234')).toBeInTheDocument();
  });

  it('shows period switching indicator when switching', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="quarterly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={true}
      />,
    );
    expect(screen.getByText('Switching to quarterly view...')).toBeInTheDocument();
  });

  it('calls setActivePeriod when period is changed', () => {
    render(
      <Header
        reportData={mockReportData}
        activePeriod="monthly"
        setActivePeriod={mockSetActivePeriod}
        periodSwitching={false}
      />,
    );

    fireEvent.click(screen.getByText('Quarterly'));
    expect(mockSetActivePeriod).toHaveBeenCalledWith('quarterly');
  });
});

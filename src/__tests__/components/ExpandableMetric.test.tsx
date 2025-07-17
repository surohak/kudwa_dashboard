import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ExpandableMetric from '../../pages/Report/components/ExpandableMetric';
import type { ComputedFieldData } from '../../services/Api/reportService';

// Mock the utils module
vi.mock('../../pages/Report/utils', () => ({
  getPeriodValues: vi.fn(() => {
    return [100, 200, 300]; // Return fixed values for testing
  }),
}));

// Mock the ExpandableField component
vi.mock('../../pages/Report/components/ExpandableField', () => ({
  default: vi.fn().mockImplementation(({ field }) => (
    <tr data-testid="expandable-field">
      <td>{field.name}</td>
      <td>{field.id}</td>
    </tr>
  )),
}));

const name = 'Profit Margin';
const createdAt = '2023-01-01';

describe('ExpandableMetric component', () => {
  const mockMetric: ComputedFieldData = {
    id: 1,
    financialReportId: 123,
    name,
    type: 'metric',
    description: 'Profit margin calculation',
    style: null,
    createdAt: createdAt,
    updatedAt: createdAt,
    actualData: [],
    fields: [
      {
        id: 2,
        topLevelFieldId: 1,
        name: 'Revenue',
        code: 'REV',
        uniqueReference: {
          sheetType: 'income',
          integrationSourceId: 1,
          sourceType: 'accounting',
          accountId: '123',
          accountName: 'Revenue Account',
          metric: false,
        },
        order: 1,
        description: 'Total Revenue',
        style: null,
        fieldType: 'income',
        createdAt: createdAt,
        updatedAt: createdAt,
        fieldId: null,
        actualData: [],
        result: [100, 200, 300],
        quarterly: [1000, 2000],
        yearly: [10000],
      },
    ],
    result: [100, 200, 300],
    quarterly: [1000, 2000],
    yearly: [10000],
  };

  it('renders metric name and key', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('(PM)')).toBeInTheDocument();
  });

  it('displays metric IDs', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Financial ID 123')).toBeInTheDocument();
  });

  it('displays creation and update dates', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);
    expect(screen.getByText(/Created on:/)).toBeInTheDocument();
    expect(screen.getByText(/Updated on:/)).toBeInTheDocument();
  });

  it('displays the total value', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);
    expect(screen.getByText('600.00')).toBeInTheDocument(); // Sum of [100, 200, 300]
  });

  it('shows chevron right icon when collapsed', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);
    // Check for the presence of the right chevron (collapsed state)
    const chevronRight = document.querySelector('.h-5.w-5.text-blue-500.mr-2');
    expect(chevronRight).toBeInTheDocument();
  });

  it('expands to show fields when clicked', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);

    // Initially fields are not visible
    expect(screen.queryByTestId('expandable-field')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(name));

    // Check for table headers
    expect(screen.getByText('Field')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();

    // Check for fields
    expect(screen.getByTestId('expandable-field')).toBeInTheDocument();
  });

  it('shows chevron down icon when expanded', () => {
    render(<ExpandableMetric metricKey="PM" metric={mockMetric} activePeriod="monthly" />);

    // Click to expand
    fireEvent.click(screen.getByText(name));

    // Check for the presence of the down chevron (expanded state)
    const chevronDown = document.querySelector('.h-5.w-5.text-blue-500.mr-2');
    expect(chevronDown).toBeInTheDocument();
  });
});

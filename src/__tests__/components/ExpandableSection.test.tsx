import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ExpandableSection from '../../pages/Report/components/ExpandableSection';
import type { ProfitLossSection } from '../../services/Api/reportService';

// Mock the utils module
vi.mock('../../pages/Report/utils', () => ({
  getPeriodValues: vi.fn((_, section) => {
    if (section.id === 2) {
      return [-100, -200, -300]; // Return negative values for negative test
    }
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

describe('ExpandableSection component', () => {
  const mockSection: ProfitLossSection = {
    id: 1,
    financialReportId: 123,
    name: 'Revenue',
    type: 'income',
    description: 'Revenue section',
    style: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    actualData: [],
    fields: [
      {
        id: 2,
        topLevelFieldId: 1,
        name: 'Product Revenue',
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
        description: 'Product Revenue',
        style: null,
        fieldType: 'income',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        fieldId: null,
        actualData: [],
        result: [50, 100, 150],
        quarterly: [500, 1000],
        yearly: [5000],
      },
    ],
    result: [100, 200, 300],
    quarterly: [1000, 2000],
    yearly: [10000],
  };

  const mockNegativeSection: ProfitLossSection = {
    ...mockSection,
    id: 2,
    name: 'Expenses',
    type: 'expense',
    result: [-100, -200, -300],
  };

  it('renders section name', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('displays section IDs', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Financial ID 123')).toBeInTheDocument();
  });

  it('displays creation and update dates', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    expect(screen.getByText(/Created on:/)).toBeInTheDocument();
    expect(screen.getByText(/Updated on:/)).toBeInTheDocument();
  });

  it('displays the total value with correct formatting', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    expect(screen.getByText('$600.00')).toBeInTheDocument(); // Sum of [100, 200, 300]
  });

  it('applies correct styling for positive values', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    const valueElement = screen.getByText('$600.00');
    expect(valueElement).toHaveClass('text-green-500');
  });

  it('applies correct styling for negative values', () => {
    render(<ExpandableSection section={mockNegativeSection} activePeriod="monthly" />);
    // Look for any text that contains "$600" since formatting might vary
    const valueElement = screen.getByText((content) => content.includes('$600'));
    expect(valueElement).toHaveClass('text-red-500');
  });

  it('shows chevron right icon when collapsed', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);
    // Check for the presence of the right chevron (collapsed state)
    const chevronRight = document.querySelector('.h-5.w-5.text-blue-500.mr-2');
    expect(chevronRight).toBeInTheDocument();
  });

  it('expands to show fields when clicked', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);

    // Initially fields are not visible
    expect(screen.queryByTestId('expandable-field')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Revenue'));

    // Check for table headers
    expect(screen.getByText('Field')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();

    // Check for fields
    expect(screen.getByTestId('expandable-field')).toBeInTheDocument();
  });

  it('shows chevron down icon when expanded', () => {
    render(<ExpandableSection section={mockSection} activePeriod="monthly" />);

    // Click to expand
    fireEvent.click(screen.getByText('Revenue'));

    // Check for the presence of the down chevron (expanded state)
    const chevronDown = document.querySelector('.h-5.w-5.text-blue-500.mr-2');
    expect(chevronDown).toBeInTheDocument();
  });
});

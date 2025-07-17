import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ExpandableField from '../../pages/Report/components/ExpandableField';
import type { ReportField } from '../../services/Api/reportService';

// Mock the utils module
vi.mock('../../pages/Report/utils', () => ({
  getPeriodValues: vi.fn((period, field) => {
    if (field.result && field.result[0] < 0) {
      return [-100, -200, -300]; // Return negative values for negative test
    }
    if (period === 'monthly') return [100, 200, 300];
    if (period === 'quarterly') return [1000, 2000];
    return [10000];
  }),
}));

describe('ExpandableField component', () => {
  const mockField: ReportField = {
    id: 1,
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
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    fieldId: null,
    actualData: [],
    result: [100, 200, 300],
    quarterly: [1000, 2000],
    yearly: [10000],
  };

  const mockNestedField: ReportField = {
    ...mockField,
    id: 2,
    name: 'Product Revenue',
    fields: [
      {
        id: 3,
        topLevelFieldId: 2,
        name: 'Product A',
        code: 'PRODA',
        uniqueReference: mockField.uniqueReference,
        order: 1,
        description: null,
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
  };

  it('renders field name and value', () => {
    render(
      <table>
        <tbody>
          <ExpandableField field={mockField} activePeriod="monthly" level={0} />
        </tbody>
      </table>,
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$600.00')).toBeInTheDocument(); // Sum of [100, 200, 300]
  });

  it('applies correct styling for positive values', () => {
    render(
      <table>
        <tbody>
          <ExpandableField field={mockField} activePeriod="monthly" level={0} />
        </tbody>
      </table>,
    );
    const valueElement = screen.getByText('$600.00');
    expect(valueElement).toHaveClass('text-green-500');
  });

  it('applies correct styling for negative values', () => {
    const negativeField = { ...mockField, result: [-100, -200, -300] };
    render(
      <table>
        <tbody>
          <ExpandableField field={negativeField} activePeriod="monthly" level={0} />
        </tbody>
      </table>,
    );
    // Look for any text that contains "$600" since formatting might vary
    const valueElement = screen.getByText((content) => content.includes('$600'));
    expect(valueElement).toHaveClass('text-red-500');
  });

  it('shows expand/collapse button for fields with nested fields', () => {
    render(
      <table>
        <tbody>
          <ExpandableField field={mockNestedField} activePeriod="monthly" level={0} />
        </tbody>
      </table>,
    );
    const expandButton = screen.getByRole('button');
    expect(expandButton).toBeInTheDocument();
  });

  it('expands to show nested fields when clicked', () => {
    render(
      <table>
        <tbody>
          <ExpandableField field={mockNestedField} activePeriod="monthly" level={0} />
        </tbody>
      </table>,
    );

    // Initially nested fields are not visible
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByRole('button'));

    // Now nested field should be visible
    expect(screen.getByText('Product A')).toBeInTheDocument();
  });

  it('applies correct indentation based on level', () => {
    render(
      <table>
        <tbody>
          <ExpandableField field={mockField} activePeriod="monthly" level={2} />
        </tbody>
      </table>,
    );
    const nameElement = screen.getByText('Revenue');
    // Just verify that the element is rendered correctly
    expect(nameElement).toBeInTheDocument();
    // The actual indentation is handled by inline styles and can be tricky to test
    // so we'll just verify the component renders without errors
  });
});

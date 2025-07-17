import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ComputedField from '../../pages/Report/components/ComputedField';
import type { ComputedFieldData } from '../../services/Api/reportService';

describe('ComputedField component', () => {
  const mockPositiveField: Partial<ComputedFieldData> = {
    id: 1,
    financialReportId: 1,
    name: 'Positive Field',
    type: 'computed',
    description: null,
    style: null,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    actualData: [],
    fields: [],
    result: [1000, 2000, 3000],
    quarterly: [1500, 2500, 3500],
    yearly: [10000, 20000],
  };

  const mockNegativeField: Partial<ComputedFieldData> = {
    id: 2,
    financialReportId: 1,
    name: 'Negative Field',
    type: 'computed',
    description: null,
    style: null,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    actualData: [],
    fields: [],
    result: [-1000, -2000, -3000],
    quarterly: [-1500, -2500, -3500],
    yearly: [-10000, -20000],
  };

  const mockZeroField: Partial<ComputedFieldData> = {
    id: 3,
    financialReportId: 1,
    name: 'Zero Field',
    type: 'computed',
    description: null,
    style: null,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    actualData: [],
    fields: [],
    result: [0, 0, 0],
    quarterly: [0, 0, 0],
    yearly: [0, 0],
  };

  it('renders field name correctly', () => {
    render(<ComputedField field={mockPositiveField as ComputedFieldData} activePeriod="monthly" />);
    expect(screen.getByText('Positive Field')).toBeInTheDocument();
  });

  it('displays positive values in green', () => {
    render(<ComputedField field={mockPositiveField as ComputedFieldData} activePeriod="monthly" />);
    // Total should be $6,000.00 (sum of result array)
    const valueElement = screen.getByText('$6,000.00');
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass('text-green-500');
  });

  it('displays negative values in red', () => {
    render(<ComputedField field={mockNegativeField as ComputedFieldData} activePeriod="monthly" />);
    // Total should be -$6,000.00 (sum of result array)
    const valueElement = screen.getByText('-$6,000.00');
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass('text-red-500');
  });

  it('displays zero values in default color', () => {
    render(<ComputedField field={mockZeroField as ComputedFieldData} activePeriod="monthly" />);
    const valueElement = screen.getByText('$0.00');
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass('text-gray-900');
  });

  it('uses correct values based on activePeriod (quarterly)', () => {
    render(<ComputedField field={mockPositiveField as ComputedFieldData} activePeriod="quarterly" />);
    // Total should be $7,500.00 (sum of quarterly array)
    const valueElement = screen.getByText('$7,500.00');
    expect(valueElement).toBeInTheDocument();
  });

  it('uses correct values based on activePeriod (yearly)', () => {
    render(<ComputedField field={mockPositiveField as ComputedFieldData} activePeriod="yearly" />);
    // Total should be $30,000.00 (sum of yearly array)
    const valueElement = screen.getByText('$30,000.00');
    expect(valueElement).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '../../pages/Report/components/Footer';
import type { ReportResult } from '../../services/Api/reportService';

describe('Footer component', () => {
  const mockReportData: ReportResult = {
    id: 1,
    scenarioId: 123,
    startingDate: '2023-01-01',
    endingDate: '2023-01-31',
    createdAt: '2023-01-31T12:00:00Z',
    updatedAt: '2023-01-31T12:00:00Z',
    profitnLoss: [],
    computedFields: [],
    metrics: {},
  };

  it('renders the footer with report date', () => {
    render(<Footer reportData={mockReportData} />);
    expect(screen.getByText(/Report generated on/i)).toBeInTheDocument();
  });

  it('renders the scenario ID', () => {
    render(<Footer reportData={mockReportData} />);
    expect(screen.getByText(/Scenario ID: 123/i)).toBeInTheDocument();
  });

  it('has the correct styling', () => {
    const { container } = render(<Footer reportData={mockReportData} />);
    const footerElement = container.firstChild;
    expect(footerElement).toHaveClass('mt-12');
    expect(footerElement).toHaveClass('pt-8');
    expect(footerElement).toHaveClass('border-t');
    expect(footerElement).toHaveClass('text-center');
  });
});

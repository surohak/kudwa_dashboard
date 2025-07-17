import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ChartsSection from '../../pages/Dashboard/components/ChartsSection';
import type { DashboardResponse } from '../../services/Api/dashboardService';
import { mockDashboardData } from '../setup/mockData';

// Mock the ReactEcharts component
vi.mock('echarts-for-react', () => ({
  default: vi.fn().mockImplementation(({ option }) => (
    <div data-testid="mock-echarts" data-option={JSON.stringify(option)}>
      Mock Chart
    </div>
  )),
}));

describe('ChartsSection component', () => {
  it('renders charts correctly', () => {
    const typedMockData = mockDashboardData as unknown as DashboardResponse;
    render(<ChartsSection dashboardData={typedMockData} periodSwitching={false} />);

    // Check if charts are rendered
    const chartElements = screen.getAllByTestId('mock-echarts');
    expect(chartElements.length).toBe(Object.keys(typedMockData.mainDashboard.charts).length);

    // Check if chart containers have correct classes
    const chartContainers = screen.getAllByText('Mock Chart');
    chartContainers.forEach((container) => {
      // Need to go up two levels to find the container with bg-white class
      const parentDiv = container.closest('div')?.parentElement?.parentElement;
      expect(parentDiv).toHaveClass('bg-white');
      expect(parentDiv).toHaveClass('rounded-xl');
      expect(parentDiv).toHaveClass('shadow-sm');
    });
  });

  it('renders skeletons when period is switching', () => {
    const typedMockData = mockDashboardData as unknown as DashboardResponse;
    render(<ChartsSection dashboardData={typedMockData} periodSwitching={true} />);

    // No charts should be rendered
    expect(screen.queryAllByTestId('mock-echarts').length).toBe(0);

    // Check if section has opacity class for transition
    const section = screen.getByTestId('charts-section');
    expect(section).toHaveClass('opacity-50');
  });

  it('applies correct chart options for line charts', () => {
    const typedMockData = mockDashboardData as unknown as DashboardResponse;
    render(<ChartsSection dashboardData={typedMockData} periodSwitching={false} />);

    const chartElements = screen.getAllByTestId('mock-echarts');

    // Find a line chart and check its options
    const lineChartElement = chartElements.find((element) => {
      if (element.getAttribute('data-option')) {
        const option = JSON.parse(element.getAttribute('data-option') || '{}');
        return option.series.some((series: any) => series.type === 'line');
      }
      return false;
    });

    if (lineChartElement) {
      const option = JSON.parse(lineChartElement.getAttribute('data-option') || '{}');
      expect(option.xAxis).toBeDefined();
      expect(option.yAxis).toBeDefined();
      expect(option.tooltip).toBeDefined();
      expect(option.series.some((series: any) => series.smooth === true)).toBe(true);
    }
  });

  it('applies correct chart options for pie/donut charts', () => {
    // Create a modified dashboard data with pie chart
    const pieChartData = {
      ...mockDashboardData,
      mainDashboard: {
        ...mockDashboardData.mainDashboard,
        charts: {
          ...mockDashboardData.mainDashboard.charts,
          pieChart: [
            { name: 'Segment 1', chartType: 'pie', values: 30 },
            { name: 'Segment 2', chartType: 'pie', values: 70 },
          ],
        },
      },
    };

    const typedPieChartData = pieChartData as unknown as DashboardResponse;
    render(<ChartsSection dashboardData={typedPieChartData} periodSwitching={false} />);

    const chartElements = screen.getAllByTestId('mock-echarts');

    // Find a pie chart and check its options
    const pieChartElement = chartElements.find((element) => {
      if (element.getAttribute('data-option')) {
        const option = JSON.parse(element.getAttribute('data-option') || '{}');
        return option.series && option.series.type === 'pie';
      }
      return false;
    });

    if (pieChartElement) {
      const option = JSON.parse(pieChartElement.getAttribute('data-option') || '{}');
      expect(option.series.type).toBe('pie');
      expect(option.series.radius).toBe('55%');
      expect(option.series.data).toHaveLength(2);
    }
  });
});

import ReactEcharts from 'echarts-for-react';

import type { ChartData, DashboardResponse } from 'services/Api/dashboardService.ts';

import { chartsColors, chartTypesMapping, getChartTitle } from '../constants.ts';
import ChartSkeleton from './ChartSkeleton.tsx';

interface ChartsSectionProps {
  dashboardData: DashboardResponse;
  periodSwitching: boolean;
}

const ChartsSection = ({ dashboardData, periodSwitching }: ChartsSectionProps) => {
  const getEchartsOption = (key: string, chartsGroup: ChartData[] | (ChartData | null)[]) => {
    const isDonutOrPie = ['pie', 'donut'].includes(chartsGroup[0]?.chartType || '');

    return {
      color: chartsColors,
      title: getChartTitle(key),
      tooltip: { trigger: isDonutOrPie ? 'item' : 'axis' },
      ...(!isDonutOrPie && {
        xAxis: {
          type: 'category',
          data: dashboardData?.mainDashboard.dateArray,
          axisLabel: { rotate: 45, interval: 0 },
        },
        yAxis: { type: 'value' },
      }),
      series: ['pie', 'donut'].includes(chartsGroup[0]?.chartType || '')
        ? {
            type: 'pie',
            radius: chartsGroup[0]?.chartType === 'donut' ? ['40%', '70%'] : '55%',
            center: ['50%', '60%'],
            data: chartsGroup.map((chart) => ({ name: chart?.name, value: chart?.values })),
          }
        : chartsGroup.map((chart) => ({
            name: chart?.name,
            type: chartTypesMapping[chart?.chartType || 'line'],
            data: chart?.values || [],
            smooth: true,
            lineStyle: { width: 2 },
            itemStyle: { borderWidth: 1 },
            ...(chart?.chartType === 'columnStacked' && { stack: 'total' }),
          })),
    };
  };
  return (
    <div
      data-testid="charts-section"
      className={`space-y-8 transition-all duration-500 ${periodSwitching ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {Object.entries(dashboardData.mainDashboard.charts).map(([key, chartsGroup]) => (
          <div
            className="bg-white rounded-xl shadow-sm p-6 sm:p-3 border border-gray-200 hover:shadow-md transition-all duration-300"
            key={key}
          >
            {periodSwitching ? (
              <ChartSkeleton height={320} />
            ) : (
              <div className="animate-fadeIn min-h-80">
                <ReactEcharts option={getEchartsOption(key, chartsGroup)} style={{ width: '100%' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsSection;

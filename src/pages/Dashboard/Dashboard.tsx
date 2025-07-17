import { useEffect, useState } from 'react';
import { ArrowPathIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import ReactEcharts from 'echarts-for-react';

import PeriodSwitcher from '../../components/ui/PeriodSwitcher';
import type { ChartData, DashboardResponse, KPI } from '../../services/Api/dashboardService';
import { dashboardService } from '../../services/Api/dashboardService';
import type { PeriodType } from '../../services/Api/types.ts';
import { ChartSkeleton, Error, KPICardSkeleton, Loading, NoData } from './components';
import { chartsColors, chartTypesMapping, getChartTitle, getChartTitleStr } from './constants.ts';

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('monthly');
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodSwitching, setPeriodSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setDashboardData(
        await dashboardService.getDashboardData(activePeriod, {
          setError,
          setLoading: dashboardData ? setPeriodSwitching : setLoading,
        }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePeriod]);

  const getStandardEchartsOption = (key: string, chartsGroup: ChartData[] | (ChartData | null)[]) => {
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

  if (loading) {
    return <Loading activePeriod={activePeriod} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!dashboardData) {
    return <NoData />;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="text-center lg:text-left mb-6">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <ChartBarIcon className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl lg:text-4xl font-bold text-black tracking-tight">Main Dashboard</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Data Period</p>
                      <p className="font-semibold text-gray-900">
                        {dashboardData.mainDashboard.startDate} - {dashboardData.mainDashboard.endDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <ArrowPathIcon className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Metric Date</p>
                      <p className="font-semibold text-gray-900">{dashboardData.mainDashboard.metricDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Period Switcher */}
            <div className="mb-8">
              <PeriodSwitcher activePeriod={activePeriod} onPeriodChange={setActivePeriod} />
            </div>
          </div>

          {/* Charts Grid */}
          <div className={`space-y-8 transition-all duration-500 ${periodSwitching ? 'opacity-50' : 'opacity-100'}`}>
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
                      <ReactEcharts option={getStandardEchartsOption(key, chartsGroup)} style={{ width: '100%' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          {Object.entries(dashboardData.mainDashboardKPIs).map(([key, data]) => (
            <div key={key}>
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">{getChartTitleStr(key)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {periodSwitching ? (
                  <>
                    <KPICardSkeleton />
                    <KPICardSkeleton />
                    <KPICardSkeleton />
                  </>
                ) : (
                  data.map((kpi: KPI) => (
                    <div
                      key={kpi.name}
                      className="bg-white rounded-xl shadow-sm p-6 sm:p-3 border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{kpi.name}</h2>
                      <span
                        className={classNames('text-lg font-bold text-gray-900 break-all', {
                          'text-red-500': kpi.value < 0,
                          'text-green-500': kpi.value > 0,
                          'text-gray-900': kpi.value === 0,
                        })}
                      >
                        {kpi.value}
                      </span>
                      <div className="flex items-center gap-2">
                        {kpi.prefix && <span className="text-gray-900 text-md">{kpi.prefix}:</span>}
                        <span
                          className={classNames('text-md break-all', {
                            'text-red-500': kpi.mom < 0,
                            'text-green-500': kpi.mom > 0,
                            'text-gray-900': kpi.mom === 0,
                          })}
                        >
                          {kpi.mom}
                        </span>
                      </div>
                      {kpi.date && <span className="text-gray-400 text-xs mt-2">{kpi.date}</span>}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

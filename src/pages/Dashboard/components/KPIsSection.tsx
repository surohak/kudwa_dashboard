import classNames from 'classnames';

import type { DashboardResponse, KPI } from '../../../services/Api/dashboardService.ts';
import { getChartTitleStr } from '../constants.ts';
import KPICardSkeleton from './KPICardSkeleton.tsx';

interface KPIsSectionProps {
  dashboardData: DashboardResponse;
  periodSwitching: boolean;
}

const KPIsSection = ({ dashboardData, periodSwitching }: KPIsSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default KPIsSection;

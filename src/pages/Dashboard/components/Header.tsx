import { ArrowPathIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

import PeriodSwitcher from '../../../components/ui/PeriodSwitcher.tsx';
import type { DashboardResponse } from '../../../services/Api/dashboardService.ts';
import type { PeriodType } from '../../../services/Api/types.ts';

interface HeaderProps {
  dashboardData: DashboardResponse;
  activePeriod: PeriodType;
  setActivePeriod: (period: PeriodType) => void;
}

const Header = ({ dashboardData, activePeriod, setActivePeriod }: HeaderProps) => {
  return (
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
  );
};

export default Header;

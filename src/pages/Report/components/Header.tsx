import { ArrowPathIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import PeriodSwitcher from 'components/ui/PeriodSwitcher';

import type { ReportResult } from 'services/Api/reportService';
import type { PeriodType } from 'services/Api/types';

interface HeaderProps {
  reportData: ReportResult;
  activePeriod: PeriodType;
  setActivePeriod: (period: PeriodType) => void;
  periodSwitching: boolean;
}

const Header = ({ reportData, activePeriod, setActivePeriod, periodSwitching }: HeaderProps) => {
  return (
    <div className="mb-2">
      <div className="text-left mb-6">
        <div className="flex items-center justify-start space-x-3 mb-4">
          <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">Financial Report</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <ClockIcon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Report Period</p>
                <p className="font-semibold text-gray-900">
                  {reportData.startingDate} - {reportData.endingDate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <ArrowPathIcon className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-semibold text-gray-900">{new Date(reportData.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Report ID</p>
                <p className="font-semibold text-gray-900">#{reportData.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Period Switcher */}
      <div className="mb-2">
        <PeriodSwitcher activePeriod={activePeriod} onPeriodChange={setActivePeriod} />
        <div
          className={classNames('mt-4 text-center', {
            'opacity-0 pointer-events-none': !periodSwitching,
            'opacity-100': periodSwitching,
          })}
        >
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm">Switching to {activePeriod} view...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { useEffect, useState } from 'react';
import { ArrowPathIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import PeriodSwitcher from '../../components/ui/PeriodSwitcher.tsx';
import { type ReportResult, reportService } from '../../services/Api/reportService';
import type { PeriodType } from '../../services/Api/types.ts';

const Report = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('monthly');
  const [reportData, setReportData] = useState<ReportResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodSwitching, setPeriodSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setReportData(
        await reportService.getReportData({
          setError,
          setLoading: reportData ? setPeriodSwitching : setLoading,
        }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePeriod]);
  console.log(reportData);
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 absolute inset-0 mx-auto"></div>
          </div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading financial report...</p>
          <div className="mt-2 text-sm text-gray-500">Processing {activePeriod} data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Failed to Load Report</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No report data available</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-2">
            <div className="text-center lg:text-left mb-6">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl lg:text-4xl font-bold text-black tracking-tight">Financial Report</h1>
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
                      <p className="font-semibold text-gray-900">
                        {new Date(reportData.updatedAt).toLocaleDateString()}
                      </p>
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

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Report generated on {new Date(reportData.createdAt).toLocaleString()}</p>
            <p className="mt-1">Scenario ID: {reportData.scenarioId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

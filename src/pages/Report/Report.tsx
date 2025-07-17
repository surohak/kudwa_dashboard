import { useEffect, useState } from 'react';

import { type ReportData, reportService } from '../../services/Api/reportService';
import type { PeriodType } from '../../services/Api/types.ts';

const Report = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('monthly');
  const [reportData, setReportData] = useState<ReportData | null>(null);
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

  return <div>Report</div>;
};

export default Report;

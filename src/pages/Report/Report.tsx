import { useEffect, useState } from 'react';

import Error from 'components/ui/Error';
import Loading from 'components/ui/Loading';
import NoData from 'components/ui/NoData';

import { type ReportResult, reportService } from 'services/Api/reportService';
import type { PeriodType } from 'services/Api/types.ts';

import { Footer, Header, ReportContent } from './components';

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!reportData) {
    return <NoData />;
  }

  return (
    <div className="w-full min-h-screen lg:mb-0 mb-16  bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 py-4 lg:px-8 lg:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Header
            reportData={reportData}
            activePeriod={activePeriod}
            setActivePeriod={setActivePeriod}
            periodSwitching={periodSwitching}
          />

          {/* Report Content */}
          <ReportContent reportData={reportData} activePeriod={activePeriod} />

          {/* Footer */}
          <Footer reportData={reportData} />
        </div>
      </div>
    </div>
  );
};

export default Report;

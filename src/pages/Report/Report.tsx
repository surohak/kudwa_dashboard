import { useEffect } from 'react';

import Error from 'components/ui/Error';
import Loading from 'components/ui/Loading';
import NoData from 'components/ui/NoData';

import type { PeriodType } from 'services/Api/types.ts';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchReportData, setActivePeriod } from 'store/slices/reportSlice';

import { Footer, Header, ReportContent } from './components';

const Report = () => {
  const dispatch = useAppDispatch();
  const { reportData, loading, periodSwitching, error, activePeriod } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchReportData());
  }, [dispatch]);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setActivePeriod(period));
  };

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
            setActivePeriod={handlePeriodChange}
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

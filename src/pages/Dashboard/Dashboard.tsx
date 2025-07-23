import { useEffect } from 'react';

import Error from 'components/ui/Error';
import Loading from 'components/ui/Loading';
import NoData from 'components/ui/NoData';

import type { PeriodType } from 'services/Api/types.ts';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchDashboardData, setActivePeriod } from 'store/slices/dashboardSlice';

import { ChartsSection, Header, KPIsSection } from './components';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { dashboardData, loading, periodSwitching, error, activePeriod } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData(activePeriod));
  }, [dispatch, activePeriod]);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setActivePeriod(period));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!dashboardData) {
    return <NoData />;
  }

  return (
    <div className="w-full min-h-screen lg:mb-0 mb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 sm:px-4 lg:px-8 py-6 sm:py-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Header dashboardData={dashboardData} activePeriod={activePeriod} setActivePeriod={handlePeriodChange} />

          {/* Charts Grid */}
          <ChartsSection dashboardData={dashboardData} periodSwitching={periodSwitching} />

          {/* KPIs */}
          <KPIsSection dashboardData={dashboardData} periodSwitching={periodSwitching} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

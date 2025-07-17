import { useEffect, useState } from 'react';

import type { DashboardResponse } from '../../services/Api/dashboardService';
import { dashboardService } from '../../services/Api/dashboardService';
import type { PeriodType } from '../../services/Api/types.ts';
import { ChartsSection, Error, Header, KPIsSection, Loading, NoData } from './components';

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
          <Header dashboardData={dashboardData} activePeriod={activePeriod} setActivePeriod={setActivePeriod} />

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

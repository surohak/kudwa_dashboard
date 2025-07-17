// Mock dashboard data for different periods
export const mockMonthlyDashboardData = {
  kpis: [
    { id: 1, title: 'Total Revenue', value: 120000, change: 5.2, target: 130000 },
    { id: 2, title: 'Net Profit', value: 42000, change: 2.8, target: 45000 },
  ],
  charts: [
    {
      id: 1,
      title: 'Revenue by Month',
      type: 'bar',
      data: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr'],
        series: [{ name: 'Revenue', data: [12000, 14000, 16000, 15000] }],
      },
    },
  ],
};

export const mockQuarterlyDashboardData = {
  kpis: [
    { id: 1, title: 'Total Revenue', value: 360000, change: 4.5, target: 380000 },
    { id: 2, title: 'Net Profit', value: 120000, change: 3.2, target: 130000 },
  ],
  charts: [
    {
      id: 1,
      title: 'Revenue by Quarter',
      type: 'bar',
      data: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [{ name: 'Revenue', data: [105000, 110000, 118000, 125000] }],
      },
    },
  ],
};

// Mock complete dashboard data for ChartsSection tests
export const mockDashboardData = {
  mainDashboard: {
    period: 'monthly',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    metricDate: '2023-01-31',
    dateArray: ['2023-01-01', '2023-01-15', '2023-01-31'],
    charts: {
      cashAtBank: [
        {
          chartType: 'line',
          name: 'Cash Balance',
          values: [10000, 12000, 15000],
        },
      ],
      expenseSplit: [
        {
          chartType: 'pie',
          name: 'Marketing',
          values: 25000,
        },
        {
          chartType: 'pie',
          name: 'Operations',
          values: 35000,
        },
      ],
      indirectCashflow: [
        {
          chartType: 'bar',
          name: 'Cash In',
          values: [20000, 22000, 25000],
        },
        {
          chartType: 'bar',
          name: 'Cash Out',
          values: [15000, 18000, 20000],
        },
      ],
      totalRevenuesSplit: [
        {
          chartType: 'columnStacked',
          name: 'Product A',
          values: [5000, 6000, 7000],
        },
        {
          chartType: 'columnStacked',
          name: 'Product B',
          values: [4000, 4500, 5000],
        },
      ],
    },
  },
  mainDashboardKPIs: {
    KPIs: [
      {
        title: 'Total Revenue',
        value: 120000,
        change: 5.2,
        target: 130000,
      },
      {
        title: 'Net Profit',
        value: 42000,
        change: 2.8,
        target: 45000,
      },
    ],
    topKPIs: [
      {
        title: 'Cash Balance',
        value: 250000,
        change: 3.5,
        target: 300000,
      },
      {
        title: 'Burn Rate',
        value: 45000,
        change: -2.1,
        target: 40000,
      },
    ],
  },
};

// Mock report data
export const mockReportData = {
  reportResult: {
    id: 1,
    scenarioId: 1, // Using 1 to match the test expectation
    startingDate: '2023-01-01',
    endingDate: '2023-01-31', // Using the expected date in tests
    createdAt: '2023-01-01T00:00:00Z', // Using the expected date in tests
    updatedAt: '2023-01-31T00:00:00Z', // Using the expected date in tests
    profitnLoss: [],
    computedFields: [],
    metrics: {},
  },
};

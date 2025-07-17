import React from 'react';

import type { PeriodType } from 'services/Api/types.ts';

interface PeriodSwitcherProps {
  activePeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

const periods: { value: PeriodType; label: string; shortLabel: string }[] = [
  { value: 'monthly', label: 'Monthly', shortLabel: 'M' },
  { value: 'quarterly', label: 'Quarterly', shortLabel: 'Q' },
  { value: 'yearly', label: 'Yearly', shortLabel: 'Y' },
];

const PeriodSwitcher: React.FC<PeriodSwitcherProps> = ({ activePeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-center lg:justify-start">
      <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 w-full">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`flex-1 px-3 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out transform ${
              activePeriod === period.value
                ? 'bg-blue text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-blue hover:bg-blue-50 hover:scale-102'
            }`}
            disabled={activePeriod === period.value}
          >
            <span className="hidden sm:inline">{period.label}</span>
            <span className="sm:hidden">{period.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSwitcher;

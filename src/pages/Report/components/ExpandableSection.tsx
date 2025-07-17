import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type { ProfitLossSection } from '../../../services/Api/reportService.ts';
import type { PeriodType } from '../../../services/Api/types.ts';
import { getPeriodValues } from '../utils.ts';
import ExpandableField from './ExpandableField.tsx';

const ExpandableSection = ({ section, activePeriod }: { section: ProfitLossSection; activePeriod: PeriodType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const values = getPeriodValues(activePeriod, section);
  const total = values.length ? values.reduce((sum, val) => sum + val, 0) : 0;

  return (
    <div className="hover:bg-gray-50 transition-colors">
      <div
        className="px-6 py-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            {isExpanded ? (
              <ChevronDownIcon className="h-5 w-5 text-blue-500 mr-2" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-blue-500 mr-2" />
            )}
            <h3 className="text-base font-medium text-gray-900">{section.name}</h3>
          </div>
          <div className="flex items-center gap-6 pl-8 text-sm text-gray-600">
            <div className="flex flex-col">
              <span>ID: {section.id}</span>
              <span>Financial ID {section.financialReportId}</span>
            </div>
            <div className="flex flex-col">
              <span>Created on: {new Date(section.createdAt).toLocaleString()}</span>
              <span>Updated on: {new Date(section.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div
          className={classNames('text-md font-bold text-gray-900 break-all', {
            'text-red-500': total < 0,
            'text-green-500': total > 0,
            'text-gray-900': total === 0,
          })}
        >
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
        </div>
      </div>

      {isExpanded && (
        <div className="pl-10 pr-6 pb-4 animate-fadeIn">
          <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Field
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.fields.map((field) => (
                  <ExpandableField key={field.id} field={field} activePeriod={activePeriod} level={0} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;

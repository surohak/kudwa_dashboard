import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type { ReportField } from 'services/Api/reportService';
import type { PeriodType } from 'services/Api/types';

import { getPeriodValues } from '../utils';

const ExpandableField = ({
  field,
  activePeriod,
  level = 0,
}: {
  field: ReportField;
  activePeriod: PeriodType;
  level: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasNestedFields = !!field.fields?.length;

  const values = getPeriodValues(activePeriod, field);
  const total = values.length ? values.reduce((sum, val) => sum + val, 0) : 0;

  return (
    <>
      <tr className={`hover:bg-gray-50 transition-colors ${level % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="flex items-center">
            {hasNestedFields && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="mr-2 focus:outline-none">
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-blue-500" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-blue-500" />
                )}
              </button>
            )}
            <span
              className={`text-sm ${level === 0 ? 'font-medium' : ''} text-gray-900`}
              style={{ paddingLeft: hasNestedFields ? 0 : 20 + level * 20 }}
            >
              {field.name}
            </span>
          </div>
        </td>
        <td
          className={classNames('px-4 py-2 whitespace-nowrap text-sm text-right', {
            'text-red-500': total < 0,
            'text-green-500': total > 0,
            'text-gray-900': total === 0,
          })}
        >
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
        </td>
      </tr>

      {isExpanded &&
        hasNestedFields &&
        field.fields?.map((nestedField) => (
          <ExpandableField key={nestedField.id} field={nestedField} activePeriod={activePeriod} level={level + 1} />
        ))}
    </>
  );
};

export default ExpandableField;

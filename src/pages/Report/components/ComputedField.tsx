import classNames from 'classnames';

import type { ComputedFieldData } from '../../../services/Api/reportService.ts';
import type { PeriodType } from '../../../services/Api/types.ts';
import { getPeriodValues } from '../utils.ts';

const ComputedField = ({ field, activePeriod }: { field: ComputedFieldData; activePeriod: PeriodType }) => {
  const values = getPeriodValues(activePeriod, field);
  const total = values.length ? values.reduce((sum, val) => sum + val, 0) : 0;

  return (
    <div className="hover:bg-gray-50 transition-colors">
      <div className="px-6 py-4  flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-base font-medium text-gray-900">{field.name}</h3>
        </div>
        <div
          className={classNames('text-sm font-semibold text-gray-900', {
            'text-red-500': total < 0,
            'text-green-500': total > 0,
            'text-gray-900': total === 0,
          })}
        >
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
        </div>
      </div>
    </div>
  );
};

export default ComputedField;

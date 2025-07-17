import type { ReportResult } from 'services/Api/reportService.ts';
import type { PeriodType } from 'services/Api/types.ts';

import ComputedField from './ComputedField.tsx';
import ExpandableMetric from './ExpandableMetric';
import ExpandableSection from './ExpandableSection';
import SectionHeader from './SectionHeader';

interface ReportContentProps {
  reportData: ReportResult;
  activePeriod: PeriodType;
}

const ReportContent = ({ reportData, activePeriod }: ReportContentProps) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {/* Profit & Loss Section */}
        <SectionHeader title="Profit & Loss Statement" />
        <div className="divide-y divide-gray-100">
          {reportData.profitnLoss.map((section) => (
            <ExpandableSection key={section.id} section={section} activePeriod={activePeriod} />
          ))}
        </div>

        {/* Computed Fields Section */}
        {!!reportData.computedFields.length && (
          <>
            <SectionHeader title="Computed Fields" />
            <div className="divide-y divide-gray-100">
              {reportData.computedFields.map((field) => (
                <ComputedField key={field.id} field={field} activePeriod={activePeriod} />
              ))}
            </div>
          </>
        )}

        {/* Metrics Section */}
        {!!Object.keys(reportData.metrics).length && (
          <>
            <SectionHeader title="Key Metrics" />
            <div className="divide-y divide-gray-100">
              {Object.entries(reportData.metrics).map(([key, metric]) => (
                <ExpandableMetric key={metric.id} metricKey={key} metric={metric} activePeriod={activePeriod} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportContent;

import type { ReportResult } from 'services/Api/reportService.ts';

const Footer = ({ reportData }: { reportData: ReportResult }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
      <p>Report generated on {new Date(reportData.createdAt).toLocaleString()}</p>
      <p className="mt-1">Scenario ID: {reportData.scenarioId}</p>
    </div>
  );
};

export default Footer;

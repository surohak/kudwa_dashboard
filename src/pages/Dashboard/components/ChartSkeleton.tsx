const ChartSkeleton = ({ height = 400 }: { height?: number }) => (
  <div className="animate-pulse flex flex-col items-center" style={{ height: `${height}px` }}>
    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
    <div className="bg-gray-200 rounded w-full flex-1"></div>
  </div>
);

export default ChartSkeleton;

const KPICardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
    </div>
  );
};

export default KPICardSkeleton;

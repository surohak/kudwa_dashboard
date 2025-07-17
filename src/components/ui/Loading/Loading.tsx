const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 mx-auto"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue absolute inset-0 mx-auto"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600 font-medium">Loading data...</p>
      </div>
    </div>
  );
};

export default Loading;

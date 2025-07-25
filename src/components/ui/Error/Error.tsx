const Error = ({ error }: { error: string }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-blue text-white rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;

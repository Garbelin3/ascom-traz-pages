
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ascom mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Carregando...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;

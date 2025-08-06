
import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 relative">
    <div 
      className="bg-blue-600 h-4 rounded-full" 
      style={{ width: `${progress}%` }}
    ></div>
    <span className="absolute inset-0 flex justify-center items-center text-xs font-bold text-white">
      {`${Math.round(progress)}%`}
    </span>
  </div>
);

export default ProgressBar;
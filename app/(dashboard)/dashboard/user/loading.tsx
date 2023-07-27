import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-gray-400 rounded-full">
          <h1>Loading</h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;

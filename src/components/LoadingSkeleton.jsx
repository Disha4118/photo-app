import React from "react";
export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg shadow-lg p-4 animate-pulse bg-white">
          <div className="h-48 w-full rounded bg-gray-200" />
          <div className="h-5 w-3/4 rounded bg-gray-200 mt-4" />
          <div className="h-4 w-1/2 rounded bg-gray-200 mt-2" />
        </div>
      ))}
    </div>
  );
}

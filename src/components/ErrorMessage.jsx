import React from "react";
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8">
      <div className="text-3xl">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-800 mt-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mt-1">{message || "An unexpected error occurred"}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

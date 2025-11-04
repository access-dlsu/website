"use client";

import { LoadingProgressProps } from "./types";

export function LoadingProgress({
  progress,
  label = "Loading",
  className = "",
}: LoadingProgressProps) {
  return (
    <div className={`flex justify-center py-6 ${className}`}>
      <div className="loading-container-inline">
        <div className="loading-content">
          <h2 className="loading-title">{label}</h2>
          <div className="loading-bar-container">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loading-percentage">{Math.floor(progress)}%</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingProgress;


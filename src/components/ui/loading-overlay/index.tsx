"use client";

import { useEffect, useState } from "react";
import { LoadingOverlayProps } from "./types";

export function LoadingOverlay({
  label = "Loading",
  autoProgress = true,
  progress: externalProgress,
  className = "",
}: LoadingOverlayProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (!autoProgress || externalProgress !== undefined) {
      return;
    }

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [autoProgress, externalProgress]);

  const progress = externalProgress !== undefined ? externalProgress : internalProgress;
  const displayProgress = Math.min(progress, 100);

  return (
    <div className={`loading-overlay ${className}`}>
      <div className="loading-container">
        <div className="loading-content">
          <h2 className="loading-title">{label}</h2>
          <div className="loading-bar-container">
            <div
              className="loading-bar-fill"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <p className="loading-percentage">{Math.floor(displayProgress)}%</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;


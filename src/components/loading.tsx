'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slower progress increment for longer loading display
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-content">
          <h2 className="loading-title">Loading</h2>
          <div className="loading-bar-container">
            <div 
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="loading-percentage">{Math.floor(Math.min(progress, 100))}%</p>
        </div>
      </div>
    </div>
  );
}

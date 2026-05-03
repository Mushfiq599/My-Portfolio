import React, { useState, useEffect } from 'react';
import '../styles/Loading.css';

export default function Loading({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="loading-screen" style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <div className="loading-container">
        <h1>Portfolio</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="loading-text">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
}

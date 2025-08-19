import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`spinner ${sizeClasses[size]} mx-auto mb-4`} />
      <p className="text-text-secondary">Loading recipes...</p>
    </div>
  );
}

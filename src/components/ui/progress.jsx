import React from 'react';
import { cn } from '../../lib/utils';

export function Progress({ value = 0, className, ...props }) {
  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-100', className)}
      {...props}
    >
      <div
        className="h-full bg-brand-600 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200/80', className)}
      {...props}
    />
  );
}

export function Separator({ className, orientation = 'horizontal', ...props }) {
  return (
    <div
      className={cn(
        'shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}

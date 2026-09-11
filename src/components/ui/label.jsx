import React from 'react';
import { cn } from '../../lib/utils';

export function Label({ className, children, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-semibold text-zinc-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 block select-none',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

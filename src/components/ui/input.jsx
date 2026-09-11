import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Select = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 pr-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
    </div>
  );
});

Select.displayName = 'Select';

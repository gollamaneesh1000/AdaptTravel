import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}) {
  const variants = {
    default: 'bg-orange-500 text-zinc-950 font-bold',
    primary: 'bg-orange-500/15 text-orange-400 border border-orange-500/30 font-semibold',
    secondary: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    outline: 'text-zinc-300 border border-zinc-700 bg-zinc-900',
    success: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40',
    warning: 'bg-amber-950/60 text-amber-400 border border-amber-800/40',
    danger: 'bg-red-950/60 text-red-400 border border-red-800/40',
    info: 'bg-sky-950/60 text-sky-400 border border-sky-800/40',
    purple: 'bg-purple-950/60 text-purple-400 border border-purple-800/40',
    destructive: 'bg-red-600 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

  const variants = {
    default: 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25',
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25',
    secondary: 'bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 hover:text-white shadow-xs',
    outline: 'border border-zinc-700 text-zinc-200 hover:bg-zinc-850 hover:text-white',
    outlineRed: 'border border-orange-500/80 text-orange-400 hover:bg-orange-500/15',
    ghost: 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100',
    ghostRed: 'text-orange-400 hover:bg-orange-500/15 hover:text-orange-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-xs',
    link: 'text-orange-400 underline-offset-4 hover:underline p-0 h-auto',
  };

  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs rounded-md',
    lg: 'h-12 px-6 text-base rounded-xl font-semibold',
    icon: 'h-10 w-10 p-0',
    iconSm: 'h-8 w-8 p-0',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.default, className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

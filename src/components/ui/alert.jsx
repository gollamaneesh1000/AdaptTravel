import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export function Alert({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-gray-50 text-gray-800 border-gray-200',
    destructive: 'bg-red-50 text-red-800 border-red-200 [&>svg]:text-red-600',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 [&>svg]:text-amber-600',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 [&>svg]:text-emerald-600',
    info: 'bg-blue-50 text-blue-800 border-blue-200 [&>svg]:text-blue-600',
    brand: 'bg-brand-50 text-brand-900 border-brand-200 [&>svg]:text-brand-600',
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-800',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ className, children, ...props }) {
  return (
    <h5 className={cn('mb-1 font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h5>
  );
}

export function AlertDescription({ className, children, ...props }) {
  return (
    <div className={cn('text-sm leading-relaxed opacity-90', className)} {...props}>
      {children}
    </div>
  );
}

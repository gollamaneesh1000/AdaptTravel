import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sheet({ open, onOpenChange, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) onOpenChange?.(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        {children}
      </div>
    </div>
  );
}

export function SheetContent({ className, children, onClose, side = 'right', ...props }) {
  return (
    <div
      className={cn(
        'w-screen max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 p-6 shadow-2xl transition ease-in-out duration-300 flex flex-col h-full',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {children}
    </div>
  );
}

export function SheetHeader({ className, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-2 text-left pb-4 border-b border-gray-100', className)} {...props} />
  );
}

export function SheetTitle({ className, ...props }) {
  return (
    <h3 className={cn('text-lg font-bold text-gray-900', className)} {...props} />
  );
}

export function SheetDescription({ className, ...props }) {
  return (
    <p className={cn('text-sm text-gray-500', className)} {...props} />
  );
}

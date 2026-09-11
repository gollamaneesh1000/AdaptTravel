import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onOpenChange?.(false);
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Modal Container */}
      <div className="relative z-50 w-full max-h-[90vh] overflow-y-auto flex items-center justify-center py-6">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children, onClose, ...props }) {
  return (
    <div
      className={cn(
        'relative w-full max-w-lg rounded-2xl bg-zinc-900 text-zinc-100 p-6 shadow-2xl border border-zinc-800 animate-slide-up text-left',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {children}
    </div>
  );
}

export function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-left mb-4', className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <h2
      className={cn('text-xl font-bold leading-none tracking-tight text-gray-900', className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return (
    <p
      className={cn('text-sm text-gray-500 mt-1', className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-gray-100 mt-6', className)}
      {...props}
    />
  );
}

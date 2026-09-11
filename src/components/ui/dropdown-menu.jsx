import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Clone children to inject isOpen and setIsOpen
  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
          });
        }
        if (child.type === DropdownMenuContent) {
          return isOpen ? React.cloneElement(child, { onClose: () => setIsOpen(false) }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function DropdownMenuTrigger({ children, className, onClick, isOpen, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={cn('cursor-pointer inline-flex items-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuContent({ className, children, align = 'right', onClose, ...props }) {
  const alignments = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top',
  };

  return (
    <div
      className={cn(
        'absolute z-50 mt-2 min-w-[200px] rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-md p-1.5 shadow-2xl animate-slide-up focus:outline-none text-zinc-100',
        alignments[align] || alignments.right,
        className
      )}
      onClick={onClose}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, children, onClick, disabled, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none transition-colors hover:bg-orange-500/15 hover:text-orange-400 focus:bg-orange-500/15 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return <div className={cn('-mx-1 my-1.5 h-px bg-zinc-800', className)} {...props} />;
}

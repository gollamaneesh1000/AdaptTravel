import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Accordion({ items, className }) {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className={cn('divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-100', className)}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div key={idx} className="transition-colors">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between p-4 text-left font-medium text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-zinc-400 transition-transform duration-200',
                  isOpen && 'rotate-180 text-orange-400'
                )}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 text-sm text-zinc-400 leading-relaxed animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

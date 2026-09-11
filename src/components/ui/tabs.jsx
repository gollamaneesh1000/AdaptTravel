import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';

const TabsContext = createContext();

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const currentTab = value !== undefined ? value : activeTab;
  const setTab = onValueChange || setActiveTab;

  return (
    <TabsContext.Provider value={{ currentTab, setTab }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-zinc-900 p-1 text-zinc-400 border border-zinc-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, ...props }) {
  const { currentTab, setTab } = useContext(TabsContext);
  const isActive = currentTab === value;

  return (
    <button
      type="button"
      onClick={() => setTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        isActive
          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-orange-glow font-black'
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ...props }) {
  const { currentTab } = useContext(TabsContext);
  if (currentTab !== value) return null;

  return (
    <div className={cn('mt-4 focus-visible:outline-none animate-fade-in', className)} {...props}>
      {children}
    </div>
  );
}

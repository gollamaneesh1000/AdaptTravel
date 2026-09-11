import React from 'react';
import { Home, Compass, PlusCircle, Calendar, Bot } from 'lucide-react';

export function MobileNav({ currentRoute, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'planner', label: 'Plan', icon: PlusCircle, highlight: true },
    { id: 'trips', label: 'Trips', icon: Calendar },
    { id: 'help', label: 'Help', icon: Bot },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentRoute === tab.id;

        if (tab.highlight) {
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center -mt-5 cursor-pointer focus:outline-none"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 flex items-center justify-center shadow-lg shadow-orange-500/40 active:scale-95 transition-transform">
                <Icon className="h-6 w-6 text-zinc-950 stroke-[2.5]" />
              </div>
              <span className="text-[10px] font-bold text-orange-400 mt-1">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
              isActive ? 'text-orange-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

import React from 'react';
import { Calendar, Compass, MapPin, Hotel, Plane, Bot, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function QuickActions({ onNavigate }) {
  const actions = [
    {
      id: 'planner',
      title: 'Plan a Trip',
      desc: 'Create personalized 5-step itineraries optimized by Adapt AI',
      icon: Calendar,
      color: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    },
    {
      id: 'trips',
      title: 'My Trips',
      desc: 'View active itineraries, review schedules, and track live adaptations',
      icon: Compass,
      color: 'bg-zinc-800/80 text-orange-400 border-zinc-700',
    },
    {
      id: 'explore',
      title: 'Explore Destinations',
      desc: 'Browse hand-picked top spots across beaches, peaks, and heritage cities',
      icon: MapPin,
      color: 'bg-orange-600/15 text-orange-400 border-orange-500/30',
    },
    {
      id: 'hotels',
      title: 'Hotels & Resorts',
      desc: 'Verified beachfront stays, heritage palaces, and boutique villas',
      icon: Hotel,
      color: 'bg-zinc-800/80 text-orange-400 border-zinc-700',
    },
    {
      id: 'transport',
      title: 'Transportation',
      desc: 'Express flights, Vande Bharat trains, luxury buses, and cabs',
      icon: Plane,
      color: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    },
    {
      id: 'help',
      title: 'Help with Loco',
      desc: '24/7 AI customer service for flight cancellations, refunds, and changes',
      icon: Bot,
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      badge: 'Loco AI',
    },
  ];

  return (
    <section className="py-12 bg-zinc-950 border-y border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Quick Actions
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Everything you need to discover, organize, and adapt your travels
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <Card
                key={act.id}
                onClick={() => onNavigate(act.id)}
                className="group cursor-pointer hover:border-orange-500/50 hover:shadow-orange-glow transition-all duration-200 border-zinc-800/90 bg-zinc-900/90 relative"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl border ${act.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {act.badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-xs">
                        {act.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-orange-400 transition-colors flex items-center justify-between">
                    <span>{act.title}</span>
                    <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {act.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

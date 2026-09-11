import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Star, Sparkles, Flame, Landmark, Palmtree, Mountain, Eye, Trees, Sun } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockDestinations } from '../../data/mockDestinations';

export function FeaturedDestinations({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = [
    { id: 'All', label: 'All Featured' },
    { id: 'Chardham & Jyotirlingas', label: '🕉️ Chardham & Jyotirlingas' },
    { id: 'Temples & Spiritual', label: '🛕 Temples' },
    { id: 'Historical & Heritage', label: '🏛️ Historical Forts' },
    { id: 'Beaches & Coastal', label: '🏖️ Beaches' },
    { id: 'View Points', label: '🌄 View Points' },
    { id: 'Mountains & Hill Stations', label: '🏔️ Hill Stations' },
    { id: 'Eco-Tourism & Nature', label: '🌿 Eco-Tourism (ec)' },
  ];

  const filtered = mockDestinations
    .filter((dest) => {
      if (activeFilter === 'All') return true;
      return dest.category.some((c) => c.toLowerCase().includes(activeFilter.toLowerCase()));
    })
    .slice(0, 6);

  return (
    <section className="py-16 bg-zinc-950 border-b border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-400 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-orange-400" /> All 28 Indian States & Sacred Pilgrimages
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Featured Destinations Across India
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Curated places across all 28 states of India & union territories — 12 Jyotirlingas, Himalayan Chardhams, UNESCO heritage, misty hill stations, and coastal retreats.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('explore')}
            className="mt-4 sm:mt-0 font-semibold flex items-center gap-1 self-start sm:self-auto border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          >
            View All ({mockDestinations.length}) <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Filter Tabs on Homepage */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-orange-glow'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-orange-500/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <Card
              key={dest.id}
              className="group overflow-hidden border-zinc-800/90 hover:border-orange-500/50 hover:shadow-orange-glow transition-all duration-300 rounded-2xl flex flex-col bg-zinc-900/90"
            >
              <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  onError={(e) => {
                    const isSpiritual = dest.category?.some(c => c.toLowerCase().includes('spiritual') || c.toLowerCase().includes('temple') || c.toLowerCase().includes('chardham'));
                    const isBeach = dest.category?.some(c => c.toLowerCase().includes('beach'));
                    const isHeritage = dest.category?.some(c => c.toLowerCase().includes('historical') || c.toLowerCase().includes('heritage'));
                    const isNature = dest.category?.some(c => c.toLowerCase().includes('eco') || c.toLowerCase().includes('nature'));

                    if (isSpiritual) {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop';
                    } else if (isBeach) {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop';
                    } else if (isHeritage) {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600100397608-f010f443b749?q=80&w=1000&auto=format&fit=crop';
                    } else if (isNature) {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop';
                    } else {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop';
                    }
                  }}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-zinc-900/90 text-zinc-100 font-bold border border-zinc-700 backdrop-blur-xs shadow-xs">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                    {dest.rating}
                  </Badge>
                </div>

                {/* Primary Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 border-0 text-[10px] font-black shadow-xs">
                    {dest.category[0]}
                  </Badge>
                </div>

                {/* Weather Pill */}
                {dest.weather && (
                  <div className="absolute bottom-12 right-3 bg-black/70 backdrop-blur-md rounded-md px-2 py-0.5 text-white flex items-center gap-1 text-[10px] font-semibold border border-zinc-700/50">
                    <Sun className="h-2.5 w-2.5 text-amber-400" />
                    <span>{dest.weather.temp}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-300">{dest.weather.condition}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] font-semibold text-orange-400">{dest.state}</span>
                  <h3 className="text-xl font-bold leading-tight text-white">{dest.name}</h3>
                </div>
              </div>

              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                    {dest.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700/60"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Est. Package</span>
                    <p className="text-xs font-bold text-white">{dest.estimatedBudget}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onNavigate('planner', { destination: dest.name })}
                    className="font-black text-xs shadow-md shadow-orange-500/25"
                  >
                    Plan Trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

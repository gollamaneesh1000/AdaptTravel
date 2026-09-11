import React, { useState, useMemo } from 'react';
import {
  Compass,
  Star,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Sun,
  Flame,
  Landmark,
  Palmtree,
  Mountain,
  Eye,
  Trees,
  Search,
  CloudRain,
  Wind,
  Droplets
} from 'lucide-react';
import { mockDestinations } from '../../data/mockDestinations';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

export function ExplorePage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Destinations', icon: Compass },
    { id: 'Chardham & Jyotirlingas', label: 'Chardham & 12 Jyotirlingas', icon: Flame },
    { id: 'Temples & Spiritual', label: 'Temples & Sacred Pilgrimages', icon: Sparkles },
    { id: 'Historical & Heritage', label: 'Historical Places & Forts', icon: Landmark },
    { id: 'Beaches & Coastal', label: 'Pristine Beaches & Coasts', icon: Palmtree },
    { id: 'Mountains & Hill Stations', label: 'Mountains & Hill Stations', icon: Mountain },
    { id: 'View Points', label: 'Scenic View Points & Peaks', icon: Eye },
    { id: 'Eco-Tourism & Nature', label: 'Eco-Tourism & Wildlife (ec)', icon: Trees },
  ];

  // Dynamic state list covering all states of India
  const availableStates = useMemo(() => {
    return [...new Set(mockDestinations.map((d) => d.state))].sort();
  }, []);

  // Dynamic count calculation
  const categoryCounts = useMemo(() => {
    const counts = { All: mockDestinations.length };
    categories.forEach((cat) => {
      if (cat.id !== 'All') {
        counts[cat.id] = mockDestinations.filter((d) =>
          d.category.some((c) => c.toLowerCase().includes(cat.id.toLowerCase()))
        ).length;
      }
    });
    return counts;
  }, []);

  const filteredDestinations = useMemo(() => {
    return mockDestinations.filter((dest) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        dest.category.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesState =
        selectedState === 'All' ||
        dest.state.toLowerCase() === selectedState.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.state.toLowerCase().includes(q) ||
        dest.tagline.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.highlights.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesState && matchesQuery;
    });
  }, [selectedCategory, selectedState, searchQuery]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" /> India’s 28 States & Union Territories
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Discover Sacred Temples, Chardham, Jyotirlingas & Nature
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-3xl">
              Explore 45+ verified destinations covering all 28 states of India and union territories — 12 Jyotirlingas, ancient Himalayan Chardhams, UNESCO fortresses, viewpoints, beaches, and wildlife eco-reserves.
            </p>
          </div>

          {/* State Filter & Live Search */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            {/* State Filter Selector */}
            <div className="w-full sm:w-56 relative">
              <MapPin className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-600 pointer-events-none" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white text-xs sm:text-sm font-semibold border border-gray-200 rounded-xl focus:border-brand-500 text-gray-800 appearance-none shadow-xs cursor-pointer"
              >
                <option value="All">🇮🇳 All States & UTs ({availableStates.length})</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    {st} ({mockDestinations.filter((d) => d.state === st).length})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
            </div>

            {/* Live Search */}
            <div className="w-full sm:w-64 relative">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, temple, fort..."
                className="pl-9 pr-4 py-2 bg-white text-xs sm:text-sm border-gray-200 rounded-xl focus:border-brand-500 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills with Icons and Counts */}
        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Header Count */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-semibold text-gray-500">
              Showing <span className="font-bold text-gray-900">{filteredDestinations.length}</span> destinations
              {selectedState !== 'All' && (
                <span> in <span className="text-brand-600 font-bold">{selectedState}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="text-brand-600 font-bold">{searchQuery}</span>"</span>
              )}
            </p>
            {selectedState !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-[10px] font-bold">
                State: {selectedState}
                <button
                  onClick={() => setSelectedState('All')}
                  className="hover:text-brand-900 ml-0.5 cursor-pointer font-extrabold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          {(searchQuery || selectedState !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('All');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Destination Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8">
            <Compass className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">No matching destinations found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
              Try adjusting your search query or selecting a different category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <Card
                key={dest.id}
                className="border-gray-200/90 shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl overflow-hidden flex flex-col group bg-white"
              >
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    onError={(e) => {
                      // Safe, high-definition category-grounded fallback images
                      const isSpiritual = dest.category?.some(c => c.toLowerCase().includes('spiritual') || c.toLowerCase().includes('temple') || c.toLowerCase().includes('chardham') || c.toLowerCase().includes('jyotirlinga'));
                      const isBeach = dest.category?.some(c => c.toLowerCase().includes('beach') || c.toLowerCase().includes('coastal'));
                      const isHeritage = dest.category?.some(c => c.toLowerCase().includes('historical') || c.toLowerCase().includes('heritage') || c.toLowerCase().includes('fort'));
                      const isNature = dest.category?.some(c => c.toLowerCase().includes('eco') || c.toLowerCase().includes('nature') || c.toLowerCase().includes('wildlife'));

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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[70%]">
                    <Badge variant="primary" className="bg-brand-600/95 text-white border-0 text-[10px] font-bold shadow-xs">
                      {dest.category[0]}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                    <Badge variant="secondary" className="bg-white/95 text-gray-900 font-bold backdrop-blur-xs shadow-xs">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                      {dest.rating}
                    </Badge>
                  </div>

                  {/* Weather Telemetry Pill on Card */}
                  {dest.weather && (
                    <div className="absolute bottom-16 right-3 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 text-white flex items-center gap-1.5 text-[11px] font-semibold border border-white/15">
                      <Sun className="h-3 w-3 text-amber-400" />
                      <span>{dest.weather.temp}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80">{dest.weather.condition}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedState(dest.state);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white font-semibold underline-offset-2 hover:underline cursor-pointer transition-colors mb-0.5"
                      title={`Filter by ${dest.state}`}
                    >
                      <MapPin className="h-3 w-3 inline text-brand-400" /> {dest.state}
                    </button>
                    <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">{dest.name}</h3>
                    <p className="text-[11px] text-white/90 line-clamp-1">{dest.tagline}</p>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {dest.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dest.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[10px] font-semibold"
                        >
                          {h}
                        </span>
                      ))}
                      {dest.highlights.length > 3 && (
                        <span className="px-1.5 py-1 text-gray-400 text-[10px] font-bold">
                          +{dest.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="grid grid-cols-2 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Best Season</span>
                        <p className="font-bold text-gray-900">{dest.bestTimeToVisit}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Est. Package</span>
                        <p className="font-bold text-gray-900">{dest.estimatedBudget}</p>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigate('planner', { destination: dest.name })}
                      className="w-full font-bold text-xs shadow-sm shadow-brand-600/30 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Plan {dest.name.split('(')[0].trim()} Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

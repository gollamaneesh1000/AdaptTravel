import React, { useState, useMemo } from 'react';
import { Search, MapPin, Hotel, Plane, Calendar, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { mockDestinations } from '../../data/mockDestinations';
import { mockHotels } from '../../data/mockHotels';
import { mockTransport } from '../../data/mockTransport';

export function GlobalSearchModal({ open, onOpenChange, onNavigate }) {
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { destinations: [], hotels: [], transport: [] };
    const q = query.toLowerCase();

    return {
      destinations: mockDestinations.filter(
        (d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.highlights.some(h => h.toLowerCase().includes(q))
      ).slice(0, 3),
      hotels: mockHotels.filter(
        (h) => h.name.toLowerCase().includes(q) || h.destination.toLowerCase().includes(q)
      ).slice(0, 3),
      transport: mockTransport.filter(
        (t) => t.provider.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q)
      ).slice(0, 3),
    };
  }, [query]);

  const hasResults =
    filteredResults.destinations.length > 0 ||
    filteredResults.hotels.length > 0 ||
    filteredResults.transport.length > 0;

  const handleSelect = (page, param) => {
    onOpenChange(false);
    setQuery('');
    onNavigate(page, param);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-100">
        <div className="flex items-center border-b border-zinc-800 px-4 py-3 bg-zinc-950">
          <Search className="h-5 w-5 text-orange-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, hotels, flights, activities..."
            className="w-full text-base text-zinc-100 placeholder:text-zinc-500 bg-transparent focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 bg-zinc-950">
          {!query.trim() ? (
            <div className="py-8 text-center text-zinc-400">
              <p className="text-sm font-bold text-white">Quick Searches</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['Kedarnath Jyotirlinga', 'Kashi Vishwanath', 'Hampi Heritage', 'Radhanagar Beach', 'Kanyakumari View Point', 'Jim Corbett Safari', 'Srisailam Temple', 'Tiger Hill Sunrise'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 border border-zinc-800 hover:border-orange-500/60 hover:text-orange-400 transition-colors shadow-2xs cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-zinc-400">
              <p className="text-sm">No results found for "{query}".</p>
              <p className="text-xs text-zinc-500 mt-1">Try searching for "Goa", "Resort", or "Flight".</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.destinations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 px-2">Destinations</h4>
                  <div className="space-y-1">
                    {filteredResults.destinations.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={() => handleSelect('explore', dest.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-orange-500/10 border border-zinc-800/90 hover:border-orange-500/40 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={dest.image} alt={dest.name} className="h-10 w-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-white">{dest.name}, {dest.state}</p>
                            <p className="text-xs text-zinc-400">{dest.tagline}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.hotels.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 px-2">Hotels & Stays</h4>
                  <div className="space-y-1">
                    {filteredResults.hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        onClick={() => handleSelect('hotels', hotel.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-orange-500/10 border border-zinc-800/90 hover:border-orange-500/40 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={hotel.image} alt={hotel.name} className="h-10 w-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-white">{hotel.name}</p>
                            <p className="text-xs text-zinc-400">{hotel.location} • ₹{hotel.pricePerNight.toLocaleString()}/night</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.transport.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 px-2">Transportation</h4>
                  <div className="space-y-1">
                    {filteredResults.transport.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('transport', item.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-orange-500/10 border border-zinc-800/90 hover:border-orange-500/40 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl p-2 rounded-lg bg-zinc-950 border border-zinc-800">{item.logo}</span>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.provider} ({item.flightNumber})</p>
                            <p className="text-xs text-zinc-400">{item.from} → {item.to} • ₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

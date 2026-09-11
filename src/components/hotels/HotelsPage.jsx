import React, { useState } from 'react';
import {
  Hotel,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Waves,
  Sparkles,
  Filter,
  Check,
  ArrowRight,
  Eye
} from 'lucide-react';
import { mockHotels } from '../../data/mockHotels';
import { useTrip } from '../../context/TripContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

export function HotelsPage({ onNavigate }) {
  const { addBooking } = useTrip();
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState('All');
  const [selectedHotelForDetails, setSelectedHotelForDetails] = useState(null);
  const [bookingSuccessHotel, setBookingSuccessHotel] = useState(null);

  const destinations = ['All', ...Array.from(new Set(mockHotels.map((h) => h.destination)))];
  const types = ['All', 'Resort', 'Luxury', 'Boutique', 'Budget'];

  const filteredHotels = mockHotels.filter((h) => {
    if (selectedDestination !== 'All' && h.destination !== selectedDestination) return false;
    if (selectedType !== 'All' && h.type !== selectedType) return false;
    return true;
  });

  const handleBookHotel = (hotel) => {
    addBooking({
      name: hotel.name,
      category: 'Hotels',
      price: hotel.pricePerNight * 4,
      location: hotel.location,
      details: `4 Nights in ${hotel.type} room. Breakfast included.`,
    });
    setBookingSuccessHotel(hotel);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Verified Stays</Badge>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Hotels & Luxury Resorts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Hand-picked accommodations with 100% flexible disruption waivers
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Destination filter */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">City:</span>
            {destinations.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDestination(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDestination === d
                    ? 'bg-brand-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Type:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-brand-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="border-gray-200/90 shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Hotel Photo */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <Badge variant="secondary" className="bg-white/95 text-gray-900 font-bold backdrop-blur-xs">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                    {hotel.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="primary" className="bg-black/60 text-white border-0 text-[10px] backdrop-blur-xs">
                    {hotel.type}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Facilities Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hotel.facilities.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase">Price / Night</span>
                    <p className="text-sm font-extrabold text-gray-900">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedHotelForDetails(hotel)}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleBookHotel(hotel)}
                      className="font-bold text-xs"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Hotel Details Modal */}
      {selectedHotelForDetails && (
        <Dialog open={Boolean(selectedHotelForDetails)} onOpenChange={() => setSelectedHotelForDetails(null)}>
          <DialogContent className="max-w-xl p-6 rounded-2xl">
            <img
              src={selectedHotelForDetails.image}
              alt={selectedHotelForDetails.name}
              className="h-56 w-full object-cover rounded-xl mb-4"
            />
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-gray-900">{selectedHotelForDetails.name}</h3>
              <Badge variant="primary">₹{selectedHotelForDetails.pricePerNight.toLocaleString()} / night</Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" /> {selectedHotelForDetails.location}
            </p>
            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              {selectedHotelForDetails.description}
            </p>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Amenities & Facilities:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedHotelForDetails.facilities.map((fac, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs text-gray-700 font-medium">
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedHotelForDetails(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleBookHotel(selectedHotelForDetails);
                  setSelectedHotelForDetails(null);
                }}
                className="font-bold"
              >
                Instant Book Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking Confirmation Dialog */}
      {bookingSuccessHotel && (
        <Dialog open={Boolean(bookingSuccessHotel)} onOpenChange={() => setBookingSuccessHotel(null)}>
          <DialogContent className="max-w-md p-6 text-center rounded-2xl">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Hotel Booking Added!</h3>
            <p className="text-xs text-gray-500 mt-1">
              <strong>{bookingSuccessHotel.name}</strong> has been added to your bookings with zero-fee disruption adaptation.
            </p>
            <div className="mt-6 flex space-x-3">
              <Button variant="outline" onClick={() => setBookingSuccessHotel(null)} className="flex-1">
                Continue Browsing
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setBookingSuccessHotel(null);
                  onNavigate('bookings');
                }}
                className="flex-1 font-bold"
              >
                View Bookings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

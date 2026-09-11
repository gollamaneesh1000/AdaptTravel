import React, { useState, useMemo } from 'react';
import {
  Plane,
  TrainTrack,
  Bus,
  Car,
  Ship,
  Sparkles,
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Luggage,
  Shield,
  ArrowRight,
  Filter,
  Users,
  CreditCard,
  ChevronRight,
  Info,
  Fuel,
  Compass
} from 'lucide-react';
import { mockTransport } from '../../data/mockTransport';
import { useTrip } from '../../context/TripContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export function TransportPage({ onNavigate }) {
  const { addBooking } = useTrip();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [bookingConfirmedItem, setBookingConfirmedItem] = useState(null);

  // Booking Modal State
  const [passengerCount, setPassengerCount] = useState(2);
  const [travelDate, setTravelDate] = useState('2026-10-16');
  const [pickupAddress, setPickupAddress] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [specialRequest, setSpecialRequest] = useState('');

  const tabs = [
    { id: 'all', label: 'All Modes', icon: Compass, count: mockTransport.length },
    { id: 'cabs', label: 'Cabs & Outstation', icon: Car, count: mockTransport.filter(t => t.category === 'cabs').length },
    { id: 'trains', label: 'Express Trains', icon: TrainTrack, count: mockTransport.filter(t => t.category === 'trains').length },
    { id: 'buses', label: 'Smart Buses', icon: Bus, count: mockTransport.filter(t => t.category === 'buses').length },
    { id: 'flights', label: 'Flights', icon: Plane, count: mockTransport.filter(t => t.category === 'flights').length },
    { id: 'ferries_heli', label: 'Heli & Ferries', icon: Ship, count: mockTransport.filter(t => t.category === 'ferries_heli').length },
  ];

  const destinationFilters = [
    'All',
    'Kedarnath Dham',
    'Varanasi (Kashi Vishwanath)',
    'Tirupati (Sri Venkateswara)',
    'Goa',
    'Vaishno Devi (Katra)',
    'Ooty (Nilgiris)',
    'Puri (Jagannath Temple)',
    'Somnath (First Jyotirlinga)',
    'Manali & Rohtang Pass',
    'Andaman & Nicobar Islands',
    'Coorg (Kodagu)',
    'Mahabaleshwar & Panchgani (12 View Points)',
  ];

  // Filtered transport items
  const filteredItems = useMemo(() => {
    return mockTransport.filter((item) => {
      // Category filter
      const matchesCategory = activeTab === 'all' || item.category === activeTab;

      // Destination filter
      const matchesDest =
        selectedDestination === 'All' ||
        (item.destinationMatch &&
          item.destinationMatch.toLowerCase().includes(selectedDestination.toLowerCase())) ||
        item.to.toLowerCase().includes(selectedDestination.toLowerCase()) ||
        item.from.toLowerCase().includes(selectedDestination.toLowerCase());

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.provider.toLowerCase().includes(q) ||
        item.flightNumber.toLowerCase().includes(q) ||
        item.from.toLowerCase().includes(q) ||
        item.to.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        (item.destinationMatch && item.destinationMatch.toLowerCase().includes(q));

      return matchesCategory && matchesDest && matchesSearch;
    });
  }, [activeTab, selectedDestination, searchQuery]);

  const openBookingModal = (item) => {
    setSelectedItemForBooking(item);
    setPassengerCount(item.category === 'cabs' ? 4 : 2);
    setPickupAddress(
      item.category === 'cabs'
        ? item.from.includes('Airport')
          ? 'Airport Arrival Terminal Gate 3'
          : 'Hotel / Residence Pickup'
        : ''
    );
    setIsRoundTrip(false);
  };

  const calculateTotal = (item) => {
    if (!item) return 0;
    // Cabs are booked per vehicle; others per passenger
    const base = item.category === 'cabs' ? item.price : item.price * passengerCount;
    const roundTripMultiplier = isRoundTrip ? 1.85 : 1.0; // 15% discount on roundtrip
    const subtotal = Math.round(base * roundTripMultiplier);
    const gst = Math.round(subtotal * 0.05); // 5% GST
    return {
      subtotal,
      gst,
      total: subtotal + gst,
    };
  };

  const handleConfirmBooking = (item, navigateToPayment = false) => {
    const calc = calculateTotal(item);
    const categoryName =
      item.category === 'cabs'
        ? 'Cabs'
        : item.category === 'trains'
        ? 'Trains'
        : item.category === 'buses'
        ? 'Buses'
        : item.category === 'flights'
        ? 'Flights'
        : 'Ferries/Heli';

    const newBooking = addBooking({
      name: `${item.provider} (${item.flightNumber})`,
      category: 'Transport',
      price: calc.total,
      date: travelDate,
      time: item.departureTime,
      location: `${item.from} → ${item.to}`,
      details: `${item.type} • ${passengerCount} Passenger(s) ${
        isRoundTrip ? '• Round-Trip' : '• One-Way'
      } ${pickupAddress ? `• Pickup: ${pickupAddress}` : ''}`,
    });

    setSelectedItemForBooking(null);

    if (navigateToPayment) {
      onNavigate('payment');
    } else {
      setBookingConfirmedItem({
        ...item,
        bookingRef: newBooking.confirmationCode,
        bookingId: newBooking.id,
        totalPaid: calc.total,
      });
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'cabs':
        return <Badge variant="primary" className="bg-amber-600 text-white border-0 text-[10px] font-bold">Cab & Outstation</Badge>;
      case 'trains':
        return <Badge variant="primary" className="bg-blue-700 text-white border-0 text-[10px] font-bold">Vande Bharat / Express</Badge>;
      case 'buses':
        return <Badge variant="primary" className="bg-emerald-700 text-white border-0 text-[10px] font-bold">Smart Sleeper Bus</Badge>;
      case 'flights':
        return <Badge variant="primary" className="bg-purple-700 text-white border-0 text-[10px] font-bold">Domestic Flight</Badge>;
      case 'ferries_heli':
        return <Badge variant="primary" className="bg-rose-600 text-white border-0 text-[10px] font-bold">Heli Shuttle / Ferry</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">Transit</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-7xl mx-auto">
        {/* Hero & Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> All-India Multi-Modal Transit Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Cabs, Trains, Buses, Flights & Helicopters
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Book private outstation cabs with hill-certified chauffeurs, semi-high speed Vande Bharat express trains, luxury sleeper coaches, and Himalayan helicopter shuttles with automated Adapt AI delay protection.
          </p>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-3 hover:border-orange-500/30 transition-all">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/25">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Verified Cabs</span>
                <span className="text-sm font-extrabold text-white">4x4 SUVs & Sedans</span>
              </div>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-3 hover:border-orange-500/30 transition-all">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/25">
                <TrainTrack className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Express Rail</span>
                <span className="text-sm font-extrabold text-white">Vande Bharat Superfast</span>
              </div>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-3 hover:border-orange-500/30 transition-all">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/25">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Smart Coaches</span>
                <span className="text-sm font-extrabold text-white">AC Sleeper & Electric</span>
              </div>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-3 hover:border-orange-500/30 transition-all">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/25">
                <Ship className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Special Transit</span>
                <span className="text-sm font-extrabold text-white">Heli Shuttles & Ferries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Destination Filter Bar */}
        <div className="mb-6 space-y-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full md:flex-1 relative">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, station, Vande Bharat, Innova 4x4, bus route, or flight..."
                className="pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50/50 border-gray-200 rounded-xl"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="text-xs text-brand-600 hover:bg-brand-50"
              >
                Clear Search
              </Button>
            )}
          </div>

          {/* Quick Destination Pills */}
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Popular Pilgrimages & Scenic Routes:
            </span>
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
              {destinationFilters.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDestination === dest
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500">
            Showing <span className="font-bold text-gray-900">{filteredItems.length}</span> transit options
          </p>
          {(selectedDestination !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDestination('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Transport Cards List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card className="p-12 text-center bg-white rounded-2xl border-gray-200">
              <Compass className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-900">No transit services found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                No routes match your current criteria. Try selecting another transit tab or resetting destination filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTab('all');
                  setSelectedDestination('All');
                  setSearchQuery('');
                }}
                className="mt-4"
              >
                Show All Transit
              </Button>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-gray-200/90 shadow-soft hover:border-brand-200 hover:shadow-card transition-all rounded-2xl overflow-hidden bg-white group"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Carrier / Vehicle Details */}
                    <div className="flex items-start space-x-4 min-w-[280px]">
                      <span className="text-3xl p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                        {item.logo}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                          {getCategoryBadge(item.category)}
                          <Badge variant="secondary" className="text-[10px] font-mono font-bold">
                            {item.flightNumber}
                          </Badge>
                        </div>
                        <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                          {item.provider}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
                        {item.destinationMatch && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-brand-600 font-semibold mt-1">
                            <MapPin className="h-3 w-3" /> Connects to {item.destinationMatch}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Route & Times */}
                    <div className="flex items-center space-x-4 sm:space-x-8 flex-1 justify-center">
                      <div className="text-left">
                        <span className="text-base sm:text-lg font-mono font-extrabold text-gray-900 block">
                          {item.departureTime}
                        </span>
                        <p className="text-xs text-gray-600 max-w-[130px] sm:max-w-[180px] truncate font-medium">
                          {item.from}
                        </p>
                      </div>

                      <div className="flex flex-col items-center px-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {item.duration}
                        </span>
                        <div className="w-16 sm:w-28 h-0.5 bg-gray-200 my-1.5 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-brand-50" />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          {item.category === 'cabs' ? 'Doorstep / Direct' : 'Direct Service'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-base sm:text-lg font-mono font-extrabold text-gray-900 block">
                          {item.arrivalTime}
                        </span>
                        <p className="text-xs text-gray-600 max-w-[130px] sm:max-w-[180px] truncate font-medium">
                          {item.to}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price and Actions */}
                    <div className="flex items-center justify-between lg:justify-end space-x-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase block">
                          {item.category === 'cabs' ? 'Whole Cab Fare' : 'Starting From'}
                        </span>
                        <p className="text-xl font-extrabold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </p>
                        <span className="text-[10px] text-amber-600 font-bold block">
                          {item.category === 'cabs'
                            ? `Up to ${item.seatsAvailable} passengers`
                            : `${item.seatsAvailable} seats remaining`}
                        </span>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openBookingModal(item)}
                        className="font-bold text-xs px-5 py-2.5 shadow-sm shadow-brand-600/30 flex items-center gap-1.5"
                      >
                        <span>{item.category === 'cabs' ? 'Book Cab' : 'Book Ticket'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Highlights / Amenities & Adapt Guarantee Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                    <span className="flex items-center gap-1.5 font-medium text-gray-700">
                      {item.category === 'cabs' ? (
                        <Fuel className="h-3.5 w-3.5 text-amber-600" />
                      ) : (
                        <Luggage className="h-3.5 w-3.5 text-gray-400" />
                      )}
                      <span>{item.baggage}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-brand-700 font-semibold">
                      <Sparkles className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                      <span>Protected by Adapt AI automated schedule & delay protection</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Interactive Booking Drawer / Modal */}
      {selectedItemForBooking && (
        <Dialog open={Boolean(selectedItemForBooking)} onOpenChange={() => setSelectedItemForBooking(null)}>
          <DialogContent className="max-w-lg p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl p-2 rounded-xl bg-gray-50 border border-gray-200">
                  {selectedItemForBooking.logo}
                </span>
                <div>
                  <DialogTitle className="text-lg font-extrabold text-gray-900">
                    {selectedItemForBooking.category === 'cabs' ? 'Reserve Private Cab' : 'Book Transit Ticket'}
                  </DialogTitle>
                  <p className="text-xs text-gray-500 font-mono">
                    {selectedItemForBooking.provider} • {selectedItemForBooking.flightNumber}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* Route Summary */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 mb-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 block">{selectedItemForBooking.departureTime}</span>
                  <span className="text-gray-500">{selectedItemForBooking.from}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-semibold">{selectedItemForBooking.duration}</span>
                  <div className="w-16 h-0.5 bg-gray-300 my-0.5" />
                  <span className="text-[9px] text-emerald-600 font-bold">Non-Stop</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">{selectedItemForBooking.arrivalTime}</span>
                  <span className="text-gray-500">{selectedItemForBooking.to}</span>
                </div>
              </div>
            </div>

            {/* Form Options */}
            <div className="space-y-4 text-xs">
              {/* Travel Date */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Select Travel Date</label>
                <div className="relative">
                  <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Passenger Count */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {selectedItemForBooking.category === 'cabs' ? 'Passengers in Cab' : 'Number of Travelers'}
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-extrabold text-gray-900 text-sm">
                      {passengerCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPassengerCount(Math.min(selectedItemForBooking.seatsAvailable || 6, passengerCount + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500">
                    {selectedItemForBooking.category === 'cabs'
                      ? '(Cab capacity: max ' + selectedItemForBooking.seatsAvailable + ')'
                      : `(₹${selectedItemForBooking.price.toLocaleString()} per seat)`}
                  </span>
                </div>
              </div>

              {/* Cab specific fields */}
              {selectedItemForBooking.category === 'cabs' && (
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Pickup Location / Hotel / Airport Gate
                    </label>
                    <div className="relative">
                      <MapPin className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="e.g. Terminal 2 Arrival Gate / Grand Hyatt Lobby / Home Address"
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="roundTripCheck"
                      checked={isRoundTrip}
                      onChange={(e) => setIsRoundTrip(e.target.checked)}
                      className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                    />
                    <label htmlFor="roundTripCheck" className="text-xs font-semibold text-gray-700 cursor-pointer">
                      Book Round-Trip Return (Includes 15% discount on return leg)
                    </label>
                  </div>
                </div>
              )}

              {/* Adapt AI Disruption Shield Notice */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2.5">
                <Shield className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-800">
                  <strong className="block">Adapt AI Delay Shield (Included Free ₹0)</strong>
                  If this {selectedItemForBooking.category} is delayed by more than 45 minutes, Adapt AI automatically alerts your hotels, rearranges activities, or issues an instant refund.
                </div>
              </div>

              {/* Price Calculation Summary */}
              {(() => {
                const calc = calculateTotal(selectedItemForBooking);
                return (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Fare {isRoundTrip ? '(Round Trip with 15% discount)' : ''}</span>
                      <span>₹{calc.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST & Applicable Transit Taxes (5%)</span>
                      <span>₹{calc.gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Adapt AI Delay Protection</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total Payable</span>
                      <span className="text-brand-600">₹{calc.total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setSelectedItemForBooking(null)}
                className="text-xs flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleConfirmBooking(selectedItemForBooking, false)}
                className="text-xs font-bold flex-1"
              >
                Save to Bookings
              </Button>
              <Button
                variant="primary"
                onClick={() => handleConfirmBooking(selectedItemForBooking, true)}
                className="text-xs font-bold flex-1 bg-brand-600 hover:bg-brand-700 flex items-center justify-center gap-1"
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>Pay via Razorpay</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking Confirmation Dialog */}
      {bookingConfirmedItem && (
        <Dialog open={Boolean(bookingConfirmedItem)} onOpenChange={() => setBookingConfirmedItem(null)}>
          <DialogContent className="max-w-md p-6 text-center rounded-2xl">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Transit Booking Confirmed!</h3>
            <p className="text-xs text-gray-500 mt-1">
              <strong>{bookingConfirmedItem.provider}</strong> has been successfully added to your itinerary.
            </p>
            <div className="p-3 my-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Confirmation Code:</span>
                <span className="font-mono font-bold text-brand-600">{bookingConfirmedItem.bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Route:</span>
                <span className="font-bold text-gray-900">{bookingConfirmedItem.from} → {bookingConfirmedItem.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount:</span>
                <span className="font-bold text-gray-900">₹{bookingConfirmedItem.totalPaid?.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setBookingConfirmedItem(null)} className="flex-1 text-xs">
                Continue Browsing
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setBookingConfirmedItem(null);
                  onNavigate('bookings');
                }}
                className="flex-1 text-xs font-bold"
              >
                View in Bookings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

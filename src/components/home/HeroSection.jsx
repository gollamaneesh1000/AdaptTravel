import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Shield,
  Plane,
  Compass,
  AlertCircle,
  Bus,
  Train,
  Car,
  Bike
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { validateTripRoute, checkSameDepartureAndDestination, checkDateValidation } from '../../lib/locationValidator';

export function HeroSection({ onNavigate, onQuickPlan }) {
  const [fromLocation, setFromLocation] = useState('Delhi (DEL)');
  const [destination, setDestination] = useState('Manali');
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-21');
  const [travelMode, setTravelMode] = useState('Bus (AC Volvo Sleeper)');
  const [travelers, setTravelers] = useState('2 Adults');
  const [budget, setBudget] = useState('Comfort (₹35,000 / $420)');
  const [travelStyle, setTravelStyle] = useState('Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)');
  const [tripFormError, setTripFormError] = useState('');

  const sameLocationCheck = checkSameDepartureAndDestination(fromLocation, destination);
  const dateCheck = checkDateValidation(departureDate, returnDate);

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      setTripFormError('Please type your destination.');
      return;
    }
    const routeValidation = validateTripRoute(fromLocation, destination, departureDate, returnDate);
    if (!routeValidation.isValid) {
      setTripFormError(routeValidation.error);
      return;
    }
    setTripFormError('');
    if (onQuickPlan) {
      onQuickPlan({
        from: fromLocation,
        fromLocation: fromLocation,
        destination: destination.trim(),
        departureDate,
        returnDate,
        travelMode,
        transportation: travelMode,
        travelers: { adults: 2, children: 0, infants: 0 },
        budget,
        travelStyle,
      });
    } else {
      onNavigate('planner');
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/40 shadow-orange-glow text-xs font-bold text-orange-400">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            AI Autonomous Itineraries & Disruption Rescheduling
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Your Journey. Your Plans.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 relative inline-block">
              Your AI Travel Agent.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Plan smarter, travel easier, and adapt instantly when flights delay, weather strikes, or temples close.
          </p>
        </div>

        {/* Large Trip Planning Card */}
        <div className="mt-10 max-w-5xl mx-auto">
          <Card className="shadow-2xl shadow-black/80 border-zinc-800/90 bg-zinc-900/95 backdrop-blur-xl rounded-2xl overflow-hidden p-2 sm:p-4 hover:border-orange-500/30 transition-all">
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleCreateTrip}>
                {/* Real-time & Validation Error Banner */}
                {(tripFormError || sameLocationCheck.isSame || !dateCheck.isValid) && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-600/80 text-xs sm:text-sm font-bold text-red-200 flex items-center gap-2.5 shadow-xs animate-fade-in" role="alert">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <span>
                      {tripFormError ||
                        sameLocationCheck.errorMessage ||
                        dateCheck.error ||
                        'Error: Departure location, destination, or travel dates are invalid.'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {/* From */}
                  <div>
                    <Label htmlFor="from">Starting From</Label>
                    <div className="relative mt-1">
                      <Input
                        id="from"
                        value={fromLocation}
                        onChange={(e) => {
                          setFromLocation(e.target.value);
                          setTripFormError('');
                        }}
                        placeholder="e.g. Mumbai, Delhi"
                        className={`pl-9 text-sm font-medium ${sameLocationCheck.isSame ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : ''}`}
                      />
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {sameLocationCheck.isSame && (
                      <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> Matches destination ({sameLocationCheck.locationName})
                      </p>
                    )}
                  </div>

                  {/* Destination */}
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative mt-1">
                      <Input
                        id="destination"
                        type="text"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value);
                          setTripFormError('');
                        }}
                        placeholder="Type destination (e.g. Manali, Kedarnath, Goa...)"
                        className={`pl-9 text-sm font-medium ${sameLocationCheck.isSame ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : ''}`}
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                    </div>
                    {sameLocationCheck.isSame && (
                      <p className="text-[11px] font-bold text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> Cannot match departure point
                      </p>
                    )}
                  </div>

                  {/* Departure Date */}
                  <div>
                    <Label htmlFor="departure">Departure Date</Label>
                    <div className="relative mt-1">
                      <Input
                        id="departure"
                        type="date"
                        value={departureDate}
                        onChange={(e) => {
                          setDepartureDate(e.target.value);
                          setTripFormError('');
                        }}
                        className="pl-9 text-sm"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    </div>
                  </div>

                  {/* Return Date */}
                  <div>
                    <Label htmlFor="return">Return Date</Label>
                    <div className="relative mt-1">
                      <Input
                        id="return"
                        type="date"
                        value={returnDate}
                        onChange={(e) => {
                          setReturnDate(e.target.value);
                          setTripFormError('');
                        }}
                        className={`pl-9 text-sm ${!dateCheck.isValid ? 'border-red-500 bg-red-950/40' : ''}`}
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    </div>
                    {!dateCheck.isValid && (
                      <p className="text-[11px] font-bold text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> {dateCheck.isSameDate ? 'Return date cannot equal departure' : 'Return date is before departure'}
                      </p>
                    )}
                  </div>

                  {/* Travel Mode (How they travel) */}
                  <div>
                    <Label htmlFor="travelMode">How Do You Travel?</Label>
                    <div className="relative mt-1">
                      <Select
                        id="travelMode"
                        value={travelMode}
                        onChange={(e) => setTravelMode(e.target.value)}
                        className="pl-9 text-sm font-semibold"
                      >
                        <option value="Bus (AC Volvo Sleeper)">🚌 Bus (AC Volvo / Sleeper)</option>
                        <option value="Train (Express / Vande Bharat)">🚆 Train (Express / Vande Bharat)</option>
                        <option value="Flight (Domestic Airline)">✈️ Flight (Direct / Connecting)</option>
                        <option value="Private Cab / Car">🚗 Private Cab / Car</option>
                        <option value="Bike / Motorcycle">🏍️ Bike / Motorcycle</option>
                      </Select>
                      <Bus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <Label htmlFor="travelers">Travelers</Label>
                    <div className="relative mt-1">
                      <Select
                        id="travelers"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="pl-9 text-sm"
                      >
                        <option value="1 Solo">1 Solo Pilgrim / Traveler</option>
                        <option value="2 Adults">2 Adults (Couple / Friends)</option>
                        <option value="Family (3-4)">Family Group (3-4)</option>
                        <option value="Pilgrim Group (5+)">Pilgrim Yatra Group (5+)</option>
                      </Select>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor="budget">Budget Level</Label>
                    <div className="relative mt-1">
                      <Select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="text-sm"
                      >
                        <option value="Budget Yatri (₹15,000 / $180)">Budget Yatri (₹15,000 / $180)</option>
                        <option value="Comfort (₹35,000 / $420)">Comfort (₹35,000 / $420)</option>
                        <option value="Premium (₹60,000 / $720)">Premium (₹60,000 / $720)</option>
                        <option value="Luxury VIP (₹1,00,000+ / $1200+)">Luxury VIP (₹1,00,000+ / $1200+)</option>
                      </Select>
                    </div>
                  </div>

                  {/* Travel Style / Vibe */}
                  <div>
                    <Label htmlFor="style">Trip Vibe & Theme</Label>
                    <div className="relative mt-1">
                      <Select
                        id="style"
                        value={travelStyle}
                        onChange={(e) => setTravelStyle(e.target.value)}
                        className="text-sm font-semibold"
                      >
                        <option value="Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)">
                          🕉️ Sacred Spiritual Pilgrimage
                        </option>
                        <option value="Adventure & High Altitude Trekking">
                          🧗 Adventure & Mountain Trekking
                        </option>
                        <option value="Romantic & Honeymoon Vistas">
                          💖 Romantic & Honeymoon
                        </option>
                        <option value="Historical & Heritage Exploration">
                          🏛️ Historical Forts & UNESCO Heritage
                        </option>
                        <option value="Mountains & Scenic View Points">
                          🏔️ Mountains, Hills & Scenic Peaks
                        </option>
                        <option value="Beaches & Coastal Relaxation">
                          🏖️ Beaches & Coastal Relaxation
                        </option>
                        <option value="Party & Vibrant Nightlife">
                          🎉 Party & Vibrant Nightlife
                        </option>
                        <option value="Eco-Tourism & Nature Trails">
                          🌿 Eco-Tourism & Wildlife Sanctuaries
                        </option>
                        <option value="Food & Culinary Trail">
                          🍲 Food & Culinary Trail
                        </option>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-zinc-400">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                    <span>Instant AI scheduling with VIP darshan queue & mountain weather adaptation</span>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-black px-8 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                  >
                    Create My Trip <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

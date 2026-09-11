import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  DollarSign,
  Heart,
  Sliders,
  Utensils,
  Accessibility,
  AlertCircle,
  Bus,
  Train,
  Plane,
  Car,
  Bike
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { LoadingItinerary } from './LoadingItinerary';
import { validateTripRoute, checkSameDepartureAndDestination, checkDateValidation } from '../../lib/locationValidator';

export function TripPlannerWizard({ onNavigate, params }) {
  const { generateTrip, isGenerating } = useTrip();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Destination & Travel Mode
    fromLocation: params?.from || params?.fromLocation || 'Delhi (DEL)',
    destination: params?.destination || 'Manali',
    travelMode: params?.travelMode || params?.transportation || 'Bus (AC Volvo Sleeper)',
    // Step 2: Dates
    departureDate: params?.departureDate || '2026-10-15',
    returnDate: params?.returnDate || '2026-10-21',
    duration: 6,
    // Step 3: Travelers
    travelers: params?.travelers || { adults: 2, children: 0, infants: 0 },
    // Step 4: Preferences
    budget: params?.budget || 'Comfort (₹35,000 / $420)',
    travelStyle: params?.travelStyle || 'Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)',
    accommodation: 'Heritage Hotels & Mountain Ashrams',
    transportation: params?.travelMode || params?.transportation || 'Bus (AC Volvo Sleeper)',
    activities: [
      'Sacred Temple Darshan & Aarti',
      'Jyotirlinga Abhishek & Pujan',
      'High-Altitude Mountain View Points',
      'Sunrise & Sunset Photography Points',
    ],
    // Step 5: Special Requirements
    accessibility: 'Moderate Pace & Mountain Walking',
    foodPreference: 'Pure Satvik Vegetarian (No Onion/Garlic option)',
    interests: 'Temples, Himalayan peaks, Sacred rivers, Scenic viewpoints',
    additionalRequests: 'VIP Darshan pass assistance and priority morning aarti entry',
  });

  const [validationError, setValidationError] = useState('');

  const sameLocationCheck = checkSameDepartureAndDestination(formData.fromLocation, formData.destination);

  const nextStep = () => {
    if (step === 1) {
      if (!formData.destination || !formData.destination.trim()) {
        setValidationError('Please type your destination.');
        return;
      }
      const routeCheck = validateTripRoute(formData.fromLocation, formData.destination);
      if (!routeCheck.isValid) {
        setValidationError(routeCheck.error);
        return;
      }
    }
    if (step === 2) {
      const dateCheck = checkDateValidation(formData.departureDate, formData.returnDate);
      if (!dateCheck.isValid) {
        setValidationError(dateCheck.error);
        return;
      }
    }
    setValidationError('');
    setStep((prev) => Math.min(5, prev + 1));
  };

  const prevStep = () => {
    setValidationError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleGenerate = () => {
    generateTrip(formData, () => {
      onNavigate('itinerary');
    });
  };

  const handleActivityToggle = (act) => {
    setFormData((prev) => {
      const exists = prev.activities.includes(act);
      const updated = exists
        ? prev.activities.filter((a) => a !== act)
        : [...prev.activities, act];
      return { ...prev, activities: updated };
    });
  };

  if (isGenerating) {
    return <LoadingItinerary destination={formData.destination} />;
  }

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900/80 to-zinc-950">
      <div className="max-w-3xl mx-auto">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <Badge variant="primary" className="mb-2">AI Trip & Pilgrimage Planner</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Design Your Custom Itinerary
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            Step {step} of 5 — Select sacred temples, hill stations, viewpoints, forts or beaches
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center space-x-3 mt-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step
                      ? 'bg-orange-500 text-zinc-950 shadow-xs'
                      : s === step
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black ring-4 ring-orange-500/20 shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {s < step ? <Check className="h-4 w-4 stroke-[3]" /> : s}
                </div>
                {s < 5 && (
                  <div
                    className={`h-1 w-8 sm:w-12 mx-1 rounded-full transition-colors ${
                      s < step ? 'bg-orange-500' : 'bg-zinc-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-card border-gray-200/90 bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Destination */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900">Step 1 — Choose Your Destination & Sacred Route</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Select from revered pilgrimages, heritage capitals, hill stations, or coastal paradises.</p>
                </div>

                <div className="space-y-4">
                  {sameLocationCheck.isSame && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2 animate-fade-in">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                      <span>{sameLocationCheck.errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="fromLocation">Starting / Departure Location</Label>
                    <Input
                      id="fromLocation"
                      value={formData.fromLocation}
                      onChange={(e) => {
                        setFormData({ ...formData, fromLocation: e.target.value });
                        setValidationError('');
                      }}
                      placeholder="e.g. Delhi, Mumbai, Bengaluru, Hyderabad"
                      className={`mt-1 ${sameLocationCheck.isSame ? 'border-red-500 bg-red-50/30' : ''}`}
                    />
                    {sameLocationCheck.isSame && (
                      <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> Matches destination ({sameLocationCheck.locationName})
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="destination">Destination (Type City or Place)</Label>
                    <div className="relative mt-1">
                      <Input
                        id="destination"
                        type="text"
                        value={formData.destination}
                        onChange={(e) => {
                          setFormData({ ...formData, destination: e.target.value });
                          setValidationError('');
                        }}
                        placeholder="e.g. Manali, Kedarnath, Goa, Varanasi, Jaipur, Ooty"
                        className={`pl-9 text-sm font-semibold text-gray-900 ${sameLocationCheck.isSame ? 'border-red-500 bg-red-50/30' : ''}`}
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-600" />
                    </div>
                    {sameLocationCheck.isSame && (
                      <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> Cannot match departure point ({sameLocationCheck.locationName})
                      </p>
                    )}
                  </div>
                </div>

                {/* How They Travel (Travel Mode) */}
                <div className="pt-4 border-t border-gray-100">
                  <Label className="text-sm font-bold text-gray-900 block mb-1">
                    How Do You Travel? (Travel Mode)
                  </Label>
                  <p className="text-xs text-gray-500 mb-3">
                    Choose how you plan to travel. Your itinerary schedule, transit times, and arrival hub will be custom-generated.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { id: 'Bus (AC Volvo Sleeper)', label: 'Bus', desc: 'AC Volvo / Sleeper', icon: Bus },
                      { id: 'Train (Express / Vande Bharat)', label: 'Train', desc: 'Vande Bharat / Rail', icon: Train },
                      { id: 'Flight (Domestic Airline)', label: 'Flight', desc: 'Domestic Airline', icon: Plane },
                      { id: 'Private Cab / Car', label: 'Car / Cab', desc: 'Private AC Sedan/SUV', icon: Car },
                      { id: 'Bike / Cruiser Motorcycle', label: 'Bike', desc: 'Cruiser Motorcycle', icon: Bike },
                    ].map((t) => {
                      const IconComp = t.icon;
                      const isSelected = (formData.travelMode || formData.transportation || '').toLowerCase().includes(t.label.toLowerCase());
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, travelMode: t.id, transportation: t.id });
                          }}
                          className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 text-brand-900 shadow-2xs'
                              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <IconComp className={`h-5 w-5 ${isSelected ? 'text-brand-600' : 'text-gray-500'}`} />
                            {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />}
                          </div>
                          <div>
                            <span className="font-bold text-xs block">{t.label}</span>
                            <span className="text-[10px] text-gray-500">{t.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dates */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900">Step 2 — Travel & Darshan Dates</h3>
                  <p className="text-xs text-gray-500 mt-0.5">When do you wish to travel?</p>
                </div>

                {!checkDateValidation(formData.departureDate, formData.returnDate).isValid && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                    <span>{checkDateValidation(formData.departureDate, formData.returnDate).error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => {
                        setFormData({ ...formData, departureDate: e.target.value });
                        setValidationError('');
                      }}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="returnDate">Return Date</Label>
                    <Input
                      id="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => {
                        setFormData({ ...formData, returnDate: e.target.value });
                        setValidationError('');
                      }}
                      className={`mt-1 ${!checkDateValidation(formData.departureDate, formData.returnDate).isValid ? 'border-red-500 bg-red-50/30' : ''}`}
                    />
                    {!checkDateValidation(formData.departureDate, formData.returnDate).isValid && (
                      <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" />{' '}
                        {checkDateValidation(formData.departureDate, formData.returnDate).isSameDate
                          ? 'Return date cannot equal departure date'
                          : 'Return date is before departure date'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 font-medium">
                  Estimated Trip Length: <strong>6 Days / 5 Nights</strong>. Adapt AI will factor in aarti schedules, temple opening timings, and scenic viewpoint sunrise/sunset windows.
                </div>
              </div>
            )}

            {/* Step 3: Travelers */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900">Step 3 — Travelers & Pilgrims</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Pacing, vehicle capacity, and hotel room allotments.</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <span className="text-xs font-bold text-gray-500 block mb-1">Adults (12+)</span>
                    <div className="flex items-center justify-center space-x-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, adults: Math.max(1, prev.travelers.adults - 1) },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-lg font-extrabold text-gray-900">{formData.travelers.adults}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, adults: prev.travelers.adults + 1 },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <span className="text-xs font-bold text-gray-500 block mb-1">Children (2-11)</span>
                    <div className="flex items-center justify-center space-x-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, children: Math.max(0, prev.travelers.children - 1) },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-lg font-extrabold text-gray-900">{formData.travelers.children}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, children: prev.travelers.children + 1 },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <span className="text-xs font-bold text-gray-500 block mb-1">Elders / Infants</span>
                    <div className="flex items-center justify-center space-x-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, infants: Math.max(0, prev.travelers.infants - 1) },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-lg font-extrabold text-gray-900">{formData.travelers.infants}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            travelers: { ...prev.travelers, infants: prev.travelers.infants + 1 },
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900">Step 4 — Travel Theme, Temples & View Points</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Customize your activities and sightseeing pace.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="travelStyle">Travel Style & Theme</Label>
                    <Select
                      id="travelStyle"
                      value={formData.travelStyle}
                      onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                      className="mt-1"
                    >
                      <option value="Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)">
                        🕉️ Spiritual & Temple Pilgrimage (Darshan, Aarti & Pujan)
                      </option>
                      <option value="Adventure & High Altitude Trekking">
                        🧗 Adventure & High Altitude Trekking (Hikes, Snow Peaks & Rafting)
                      </option>
                      <option value="Romantic & Honeymoon Vistas">
                        💖 Romantic & Honeymoon (Lakes, Candlelight & Vistas)
                      </option>
                      <option value="Historical & Heritage Exploration">
                        🏛️ Historical Forts & UNESCO Heritage (Palaces & Ruins)
                      </option>
                      <option value="Mountains & Scenic View Points">
                        🏔️ Nature, Hills & Scenic Peaks (Valleys, Flora & Waterfalls)
                      </option>
                      <option value="Beaches & Coastal Relaxation">
                        🏖️ Beaches & Coastal Relaxation (Golden Sands & Shacks)
                      </option>
                      <option value="Party & Vibrant Nightlife">
                        🎉 Party & Vibrant Nightlife (Beach Clubs & Live Music)
                      </option>
                      <option value="Eco-Tourism & Nature Trails">
                        🌿 Eco-Tourism & Wildlife Sanctuaries
                      </option>
                      <option value="Food & Culinary Trail">
                        🍲 Food & Culinary Trail (Street Food & Regional Thali)
                      </option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Level</Label>
                    <Select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="mt-1"
                    >
                      <option value="Budget Yatri (₹15,000 / $180)">Budget Yatri (₹15,000 / $180)</option>
                      <option value="Comfort (₹35,000 / $420)">Comfort (₹35,000 / $420)</option>
                      <option value="Premium (₹60,000 / $720)">Premium (₹60,000 / $720)</option>
                      <option value="Luxury VIP (₹1,00,000+ / $1200+)">Luxury VIP (₹1,00,000+ / $1200+)</option>
                    </Select>
                  </div>
                </div>

                {/* Activities checklist */}
                <div>
                  <Label>Preferred Highlights (Select all that apply)</Label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {[
                      'Sacred Temple Darshan & Aarti',
                      'Jyotirlinga Abhishek & Pujan',
                      'UNESCO Historical Forts & Palaces',
                      'High-Altitude Mountain View Points',
                      'Golden Beaches & Water Sports',
                      'Eco-Forest Trails & Tea Gardens',
                      'Sunrise & Sunset Photography Points',
                      'Heritage River Boat Cruises',
                    ].map((act) => {
                      const selected = formData.activities.includes(act);
                      return (
                        <button
                          key={act}
                          type="button"
                          onClick={() => handleActivityToggle(act)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all cursor-pointer ${
                            selected
                              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-2xs'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{act}</span>
                          {selected && <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Special Requirements */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900">Step 5 — Special Requirements & Pujan</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Satvik diet, temple accessibility, and special puja requests.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="foodPreference">Food & Dietary Preferences</Label>
                    <Select
                      id="foodPreference"
                      value={formData.foodPreference}
                      onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                      className="mt-1"
                    >
                      <option value="Pure Satvik Vegetarian (No Onion/Garlic option)">
                        Pure Satvik Vegetarian (No Onion/Garlic option)
                      </option>
                      <option value="Pure Vegetarian">Pure Vegetarian</option>
                      <option value="Jain Food (Strict Tithi & No Root Vegetables)">
                        Jain Food (Strict Tithi & No Root Vegetables)
                      </option>
                      <option value="Coastal Seafood & Multi-Cuisine">
                        Coastal Seafood & Multi-Cuisine
                      </option>
                      <option value="Vegan Friendly">Vegan Friendly</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="accessibility">Mobility, Trekking & Temple Steps</Label>
                    <Select
                      id="accessibility"
                      value={formData.accessibility}
                      onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
                      className="mt-1"
                    >
                      <option value="Moderate Pace & Mountain Walking">
                        Moderate Pace & Mountain Walking
                      </option>
                      <option value="Pony / Palki / Doli Assistance Needed for Treks">
                        Pony / Palki / Doli Assistance Needed for Mountain Temples
                      </option>
                      <option value="Wheelchair & Step-Free Accessible">
                        Wheelchair & Step-Free Accessible
                      </option>
                      <option value="Active Hiker (Able to do 15+ km mountain treks)">
                        Active Hiker (Able to do 15+ km mountain treks)
                      </option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalRequests">Special Puja & Viewpoint Requests</Label>
                    <Input
                      id="additionalRequests"
                      value={formData.additionalRequests}
                      onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
                      placeholder="e.g. Early morning Mahakal Bhasma Aarti pass, sunset view point room"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {validationError && (
              <div className="mt-4 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {validationError}
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-1.5 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  className="font-bold flex items-center gap-1.5"
                >
                  Next Step <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleGenerate}
                  className="font-bold px-8 shadow-md shadow-brand-600/30 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" /> Generate My Itinerary
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

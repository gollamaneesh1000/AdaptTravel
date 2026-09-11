import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Sun,
  CloudSun,
  CloudSnow,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Droplets,
  Wind,
  CreditCard
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

export function MyTripsPage({ onNavigate }) {
  const { savedTrips, setCurrentTrip } = useTrip();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingTrips = savedTrips.filter((t) => t.type === 'upcoming' || t.status === 'Upcoming');
  const pastTrips = savedTrips.filter((t) => t.type === 'past' || t.status === 'Completed');

  const handleViewTrip = (trip) => {
    setCurrentTrip(trip);
    onNavigate('itinerary');
  };

  const getWeatherForTrip = (dest) => {
    const d = (dest || '').toLowerCase();
    if (d.includes('kedarnath') || d.includes('chardham')) {
      return { temp: '7°C', condition: 'Crisp Himalayan Chill', rain: '5%', wind: '16 km/h', icon: CloudSnow };
    }
    if (d.includes('varanasi') || d.includes('kashi')) {
      return { temp: '26°C', condition: 'Pleasant & Mild Ghat Breeze', rain: '0%', wind: '8 km/h', icon: Sun };
    }
    if (d.includes('hampi')) {
      return { temp: '28°C', condition: 'Sunny & Crisp Heritage Breeze', rain: '0%', wind: '11 km/h', icon: Sun };
    }
    if (d.includes('ladakh') || d.includes('leh')) {
      return { temp: '11°C', condition: 'High Altitude Alpine Air', rain: '0%', wind: '22 km/h', icon: Sun };
    }
    if (d.includes('manali')) {
      return { temp: '14°C', condition: 'Crisp Mountain Breeze', rain: '10%', wind: '12 km/h', icon: CloudSnow };
    }
    if (d.includes('ooty')) {
      return { temp: '16°C', condition: 'Misty & Fresh Tea Hills', rain: '5%', wind: '10 km/h', icon: CloudSun };
    }
    if (d.includes('jaipur')) {
      return { temp: '26°C', condition: 'Warm & Clear Sky', rain: '0%', wind: '9 km/h', icon: Sun };
    }
    if (d.includes('kerala')) {
      return { temp: '27°C', condition: 'Tropical Backwater Breeze', rain: '20%', wind: '15 km/h', icon: CloudSun };
    }
    return { temp: '29°C', condition: 'Sunny & Coastal Breeze', rain: '0%', wind: '14 km/h', icon: Sun };
  };

  const renderTripCard = (trip) => {
    const weather = getWeatherForTrip(trip.destination);
    const WeatherIcon = weather.icon;

    return (
      <Card
        key={trip.id}
        className="border-gray-200/90 shadow-soft hover:shadow-card transition-all rounded-2xl overflow-hidden bg-white mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Photo banner */}
          <div className="md:col-span-4 relative h-56 md:h-auto overflow-hidden bg-gray-100">
            <img
              src={trip.destinationImage}
              alt={trip.destination}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge
                variant={trip.status === 'Completed' ? 'secondary' : 'primary'}
                className="font-bold backdrop-blur-xs"
              >
                {trip.status}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-xs text-white/80 font-medium">Destination</p>
              <h3 className="text-xl font-extrabold">{trip.destination}</h3>
            </div>
          </div>

          {/* Details Column */}
          <CardContent className="md:col-span-8 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  {trip.title}
                </h3>
                <span className="text-base font-extrabold text-brand-600">
                  ₹{(trip.costBreakdown?.total || 35000).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2 flex-wrap gap-y-1">
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <Calendar className="h-3.5 w-3.5 text-brand-600" />
                  {trip.startDate} – {trip.endDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {trip.durationDays || 4} Days
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  {trip.travelers?.adults || 2} Adults
                </span>
              </div>

              {/* Weather Details Box for every trip (as explicitly requested!) */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <WeatherIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      Trip Destination Weather
                    </span>
                    <p className="font-extrabold text-gray-900 text-sm">
                      {weather.temp} • {weather.condition}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3.5 w-3.5 text-blue-500" /> Rain: <strong>{weather.rain}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-3.5 w-3.5 text-gray-500" /> Wind: <strong>{weather.wind}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                Adaptive monitoring active
              </span>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentTrip(trip);
                    onNavigate('payment');
                  }}
                  className="font-semibold text-xs flex items-center gap-1 text-gray-700"
                >
                  <CreditCard className="h-3.5 w-3.5 text-brand-600" />
                  Payment Details
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewTrip(trip)}
                  className="font-semibold text-xs"
                >
                  View Itinerary
                </Button>

                {trip.status !== 'Completed' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setCurrentTrip(trip);
                      onNavigate('itinerary');
                    }}
                    className="font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Adapt Trip
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Trip Vault</Badge>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Trips & Itineraries
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review current schedules, weather forecasts, and adapted plans
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('planner')}
            className="font-bold flex items-center gap-1.5 shadow-sm shadow-brand-600/30 self-start sm:self-auto"
          >
            <Sparkles className="h-4 w-4" />
            Plan New Trip
          </Button>
        </div>

        {/* Tabs: Upcoming vs Past */}
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Upcoming Trips ({upcomingTrips.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'past'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Past Trips ({pastTrips.length})
          </button>
        </div>

        {/* Trips List */}
        <div>
          {activeTab === 'upcoming' ? (
            upcomingTrips.length === 0 ? (
              <Card className="p-12 text-center bg-white rounded-2xl border-gray-200">
                <p className="text-sm text-gray-500">No upcoming trips planned yet.</p>
                <Button variant="primary" size="sm" onClick={() => onNavigate('planner')} className="mt-4 font-bold">
                  Create Your First Trip
                </Button>
              </Card>
            ) : (
              upcomingTrips.map(renderTripCard)
            )
          ) : (
            pastTrips.map(renderTripCard)
          )}
        </div>
      </div>
    </div>
  );
}

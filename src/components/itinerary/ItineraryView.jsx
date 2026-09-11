import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Share2,
  Printer,
  Download,
  Plus
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ActivityCard } from './ActivityCard';
import { AdaptTripDialog } from './AdaptTripDialog';
import { AdaptationDiffModal } from './AdaptationDiffModal';
import { CostCalculatorCard } from './CostCalculatorCard';

export function ItineraryView({ onNavigate }) {
  const {
    currentTrip,
    adaptTrip,
    acceptAdaptation,
    undoAdaptation,
    activeAdaptation,
    closeAdaptationPreview,
    removeActivity,
    isAdapting,
  } = useTrip();

  const [activeDayTab, setActiveDayTab] = useState(1);
  const [isAdaptDialogOpen, setIsAdaptDialogOpen] = useState(false);

  // Weather forecast for this destination
  const weatherDetails = {
    currentTemp: currentTrip.weather?.temp || '29°C',
    condition: currentTrip.weather?.condition || 'Sunny & Pleasant',
    humidity: '68%',
    precipitation: '0%',
    windSpeed: '14 km/h Coastal Breeze',
    uvIndex: 'Moderate (6/10)',
    bestOutdoorHours: '07:30 AM – 11:00 AM & 04:30 PM – 07:00 PM',
    dailyForecast: [
      { day: 'Day 1', temp: '29°C', condition: 'Sunny', icon: Sun },
      { day: 'Day 2', temp: '28°C', condition: 'Clear Sky', icon: Sun },
      { day: 'Day 3', temp: '30°C', condition: 'Breezy', icon: CloudSun },
      { day: 'Day 4', temp: '29°C', condition: 'Tropical Warmth', icon: Sun },
      { day: 'Day 5', temp: '31°C', condition: 'Clear', icon: Sun },
    ],
  };

  const currentDayData =
    currentTrip.days.find((d) => d.dayNumber === activeDayTab) || currentTrip.days[0];

  const handleScenarioSelected = (scenarioId, customDetails) => {
    setIsAdaptDialogOpen(false);
    adaptTrip(scenarioId, customDetails);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20">
      {/* Top Hero Banner */}
      <div className="relative bg-gray-900 text-white overflow-hidden py-10 sm:py-14">
        <img
          src={currentTrip.destinationImage}
          alt={currentTrip.destination}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <Badge variant="primary" className="bg-brand-600 text-white border-0 font-bold">
                  {currentTrip.durationDays} Days / {currentTrip.durationDays - 1} Nights
                </Badge>
                {currentTrip.travelMode && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 font-bold text-xs">
                    Mode: {currentTrip.travelMode}
                  </Badge>
                )}
                {currentTrip.travelStyle && (
                  <Badge variant="outline" className="bg-white/10 text-brand-200 border-white/20 font-medium text-xs">
                    Vibe: {currentTrip.travelStyle.split('(')[0].trim()}
                  </Badge>
                )}
                {currentTrip.isAdapted && (
                  <Badge variant="warning" className="bg-amber-400 text-amber-950 font-bold border-0 animate-pulse">
                    ⚡ Adapted by Adapt AI
                  </Badge>
                )}
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {currentTrip.startDate} – {currentTrip.endDate}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {currentTrip.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
                {currentTrip.transportSummary}
              </p>
            </div>

            {/* Signature "Adapt My Trip" Button */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsAdaptDialogOpen(true)}
                className="font-extrabold text-sm sm:text-base px-6 sm:px-8 shadow-lg shadow-brand-600/40 hover:shadow-brand-600/60 transition-all flex items-center gap-2 border-2 border-white/20"
              >
                <Sparkles className="h-5 w-5 animate-spin [animation-duration:6s]" />
                <span>Adapt My Trip</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('help')}
                className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Ask Loco AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Weather Card Details (Requested for every trip!) */}
        <Card className="shadow-card border-gray-200/90 bg-white rounded-2xl mb-8 overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Current Weather */}
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Sun className="h-8 w-8 animate-spin [animation-duration:12s]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      {weatherDetails.currentTemp}
                    </span>
                    <Badge variant="primary" className="text-xs font-semibold">
                      {weatherDetails.condition}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Live weather conditions for {currentTrip.destination}
                  </p>
                </div>
              </div>

              {/* Weather Telemetry stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Droplets className="h-3.5 w-3.5 text-blue-500" /> Humidity
                  </span>
                  <p className="font-bold text-gray-900 mt-0.5">{weatherDetails.humidity}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 flex items-center gap-1">
                    <CloudRain className="h-3.5 w-3.5 text-emerald-500" /> Rain Chance
                  </span>
                  <p className="font-bold text-gray-900 mt-0.5">{weatherDetails.precipitation}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Wind className="h-3.5 w-3.5 text-purple-500" /> Wind
                  </span>
                  <p className="font-bold text-gray-900 mt-0.5">{weatherDetails.windSpeed}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Sun className="h-3.5 w-3.5 text-amber-500" /> UV Index
                  </span>
                  <p className="font-bold text-gray-900 mt-0.5">{weatherDetails.uvIndex}</p>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast Row */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between overflow-x-auto no-scrollbar gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
                5-Day Forecast:
              </span>
              <div className="flex items-center space-x-3 text-xs shrink-0">
                {weatherDetails.dailyForecast.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/60"
                    >
                      <Icon className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-semibold text-gray-700">{f.day}:</span>
                      <span className="font-bold text-gray-900">{f.temp}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Day Activities List (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Day Selector Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
              {currentTrip.days.map((d) => {
                const isActive = activeDayTab === d.dayNumber;
                return (
                  <button
                    key={d.dayNumber}
                    onClick={() => setActiveDayTab(d.dayNumber)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Day {d.dayNumber}
                    <span className="block text-[10px] font-normal opacity-80">{d.date}</span>
                  </button>
                );
              })}
            </div>

            {/* Day Header Info */}
            <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  Day {currentDayData.dayNumber} Focus
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-0.5">
                  {currentDayData.theme}
                </h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                {currentDayData.activities?.length || 0} Activities
              </Badge>
            </div>

            {/* Activities Timeline */}
            <div className="mt-4">
              {currentDayData.activities?.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  dayIndex={currentDayData.dayNumber - 1}
                  onRemove={removeActivity}
                />
              ))}
            </div>
          </div>

          {/* Sidebar (Cost Calculator & Loco Assistant) */}
          <div className="space-y-6">
            <CostCalculatorCard
              costBreakdown={currentTrip.costBreakdown}
              onNavigate={onNavigate}
            />

            {/* Loco Helper Promo */}
            <Card className="border-gray-200/90 shadow-soft bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl p-6">
              <h4 className="font-extrabold text-lg">Need to modify this trip?</h4>
              <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                Loco can reschedule flight delays, cancel hotel nights with zero fees, or find alternative activities.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('help')}
                className="mt-4 w-full text-xs font-bold bg-white text-brand-700 hover:bg-gray-100"
              >
                Chat with Loco Support
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Disruption Scenarios Dialog */}
      <AdaptTripDialog
        open={isAdaptDialogOpen}
        onOpenChange={setIsAdaptDialogOpen}
        onSelectScenario={handleScenarioSelected}
        isAdapting={isAdapting}
      />

      {/* Before vs After Adaptation Modal */}
      <AdaptationDiffModal
        open={Boolean(activeAdaptation)}
        adaptationData={activeAdaptation}
        onAccept={acceptAdaptation}
        onUndo={undoAdaptation}
        onClose={closeAdaptationPreview}
      />
    </div>
  );
}

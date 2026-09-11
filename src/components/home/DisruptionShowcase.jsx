import React, { useState } from 'react';
import { AlertTriangle, Sparkles, ArrowRight, CheckCircle2, Clock, MapPin, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function DisruptionShowcase({ onNavigate }) {
  const [selectedScenario, setSelectedScenario] = useState('flight_delay');

  const scenarios = {
    flight_delay: {
      name: 'Flight Delayed by 4h',
      trigger: 'IndiGo 6E-5382 delayed from 11:00 AM to 03:00 PM due to airspace congestion.',
      before: [
        { time: '02:00 PM', title: 'Museum Heritage Tour', note: 'Scheduled admission' },
        { time: '05:00 PM', title: 'Sinquerim Beach Walk', note: 'Sunset sightseeing' },
        { time: '08:00 PM', title: 'Seafood Dinner by the Shore', note: 'Table reserved' },
      ],
      after: [
        { time: '06:00 PM', title: 'Late Resort Check-in & Refresh', note: 'Re-routed cab' },
        { time: '07:00 PM', title: 'Sunset Waves & Evening Beach Walk', note: 'Preserved experience' },
        { time: '09:00 PM', title: 'Late Candlelight Seafood Dinner', note: 'Reservation shifted' },
      ],
      impact: '0 missed highlights • Airport cab driver re-synced • Zero cancellation penalties',
    },
    weather: {
      name: 'Heavy Monsoon Squall',
      trigger: 'Heavy rain alert issued for coastal beaches between 10:00 AM and 03:00 PM.',
      before: [
        { time: '10:00 AM', title: 'Jet Ski & Parasailing at Baga', note: 'Outdoor beach' },
        { time: '01:30 PM', title: 'Open-Air Beach Shack Lunch', note: 'Britto’s beach tables' },
        { time: '04:00 PM', title: 'Anjuna Flea Market Walk', note: 'Open market stalls' },
      ],
      after: [
        { time: '10:30 AM', title: 'Indoor Tropical Ayurvedic Spa Session', note: 'Substituted for water sports' },
        { time: '01:30 PM', title: 'Rain-View Indoor Jazz Bistro Lunch', note: 'Covered seating' },
        { time: '04:00 PM', title: 'Goa Chitra Heritage Art Museum Tour', note: 'Enclosed cultural gallery' },
      ],
      impact: 'Swapped outdoor risks for 5★ indoor cultural experiences • Zero wet shoes',
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" className="mb-2">
            The Core Innovation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How Adapt Travel Agent Solves Real-World Disruptions
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Other travel tools leave you stranded when plans break. Adapt Travel Agent automatically recalculates timelines, shifts reservations, and preserves your vacation.
          </p>

          {/* Scenario Selector Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedScenario('flight_delay')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                selectedScenario === 'flight_delay'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-orange-glow'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-orange-500/40'
              }`}
            >
              Scenario 1: Flight Delayed 4 Hours
            </button>
            <button
              onClick={() => setSelectedScenario('weather')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                selectedScenario === 'weather'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-orange-glow'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-orange-500/40'
              }`}
            >
              Scenario 2: Sudden Severe Rain Alert
            </button>
          </div>
        </div>

        {/* Comparison Board */}
        <div className="max-w-4xl mx-auto bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8">
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/60 flex items-start space-x-3 mb-6">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400">Disruption Detected</p>
              <p className="text-sm font-semibold text-white mt-0.5">{current.trigger}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-xl p-5 bg-zinc-950 border border-zinc-800">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Original Plan (Broken)</span>
                <span className="text-xs font-semibold text-red-400">Affected by Delay</span>
              </div>
              <div className="space-y-3">
                {current.before.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 opacity-70">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-zinc-500 line-through">{item.time}</span>
                      <span className="text-[10px] text-red-400 font-semibold">Will Miss</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-400 mt-1 line-through">{item.title}</p>
                    <p className="text-[11px] text-zinc-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="rounded-xl p-5 bg-orange-950/20 border border-orange-500/40 shadow-xs relative">
              <div className="flex items-center justify-between pb-3 border-b border-orange-500/30 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" /> Adapted by Adapt AI
                </span>
                <Badge variant="success" className="text-[10px]">Optimized</Badge>
              </div>
              <div className="space-y-3">
                {current.after.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-orange-500/30 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-orange-400">{item.time}</span>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="h-3 w-3" /> Re-aligned
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white mt-1">{item.title}</p>
                    <p className="text-[11px] text-zinc-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{current.impact}</span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('itinerary')}
              className="font-black flex items-center gap-1.5 shadow-md shadow-orange-500/25"
            >
              Test Live Adaptive Itinerary <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

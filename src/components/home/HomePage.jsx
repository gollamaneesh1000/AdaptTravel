import React from 'react';
import { HeroSection } from './HeroSection';
import { FirstPageAuth } from './FirstPageAuth';
import { QuickActions } from './QuickActions';
import { DisruptionShowcase } from './DisruptionShowcase';
import { FeaturedDestinations } from './FeaturedDestinations';
import { useTrip } from '../../context/TripContext';
import { ShieldCheck, HeartHandshake, Zap, Award } from 'lucide-react';
import { validateTripRoute } from '../../lib/locationValidator';

export function HomePage({ onNavigate }) {
  const { generateTrip } = useTrip();

  const handleQuickPlan = (planParams) => {
    const check = validateTripRoute(planParams?.from, planParams?.destination, planParams?.departureDate, planParams?.returnDate);
    if (!check.isValid) {
      alert(check.error);
      return;
    }
    generateTrip(planParams, () => {
      onNavigate('itinerary');
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Trip Planning Card */}
      <HeroSection onNavigate={onNavigate} onQuickPlan={handleQuickPlan} />

      {/* First Page Sign Up & Login Module */}
      <FirstPageAuth onNavigate={onNavigate} />

      {/* Quick Actions Grid */}
      <QuickActions onNavigate={onNavigate} />

      {/* Disruption Adaptation Feature Highlight */}
      <DisruptionShowcase onNavigate={onNavigate} />

      {/* Handpicked Destinations */}
      <FeaturedDestinations onNavigate={onNavigate} />

      {/* Trust & Guarantee Section */}
      <section className="py-12 bg-zinc-950 border-t border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 transition-colors shadow-2xs">
              <div className="p-2.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30 shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Instant Adaptation</h4>
                <p className="text-xs text-zinc-400 mt-1">Automatic rescheduling during flight delays and bad weather.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 transition-colors shadow-2xs">
              <div className="p-2.5 rounded-lg bg-sky-950/60 text-sky-400 border border-sky-800/40 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Verified Bookings</h4>
                <p className="text-xs text-zinc-400 mt-1">Direct hotel and flight integration with zero hidden surcharges.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 transition-colors shadow-2xs">
              <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Loco AI Concierge</h4>
                <p className="text-xs text-zinc-400 mt-1">24/7 dedicated customer service assistant for instant help.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 transition-colors shadow-2xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Zero Cancellation Fees</h4>
                <p className="text-xs text-zinc-400 mt-1">Flexible cancellation waivers backed by Adapt Travel Agent.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

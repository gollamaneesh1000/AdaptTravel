import React from 'react';
import { Compass, Heart, Shield, Award, Mail, Phone, MapPin } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-black font-black shadow-md shadow-orange-500/30">
                <Compass className="h-5 w-5 text-black" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Adapt <span className="text-orange-500">Travel Agent</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Your intelligent AI travel platform that doesn't just build itineraries — it automatically adapts them when flights delay, weather strikes, or closures happen.
            </p>
            <div className="flex items-center space-x-3 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300">
                <Shield className="h-3.5 w-3.5 text-orange-500" /> 100% Verified Bookings
              </span>
              <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300">
                <Award className="h-3.5 w-3.5 text-orange-500" /> AI Powered by Loco
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3.5">Plan & Discover</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => onNavigate('planner')} className="hover:text-orange-400 transition-colors">AI Trip Planner</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-orange-400 transition-colors">Explore Destinations</button></li>
              <li><button onClick={() => onNavigate('hotels')} className="hover:text-orange-400 transition-colors">Luxury & Boutique Hotels</button></li>
              <li><button onClick={() => onNavigate('transport')} className="hover:text-orange-400 transition-colors">Flights & Express Trains</button></li>
              <li><button onClick={() => onNavigate('itinerary')} className="hover:text-orange-400 transition-colors">Live Adaptive Itinerary</button></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3.5">My Account</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => onNavigate('trips')} className="hover:text-orange-400 transition-colors">Upcoming Trips</button></li>
              <li><button onClick={() => onNavigate('bookings')} className="hover:text-orange-400 transition-colors">Manage Bookings</button></li>
              <li><button onClick={() => onNavigate('profile')} className="hover:text-orange-400 transition-colors">Profile & Preferences</button></li>
              <li><button onClick={() => onNavigate('payment')} className="hover:text-orange-400 transition-colors">Payment Methods</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3.5">Help & Loco AI</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => onNavigate('help')} className="hover:text-orange-400 transition-colors font-medium text-orange-500">Loco AI Chat Assistant</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-orange-400 transition-colors">Disruption Support</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-orange-400 transition-colors">Cancellation Guidelines</button></li>
              <li><span className="text-zinc-500">24/7 Concierge Hotline</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© 2026 Adapt Travel Agent. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-orange-500 fill-orange-500" /> for Hackathon & Product Demonstrations
          </p>
        </div>
      </div>
    </footer>
  );
}

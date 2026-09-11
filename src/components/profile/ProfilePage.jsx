import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Compass,
  Heart,
  Wallet,
  Plane,
  Hotel,
  LogOut,
  Save,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function ProfilePage({ onNavigate }) {
  const { authUser, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: authUser?.name || 'Aarav Sharma',
    email: authUser?.email || 'aarav.sharma@example.com',
    phone: authUser?.phone || '+91 98765 43210',
    travelStyle: authUser?.travelStyle || 'Romantic & Cultural',
    budget: authUser?.budget || 'Comfort (₹35,000 - ₹60,000)',
    preferredTransport: authUser?.preferredTransport || 'Flights & Private Cabs',
    accommodation: authUser?.accommodation || 'Boutique Resorts & 4★ Heritage',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Member Profile</Badge>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Account & Preferences
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Personalize how Adapt AI customizes and adapts your journeys
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 self-start sm:self-auto flex items-center gap-1.5"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="border-gray-200/90 shadow-soft bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* Top User Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b border-gray-100">
              <Avatar className="h-24 w-24 ring-4 ring-brand-100 shadow-soft">
                <AvatarImage src={authUser?.avatar} alt={authUser?.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {authUser?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">{authUser?.name}</h2>
                  <Badge variant="primary" className="text-xs">
                    {authUser?.role || 'Explorer Member'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{authUser?.email}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-3 text-xs text-gray-600 pt-1">
                  <span>Loyalty Points: <strong className="text-brand-600 font-bold">{authUser?.loyaltyPoints || 3450} pts</strong></span>
                  <span>•</span>
                  <span>Active Trips: <strong className="text-gray-900 font-bold">1 Upcoming</strong></span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="mt-8 space-y-6">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <User className="h-4 w-4 text-brand-600" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 pt-4 border-t border-gray-100">
                <Compass className="h-4 w-4 text-brand-600" /> Travel Adaptation Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="travelStyle">Default Travel Style</Label>
                  <Input
                    id="travelStyle"
                    value={formData.travelStyle}
                    onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Preferred Budget Tier</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="transport">Preferred Transit Mode</Label>
                  <Input
                    id="transport"
                    value={formData.preferredTransport}
                    onChange={(e) => setFormData({ ...formData, preferredTransport: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="accommodation">Accommodation Preference</Label>
                  <Input
                    id="accommodation"
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Saved Alert */}
              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Profile changes saved successfully!</span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="font-bold flex items-center gap-2 px-6 shadow-sm shadow-brand-600/30"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


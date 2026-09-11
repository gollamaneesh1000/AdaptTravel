import React, { useState, useEffect } from 'react';
import { Compass, User, Mail, Phone, Lock, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { OtpVerificationModal } from './OtpVerificationModal';

export function SignUpPage({ onNavigate }) {
  const { isLoggedIn, sendOtp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  // If already logged in, immediately redirect to Home
  useEffect(() => {
    if (isLoggedIn) {
      onNavigate('home');
    }
  }, [isLoggedIn, onNavigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Trigger OTP flow before account creation is completed
    sendOtp(formData.email.trim(), formData);
    setIsOtpOpen(true);
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900/80 to-zinc-950">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-zinc-950 shadow-xl shadow-orange-500/30 mb-3 hover:scale-105 transition-transform">
            <Compass className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Adapt Account</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Join thousands of travelers with smart AI itinerary adaptation
          </p>
        </div>

        <Card className="shadow-2xl border-zinc-800/90 rounded-2xl bg-zinc-900/95 overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 mt-4"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center text-xs text-gray-500 pt-3">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  Log In
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <OtpVerificationModal
        open={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        onSuccess={() => onNavigate('home')}
        onChangeContact={() => setIsOtpOpen(false)}
      />
    </div>
  );
}

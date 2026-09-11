import React, { useState, useEffect } from 'react';
import { Compass, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Sparkles, User, Flame, Mountain, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function LoginPage({ onNavigate }) {
  const { isLoggedIn, loginDirect } = useAuth();
  const [identifier, setIdentifier] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // If already logged in, immediately redirect to Home
  useEffect(() => {
    if (isLoggedIn) {
      onNavigate('home');
    }
  }, [isLoggedIn, onNavigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or phone number.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    // Direct Instant Sign In without OTP requirement
    loginDirect();
    onNavigate('home');
  };

  const handleQuickDemoLogin = () => {
    loginDirect();
    onNavigate('home');
  };

  const handleContinueAsGuest = () => {
    onNavigate('home');
  };

  const handleForgotPassword = () => {
    setResetSent(true);
    setTimeout(() => setResetSent(false), 4000);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900/80 to-zinc-950">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-zinc-950 shadow-xl shadow-orange-500/30 mb-3 hover:scale-105 transition-transform">
            <Compass className="h-8 w-8 text-black" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-400 mb-2">
            <Sparkles className="h-3 w-3 text-orange-400" /> India's Premier AI Travel Platform
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Sign In to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Adapt Travel</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            Autonomous itineraries, Chardham darshans, and Loco AI disruption agent
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-2xl border-zinc-800/90 rounded-2xl bg-zinc-900/95 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {resetSent && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Password reset link sent to your registered contact!</span>
                </div>
              )}

              {/* Identifier Input */}
              <div>
                <Label htmlFor="identifier" className="text-xs font-bold text-zinc-300">
                  Email Address or Mobile Number
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@example.com or +91 9876543210"
                    className="pl-10 text-sm font-medium"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="loginPassword" className="text-xs font-bold text-zinc-300">
                    Account Password
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative mt-1">
                  <Input
                    id="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 text-sm font-medium"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error && <p className="text-xs text-red-400 mt-1.5 font-medium">{error}</p>}
              </div>

              {/* Direct Instant Sign In Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 py-3 cursor-pointer"
              >
                <span>Sign In Directly</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-500 font-bold">Fast Access Options</span>
                </div>
              </div>

              {/* One-Click Demo Login */}
              <Button
                type="button"
                variant="secondary"
                onClick={handleQuickDemoLogin}
                className="w-full text-xs font-bold flex items-center justify-center gap-2 py-2.5 rounded-xl cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-orange-400 shrink-0" />
                <span>One-Click Demo Login (Aarav Sharma)</span>
              </Button>

              {/* Continue as Guest */}
              <Button
                type="button"
                variant="outline"
                onClick={handleContinueAsGuest}
                className="w-full text-xs font-semibold flex items-center justify-center gap-1.5 py-2 cursor-pointer"
              >
                <span>Continue as Guest (Explore Destinations First)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="font-bold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Feature badges row */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium">
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-2xs flex flex-col items-center">
            <Flame className="h-4 w-4 text-orange-400 mb-1" />
            <span className="font-bold text-white">35+ Sacred Dhams</span>
            <span className="text-[10px] text-zinc-500">12 Jyotirlingas</span>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-2xs flex flex-col items-center">
            <Shield className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="font-bold text-white">Adapt AI Shield</span>
            <span className="text-[10px] text-zinc-500">Weather & Flights</span>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-2xs flex flex-col items-center">
            <Mountain className="h-4 w-4 text-sky-400 mb-1" />
            <span className="font-bold text-white">Viewpoints</span>
            <span className="text-[10px] text-zinc-500">Peaks & Beaches</span>
          </div>
        </div>

        {/* Security assurance */}
        <div className="flex items-center justify-center space-x-2 text-xs text-zinc-500">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted • PCI-DSS Compliant</span>
        </div>
      </div>
    </div>
  );
}

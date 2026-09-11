import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  Mail,
  User,
  CheckCircle,
  Eye,
  EyeOff,
  KeyRound,
  Compass,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent } from '../ui/dialog';
import { OtpVerificationModal } from '../auth/OtpVerificationModal';

export function FirstPageAuth({ onNavigate }) {
  const {
    isLoggedIn,
    authUser,
    loginDirect,
    sendOtp,
    logout
  } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('aarav.sharma@example.com');
  const [loginPassword, setLoginPassword] = useState('Password@123');
  const [loginError, setLoginError] = useState('');
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState('');
  const [otpLoginSuccessToast, setOtpLoginSuccessToast] = useState(false);

  // Sign Up Form State
  const [signupForm, setSignupForm] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    travelStyle: 'Spiritual & Temple Pilgrimage',
    password: 'Password@123',
  });
  const [signupError, setSignupError] = useState('');

  // Handle Login Submit (Standard password/OTP login)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your mobile number or email.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your account password.');
      return;
    }
    setLoginError('');
    // Direct sign in with credentials
    loginDirect();
  };

  // Handle Forgot Password Click -> Direct notification without OTP
  const handleForgotPasswordClick = () => {
    setLoginError('');
    setForgotPasswordMsg('Password reset instructions sent to your registered email or phone! You can also sign in directly below.');
    setTimeout(() => setForgotPasswordMsg(''), 5000);
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.name.trim() || !signupForm.phone.trim() || !signupForm.email.trim()) {
      setSignupError('Please fill out your name, mobile, and email.');
      return;
    }
    setSignupError('');
    sendOtp(signupForm.phone.trim(), signupForm);
    setIsOtpOpen(true);
  };

  return (
    <section className="py-12 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-400 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" /> Instant First-Page Onboarding
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sign In or Create Your Account
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Access autonomous trip planning, save sacred routes, and get instant rescheduling when disruptions hit.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-inner max-w-sm w-full">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black shadow-orange-glow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
              {isLoggedIn && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black shadow-orange-glow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Toast Notification for OTP Recovery Login */}
        {otpLoginSuccessToast && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-800 flex items-center justify-center gap-2 shadow-xs animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Identity verified via OTP! You are now securely logged in.</span>
          </div>
        )}

        {/* Tab 1: Log In */}
        {activeTab === 'login' && (
          <div className="max-w-xl mx-auto animate-fade-in">
            <Card className="border-zinc-800/90 shadow-2xl rounded-2xl bg-zinc-900/95 overflow-hidden p-6 sm:p-8">
              {isLoggedIn ? (
                <div className="space-y-5 text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-950/60 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <Badge variant="primary" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs mb-1.5">
                      Active Signed In Session
                    </Badge>
                    <h3 className="text-xl font-bold text-white">
                      Welcome back, {authUser?.name || 'Aarav Sharma'}!
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {authUser?.phone} • {authUser?.email}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigate('planner')}
                      className="font-bold text-xs shadow-md shadow-orange-500/25"
                    >
                      Plan New Trip <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('explore')}
                      className="font-bold text-xs"
                    >
                      Explore 28 States
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="font-bold text-xs text-red-400 border-red-800/60 hover:bg-red-950/40"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1 text-center sm:text-left mb-3">
                    <h3 className="text-lg font-bold text-white">Sign in to Your Account</h3>
                    <p className="text-xs text-zinc-400">
                      Enter your mobile number or email to access your itineraries.
                    </p>
                  </div>

                  {forgotPasswordMsg && (
                    <div className="p-3 bg-emerald-950/60 text-emerald-300 text-xs rounded-xl border border-emerald-700/50 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{forgotPasswordMsg}</span>
                    </div>
                  )}

                  {loginError && (
                    <div className="p-3 bg-red-950/60 text-red-300 text-xs rounded-xl border border-red-700/50">
                      {loginError}
                    </div>
                  )}

                  {/* Identifier */}
                  <div>
                    <Label htmlFor="firstPageLoginId" className="text-xs font-semibold text-zinc-300">
                      Mobile Number or Email
                    </Label>
                    <div className="relative mt-1">
                      <Smartphone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="firstPageLoginId"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. +91 98765 43210 or your email"
                        className="pl-9 font-medium"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="firstPagePassword" className="text-xs font-semibold text-zinc-300">
                        Password
                      </Label>
                      {/* Forgot Password Link Button */}
                      <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="text-xs font-bold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <KeyRound className="h-3 w-3" />
                        <span>Forgot Password?</span>
                      </button>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="firstPagePassword"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-9 pr-10 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 py-3"
                  >
                    <span>Sign In Directly</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  {/* Fast Access Section */}
                  <div className="relative my-3 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold text-zinc-500">
                      <span className="bg-zinc-900 px-2">Instant Demo Access</span>
                    </div>
                  </div>

                  {/* One-Click Demo Sign In */}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => loginDirect()}
                    className="w-full text-xs font-bold flex items-center justify-center gap-1.5 py-2.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                    <span>1-Click Demo Login (Aarav Sharma)</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        )}

        {/* Tab 2: Sign Up */}
        {activeTab === 'signup' && (
          <div className="max-w-xl mx-auto animate-fade-in">
            <Card className="border-zinc-800/90 shadow-2xl rounded-2xl bg-zinc-900/95 overflow-hidden p-6 sm:p-8">
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-1 text-center sm:text-left mb-3">
                  <h3 className="text-lg font-bold text-white">Create Your Traveler Profile</h3>
                  <p className="text-xs text-zinc-400">
                    Join 120,000+ pilgrims and explorers traveling across India.
                  </p>
                </div>

                {signupError && (
                  <div className="p-3 bg-red-950/60 text-red-300 text-xs rounded-xl border border-red-700/50">
                    {signupError}
                  </div>
                )}

                <div>
                  <Label htmlFor="signupName" className="text-xs font-semibold text-zinc-300">
                    Full Name
                  </Label>
                  <div className="relative mt-1">
                    <User className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="signupName"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      placeholder="Aarav Sharma"
                      className="pl-9 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="signupPhone" className="text-xs font-semibold text-zinc-300">
                      Mobile Number (For OTP)
                    </Label>
                    <div className="relative mt-1">
                      <Smartphone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="signupPhone"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="pl-9 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupEmail" className="text-xs font-semibold text-zinc-300">
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="signupEmail"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        placeholder="aarav@example.com"
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="travelStyleSelect" className="text-xs font-semibold text-zinc-300">
                    Primary Travel Style
                  </Label>
                  <select
                    id="travelStyleSelect"
                    value={signupForm.travelStyle}
                    onChange={(e) => setSignupForm({ ...signupForm, travelStyle: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Spiritual & Temple Pilgrimage">🕉️ Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)</option>
                    <option value="Heritage & Historical Fortresses">🏛️ Heritage Forts & Royal UNESCO Palaces</option>
                    <option value="Himalayan & Mountain View Points">🏔️ High Altitude Passes & Scenic View Points</option>
                    <option value="Beaches & Coastal Shacks">🏖️ Coastal Havens & Tropical Beaches</option>
                    <option value="Eco-Sanctuaries & Wildlife Safaris">🌿 Wildlife Reserves & Tea Plantations</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="signupPass" className="text-xs font-semibold text-zinc-300">
                    Create Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="signupPass"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 py-3"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Mobile with OTP & Register</span>
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>



      {/* Reusable Universal OTP Modal */}
      <OtpVerificationModal
        open={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        onSuccess={() => {
          setOtpLoginSuccessToast(true);
          setTimeout(() => setOtpLoginSuccessToast(false), 5000);
        }}
      />
    </section>
  );
}

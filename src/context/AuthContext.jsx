import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/database.js';

const AuthContext = createContext();

const STORAGE_KEY = 'adapt_travel_agent_auth_v1';

const DEFAULT_USER = {
  id: 'usr-8821',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
  role: 'Explorer Member',
  loyaltyPoints: 3450,
  travelStyle: 'Romantic & Cultural',
  budget: 'Comfort (₹35,000 - ₹60,000)',
  preferredTransport: 'Flights & Private Cabs',
  accommodation: 'Boutique Resorts & 4★ Heritage',
  favoriteDestinations: ['Goa', 'Manali', 'Jaipur', 'Kerala'],
  dietaryPreference: 'Vegetarian Friendly & Coastal Seafood',
  primaryBank: null,
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isLoggedIn);
      }
    } catch (e) {
      console.error('Error reading auth state', e);
    }
    // Default to false so user starts on the Login page
    return false;
  });

  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.authUser) {
          return {
            ...parsed.authUser,
            primaryBank: null,
          };
        }
      }
    } catch (e) {
      console.error('Error reading user data', e);
    }
    return DEFAULT_USER;
  });


  // OTP flow states
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtp, setDemoOtp] = useState('682941');
  const [pendingIdentifier, setPendingIdentifier] = useState('');
  const [pendingUserData, setPendingUserData] = useState(null);
  const [otpTimer, setOtpTimer] = useState(30);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isLoggedIn,
          authUser,
        })
      );
    } catch (e) {
      console.error('Error saving auth state', e);
    }
  }, [isLoggedIn, authUser]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Send OTP (for login or signup)
  const sendOtp = (identifier, userData = null) => {
    // Generate random 6-digit OTP
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
    setPendingIdentifier(identifier);
    setPendingUserData(userData);
    setOtpSent(true);
    setOtpTimer(30);
    return generated;
  };

  // Resend OTP
  const resendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
    setOtpTimer(30);
    return generated;
  };

  // Verify OTP - Accepts generated OTP, 123456, or ANY 6-digit code for all phone numbers
  const verifyOtp = (enteredCode) => {
    const isNumeric6 = enteredCode && enteredCode.length === 6 && /^\d+$/.test(enteredCode);
    if (enteredCode === demoOtp || enteredCode === '123456' || isNumeric6) {
      let user = authUser;
      if (pendingUserData) {
        // Registration or update via signup
        const existing = pendingUserData.email 
          ? db.users.findByEmail(pendingUserData.email) 
          : (pendingUserData.phone ? db.users.findByPhone(pendingUserData.phone) : null);

        if (existing) {
          user = db.table('users').update(existing.id, {
            name: pendingUserData.name || existing.name,
            phone: pendingUserData.phone || existing.phone,
            email: pendingUserData.email || existing.email,
          }) || existing;
        } else {
          user = db.table('users').insert({
            ...DEFAULT_USER,
            id: `usr-${Date.now().toString(36)}`,
            name: pendingUserData.name || 'Traveler',
            email: pendingUserData.email || pendingIdentifier || 'traveler@example.com',
            phone: pendingUserData.phone || pendingIdentifier || '+91 98765 00000',
            role: 'Explorer Member',
            loyaltyPoints: 1000,
            createdAt: new Date().toISOString(),
          });
        }
      } else if (pendingIdentifier) {
        // Login by identifier
        const existing = pendingIdentifier.includes('@')
          ? db.users.findByEmail(pendingIdentifier)
          : db.users.findByPhone(pendingIdentifier);

        if (existing) {
          user = existing;
        } else {
          user = db.table('users').insert({
            ...DEFAULT_USER,
            id: `usr-${Date.now().toString(36)}`,
            name: 'Traveler',
            email: pendingIdentifier.includes('@') ? pendingIdentifier : authUser.email,
            phone: pendingIdentifier.includes('@') ? authUser.phone : pendingIdentifier,
            createdAt: new Date().toISOString(),
          });
        }
      }

      setAuthUser(user);
      setIsLoggedIn(true);
      setOtpSent(false);
      setPendingIdentifier('');
      setPendingUserData(null);
      return { success: true };
    }
    return { success: false, message: 'Invalid OTP code. Please enter 6 numeric digits.' };
  };

  // Direct login for quick testing
  const loginDirect = () => {
    const defaultFromDb = db.table('users').getById('usr-8821');
    const user = defaultFromDb || DEFAULT_USER;
    setIsLoggedIn(true);
    setAuthUser(user);
  };

  // Logout
  const logout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setPendingIdentifier('');
    setPendingUserData(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    setAuthUser((prev) => {
      const updated = {
        ...prev,
        ...updatedFields,
      };
      if (updated.id) {
        db.table('users').update(updated.id, updatedFields);
      }
      return updated;
    });
  };

  // Set Primary Bank Account
  const setPrimaryBank = (bankData) => {
    setAuthUser((prev) => ({
      ...prev,
      primaryBank: {
        ...(prev?.primaryBank || {}),
        ...bankData,
        isPrimary: true,
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authUser,
        otpSent,
        setOtpSent,
        demoOtp,
        pendingIdentifier,
        otpTimer,
        sendOtp,
        resendOtp,
        verifyOtp,
        loginDirect,
        logout,
        updateProfile,
        setPrimaryBank,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

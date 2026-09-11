import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, RotateCw, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function OtpVerificationModal({ open, onOpenChange, onSuccess, onChangeContact }) {
  const { demoOtp, pendingIdentifier, otpTimer, verifyOtp, resendOtp } = useAuth();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (open) {
      setDigits(['', '', '', '', '', '']);
      setError('');
      setIsSuccess(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    }
  }, [open]);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newDigits = [...digits];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setDigits(newDigits);
      setError('');
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    const result = verifyOtp(code);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onOpenChange?.(false);
      }, 1000);
    } else {
      setError(result.message || 'Invalid OTP. Please check the code.');
    }
  };

  const handleAutoFillDemo = () => {
    const arr = demoOtp.split('');
    setDigits(arr);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-8 text-center rounded-2xl border-zinc-800 bg-zinc-900 text-white shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 mb-4 border border-orange-500/30">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight">
          Verify your account
        </h3>
        <p className="text-sm text-zinc-400 mt-2">
          We sent a 6-digit OTP to your registered contact:
        </p>
        <p className="text-sm font-semibold text-orange-300 mt-0.5">
          {pendingIdentifier || 'aarav.sharma@example.com'}
        </p>

        {/* Simulated Native Mobile SMS Notification Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-zinc-950 text-white shadow-lg text-left animate-bounce-short border border-zinc-800">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="flex items-center gap-1 font-semibold text-orange-400">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              SMS Delivered • Just now
            </span>
            <span className="font-mono text-[10px]">VM-ADAPT</span>
          </div>
          <p className="text-xs text-zinc-200">
            Your verification OTP for <strong>{pendingIdentifier || 'your number'}</strong> is{' '}
            <span className="text-amber-400 font-extrabold tracking-widest text-sm font-mono px-1 py-0.5 bg-black/40 rounded">
              {demoOtp}
            </span>. Valid for 10 mins.
          </p>
          <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-zinc-800">
            <span className="text-[10px] text-zinc-400">Works for all phone numbers</span>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <Sparkles className="h-3 w-3" /> Auto-fill {demoOtp}
            </button>
          </div>
        </div>

        {/* 6 Digit Input Boxes */}
        <div className="mt-6 flex justify-center space-x-2.5" onPaste={handlePaste}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="h-13 w-11 sm:h-14 sm:w-12 text-center text-xl sm:text-2xl font-bold rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 focus:outline-none transition-all shadow-xs bg-zinc-950 text-orange-400"
            />
          ))}
        </div>

        {error && (
          <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-red-600 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-emerald-600 font-bold animate-fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <span>Verification successful! Taking you to Home...</span>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full font-bold shadow-md shadow-brand-600/25"
            onClick={handleVerify}
            disabled={isSuccess}
          >
            Verify OTP
          </Button>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 px-1">
            <button
              disabled={otpTimer > 0}
              onClick={() => resendOtp()}
              className={`font-semibold transition-colors flex items-center gap-1 ${
                otpTimer > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-brand-600 hover:text-brand-700 hover:underline cursor-pointer'
              }`}
            >
              <RotateCw className={`h-3 w-3 ${otpTimer > 0 ? '' : 'text-brand-600'}`} />
              Resend OTP {otpTimer > 0 && `(${otpTimer}s)`}
            </button>

            <button
              onClick={onChangeContact}
              className="font-medium text-gray-600 hover:text-gray-900 hover:underline cursor-pointer"
            >
              Change Email/Phone
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

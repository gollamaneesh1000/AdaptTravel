import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Calendar,
  Sparkles,
  FileText,
  Clock,
  Printer,
  X,
  Percent,
  Check,
  Tag,
  AlertCircle,
  Zap,
  Smartphone,
  CheckCircle,
  Copy,
  Landmark,
  Eye
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
export function PaymentPage({ onNavigate }) {
  const { currentTrip, addBooking } = useTrip();
  const { authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('checkout'); // 'checkout' | 'history'
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'bank' | 'card' | 'upi' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');
  const [razorpayPaymentId, setRazorpayPaymentId] = useState('');
  
  // Razorpay Modal state
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState('method'); // 'method' | 'processing' | 'otp'
  const [razorpaySubMethod, setRazorpaySubMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'paylater'
  const [razorpayOtp, setRazorpayOtp] = useState('482910');
  const [customerMobile, setCustomerMobile] = useState(authUser?.phone || '+91 98765 43210');

  // Bank Details State
  const [bankSubTab, setBankSubTab] = useState('provide_details'); // 'provide_details' | 'escrow_details'
  const [bankForm, setBankForm] = useState({
    accountHolderName: authUser?.name || 'Aarav Sharma',
    bankName: 'State Bank of India (SBI)',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    rawIfsc: '',
    accountType: 'Savings Account',
    linkedMobile: authUser?.phone || '+91 98765 43210',
    utrNumber: '',
    saveForFuture: false,
  });
  const [isBankOtpModalOpen, setIsBankOtpModalOpen] = useState(false);
  const [bankOtpCode, setBankOtpCode] = useState('749210');
  const [enteredBankOtp, setEnteredBankOtp] = useState('');
  const [bankOtpError, setBankOtpError] = useState('');
  const [copiedField, setCopiedField] = useState('');

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Invoice modal state
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [cardForm, setCardForm] = useState({
    name: 'Aarav Sharma',
    number: '4242 •••• •••• 4242',
    expiry: '08/28',
    cvv: '891',
  });

  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');

  // Base pricing
  const rawTotal = currentTrip.costBreakdown?.total || 40000;
  const hotelPortion = currentTrip.costBreakdown?.accommodation || 18000;
  const transportPortion = currentTrip.costBreakdown?.transportation || 8400;
  const activityPortion = currentTrip.costBreakdown?.activities || 5200;
  const taxes = Math.round(rawTotal * 0.05); // 5% GST on tour package
  const serviceFee = 450;
  
  const finalPayable = Math.max(0, rawTotal + taxes + serviceFee - appliedDiscount);

  // Apply voucher
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'ADAPT2026') {
      setAppliedDiscount(2500);
      setPromoMessage('Success: ₹2,500 Festive Yatra discount applied!');
    } else if (code === 'CHARDHAM500' || code === 'DARSHAN10') {
      setAppliedDiscount(1500);
      setPromoMessage('Success: ₹1,500 Sacred Darshan voucher applied!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid voucher code. Try ADAPT2026 or CHARDHAM500');
    }
  };

  // Open Razorpay Checkout Modal
  const handleOpenRazorpay = () => {
    setRazorpayStep('method');
    setIsRazorpayModalOpen(true);
  };

  // Simulate Razorpay Payment Flow
  const handleExecuteRazorpay = () => {
    setRazorpayStep('processing');

    setTimeout(() => {
      setRazorpayStep('otp');
    }, 1200);
  };

  const handleConfirmRazorpayOtp = () => {
    setRazorpayStep('processing');

    setTimeout(() => {
      const rzpPayId = `pay_RZP${Math.floor(10000000 + Math.random() * 90000000)}`;
      const bookingId = `ATA-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      
      setRazorpayPaymentId(rzpPayId);
      setGeneratedBookingId(bookingId);
      setIsRazorpayModalOpen(false);
      setIsSuccess(true);

      // Add booking
      addBooking({
        name: `Complete Tour Package: ${currentTrip.title}`,
        category: 'Hotels',
        price: finalPayable,
        location: currentTrip.destination,
        details: `Paid ₹${finalPayable.toLocaleString()} via Razorpay (${rzpPayId}) • 24/7 AI Disruption Shield Active`,
      });

      // Confetti
      try {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0C2340', '#0C66E4', '#E53935', '#10B981'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1200);
  };

  const handleCopyText = (text, fieldName) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (e) {
      console.log(e);
    }
  };

  // Initiate payment with user provided bank details
  const handleInitiateBankPayment = (e) => {
    e.preventDefault();
    if (!bankForm.accountNumber || bankForm.accountNumber.length < 8) {
      alert('Please enter a valid bank account number.');
      return;
    }
    if (bankForm.accountNumber !== bankForm.confirmAccountNumber) {
      alert('Account numbers do not match. Please re-confirm.');
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setBankOtpCode(newOtp);
    setEnteredBankOtp(newOtp);
    setBankOtpError('');
    setIsBankOtpModalOpen(true);
  };

  // Confirm bank OTP verification
  const handleConfirmBankOtp = () => {
    if (!enteredBankOtp || enteredBankOtp.length < 6) {
      setBankOtpError('Please enter the 6-digit OTP code.');
      return;
    }
    setIsBankOtpModalOpen(false);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const bookingId = `ATA-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      const bankTxnId = `IMPS${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      setGeneratedBookingId(bookingId);
      setRazorpayPaymentId(bankTxnId);
      setIsSuccess(true);

      addBooking({
        name: `Complete Tour Package: ${currentTrip.title}`,
        category: 'Hotels',
        price: finalPayable,
        location: currentTrip.destination,
        details: `Direct Bank Debit (${bankForm.bankName} A/C ending ••••${bankForm.accountNumber.slice(-4)}) Ref: ${bankTxnId} • Protected by Adapt AI Disruption Shield`,
      });

      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E53935', '#2563EB', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1400);
  };

  // Manual NEFT/RTGS transfer confirmation
  const handleManualUtrPayment = (e) => {
    e.preventDefault();
    if (!bankForm.utrNumber.trim()) {
      alert('Please enter the 12-character UTR or Transaction Reference number.');
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const bookingId = `ATA-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      const utrRef = bankForm.utrNumber.trim().toUpperCase();
      setGeneratedBookingId(bookingId);
      setRazorpayPaymentId(`UTR_${utrRef}`);
      setIsSuccess(true);

      addBooking({
        name: `Complete Tour Package: ${currentTrip.title}`,
        category: 'Hotels',
        price: finalPayable,
        location: currentTrip.destination,
        details: `NEFT/RTGS Verified Transfer (UTR: ${utrRef}) • Adapt AI Escrow Settlement Confirmed`,
      });

      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E53935', '#2563EB', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1400);
  };

  // Generic direct payment
  const handleProcessDirectPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newId = `ATA-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      const rzpId = `pay_RZP${Math.floor(10000000 + Math.random() * 90000000)}`;
      setGeneratedBookingId(newId);
      setRazorpayPaymentId(rzpId);
      setIsSuccess(true);

      addBooking({
        name: `Complete Tour Package: ${currentTrip.title}`,
        category: 'Hotels',
        price: finalPayable,
        location: currentTrip.destination,
        details: `Paid ₹${finalPayable.toLocaleString()} via ${paymentMethod.toUpperCase()} (${rzpId}) • 24/7 AI Disruption Shield`,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E53935', '#2563EB', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1500);
  };

  // Mock past payment transactions & invoices
  const paymentHistory = [
    {
      id: 'ATA-PAY-849201',
      rzpId: 'pay_RZP98124018',
      date: 'Sep 10, 2026',
      trip: 'Chardham & Kedarnath Sacred Himalayan Yatra (6 Days)',
      method: 'Razorpay UPI • Google Pay',
      amount: 48500,
      status: 'Paid via Razorpay',
      gstNumber: '07AABCA1234F1Z8',
      cgst: 1212.5,
      sgst: 1212.5,
      invoiceDate: '10-Sep-2026',
    },
    {
      id: 'ATA-PAY-612984',
      rzpId: 'pay_RZP71029415',
      date: 'Aug 22, 2026',
      trip: 'Varanasi Kashi Vishwanath VIP Darshan & Ganga Cruise (4 Days)',
      method: 'Razorpay Card • Visa Signature (••4242)',
      amount: 14750,
      status: 'Paid via Razorpay',
      gstNumber: '07AABCA1234F1Z8',
      cgst: 368.75,
      sgst: 368.75,
      invoiceDate: '22-Aug-2026',
    },
    {
      id: 'ATA-PAY-391024',
      rzpId: 'pay_RZP30491823',
      date: 'Jul 15, 2026',
      trip: 'Goa Coastal Forts & Scuba Package (5 Days)',
      method: 'Razorpay NetBanking • HDFC Bank',
      amount: 40000,
      status: 'Paid via Razorpay',
      gstNumber: '07AABCA1234F1Z8',
      cgst: 1000,
      sgst: 1000,
      invoiceDate: '15-Jul-2026',
    },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
        <div className="max-w-lg w-full text-center">
          <Card className="border-gray-200/90 shadow-card bg-white rounded-3xl p-8 animate-slide-up">
            <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="success" className="text-xs">
                Payment Successful
              </Badge>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <Zap className="h-3 w-3 text-orange-400 fill-orange-400" /> Razorpay Verified
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Booking & Itinerary Confirmed!
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Your transaction was secured by Razorpay Gateway. Your digital e-tickets and AI disruption protection shield are now active.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Booking Reference</span>
                <span className="font-mono font-bold text-white">{generatedBookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Razorpay Payment ID</span>
                <span className="font-mono font-bold text-orange-400">{razorpayPaymentId || 'pay_RZP98124018'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination</span>
                <span className="font-bold text-gray-900">{currentTrip.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount Paid</span>
                <span className="font-extrabold text-brand-600 text-sm">
                  ₹{finalPayable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Disruption Shield</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Covered by Adapt AI
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => onNavigate('trips')}
                className="w-full font-bold shadow-md shadow-brand-600/30"
              >
                View in My Trips
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedInvoice({
                    id: generatedBookingId,
                    rzpId: razorpayPaymentId || 'pay_RZP98124018',
                    date: 'Today',
                    trip: currentTrip.title,
                    method: 'Razorpay Verified Gateway',
                    amount: finalPayable,
                    status: 'Paid via Razorpay',
                    gstNumber: '07AABCA1234F1Z8',
                    cgst: (finalPayable * 0.025).toFixed(2),
                    sgst: (finalPayable * 0.025).toFixed(2),
                    invoiceDate: 'Today',
                  });
                }}
                className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <FileText className="h-4 w-4" /> View & Print Official GST Tax Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-6xl mx-auto">
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">Secure Billing & Payments</Badge>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-2xs">
                <Zap className="h-3 w-3 text-orange-400 fill-orange-400" /> Razorpay Enabled
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Payment Details & Checkout
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Secured with Razorpay 256-Bit SSL military encryption and 24/7 AI Disruption Guarantee
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xs">
            <button
              onClick={() => setActiveTab('checkout')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              💳 Complete Payment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-black shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              📑 Invoices & History ({paymentHistory.length})
            </button>
          </div>
        </div>

        {activeTab === 'checkout' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Payment Method Selector & Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Featured Razorpay Instant Checkout Card */}
              <Card className="border-2 border-orange-500/40 bg-gradient-to-r from-orange-950/30 via-zinc-900 to-amber-950/20 rounded-2xl p-5 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-11 w-11 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-md">
                      <Zap className="h-6 w-6 fill-orange-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-white">Razorpay Express Checkout</h4>
                        <span className="text-[10px] font-bold bg-orange-500 text-zinc-950 px-2 py-0.2 rounded-full uppercase">Fastest</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        1-Click UPI, Google Pay, PhonePe, Cards, Netbanking & EMI
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleOpenRazorpay}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 shrink-0 flex items-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 fill-zinc-950" /> Pay via Razorpay
                  </Button>
                </div>
              </Card>

              {/* Standard Payment Tabs & Forms */}
              <Card className="border-gray-200/90 shadow-soft bg-white rounded-2xl p-6">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center justify-between">
                  <span>Select Payment Method</span>
                  <span className="text-xs text-gray-400 font-normal">Direct Gateway</span>
                </h3>

                {/* Payment Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                  {[
                    { id: 'razorpay', label: 'Razorpay', icon: Zap },
                    { id: 'bank', label: 'Bank Details', icon: Building2 },
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'card', label: 'Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Landmark },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/70 text-brand-700 ring-2 ring-brand-500/20 shadow-2xs font-bold'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mx-auto mb-1 ${isSelected ? 'text-brand-600' : 'text-gray-400'}`} />
                        <span className="text-xs block">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Method Forms */}
                {paymentMethod === 'razorpay' && (
                  <div className="space-y-4 animate-fade-in p-4 rounded-xl bg-orange-950/20 border border-orange-500/30">
                    <div className="text-center py-4">
                      <div className="h-12 w-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3 shadow-md border border-orange-500/30">
                        <Zap className="h-6 w-6 fill-orange-400" />
                      </div>
                      <h4 className="font-extrabold text-sm text-white">Razorpay Standard Payment Gateway</h4>
                      <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                        Click below to open the official Razorpay Checkout modal with instantaneous bank authorization.
                      </p>

                      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-zinc-300 font-medium">
                        <span className="px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">GPay & PhonePe</span>
                        <span className="px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">All Indian Banks</span>
                        <span className="px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">Visa / Mastercard / RuPay</span>
                        <span className="px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">No-Cost EMI</span>
                      </div>

                      <Button
                        type="button"
                        onClick={handleOpenRazorpay}
                        className="mt-6 w-full max-w-sm mx-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black py-3 text-sm shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 rounded-xl"
                      >
                        <Zap className="h-4 w-4 fill-zinc-950" /> Open Razorpay & Pay ₹{finalPayable.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Bank Details Payment Form */}
                {paymentMethod === 'bank' && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Sub-Tabs: Provide Bank Details VS Corporate Escrow */}
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setBankSubTab('provide_details')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          bankSubTab === 'provide_details'
                            ? 'bg-white text-gray-900 shadow-xs'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        🏦 Provide My Bank Details
                      </button>
                      <button
                        type="button"
                        onClick={() => setBankSubTab('escrow_details')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          bankSubTab === 'escrow_details'
                            ? 'bg-white text-gray-900 shadow-xs'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        🏛️ Adapt Corporate Account (NEFT/RTGS)
                      </button>
                    </div>

                    {bankSubTab === 'provide_details' ? (
                      <form onSubmit={handleInitiateBankPayment} className="space-y-3.5">
                        <div className="p-3 bg-orange-950/20 border border-orange-500/30 rounded-xl text-xs text-zinc-300 flex items-start gap-2.5">
                          <ShieldCheck className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-white">Direct Bank Debit Authorization</span>
                            Enter your bank account details. We will trigger an instant 6-digit OTP to your registered phone for authorization.
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-semibold text-gray-700">Account Holder Name</Label>
                            <Input
                              value={bankForm.accountHolderName}
                              onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })}
                              placeholder="Full Name as in Bank Records"
                              required
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700">Select Your Bank</Label>
                            <select
                              value={bankForm.bankName}
                              onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                              <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                              <option value="HDFC Bank">HDFC Bank</option>
                              <option value="ICICI Bank">ICICI Bank</option>
                              <option value="Axis Bank">Axis Bank</option>
                              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                              <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                              <option value="Bank of Baroda">Bank of Baroda</option>
                              <option value="Canara Bank">Canara Bank</option>
                              <option value="Other Commercial Bank">Other Commercial Bank</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-semibold text-gray-700">Bank Account Number</Label>
                            <Input
                              type="text"
                              value={bankForm.accountNumber}
                              onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                              placeholder="e.g. 123456789012"
                              required
                              className="mt-1 font-mono"
                            />
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700">Re-enter Account Number</Label>
                            <Input
                              type="password"
                              value={bankForm.confirmAccountNumber}
                              onChange={(e) => setBankForm({ ...bankForm, confirmAccountNumber: e.target.value })}
                              placeholder="Re-enter to confirm"
                              required
                              className="mt-1 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex justify-between items-center">
                              <Label className="text-xs font-semibold text-gray-700">Bank IFSC Code</Label>
                              {bankForm.ifscCode.length >= 7 && (
                                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" /> Branch Verified
                                </span>
                              )}
                            </div>
                            <Input
                              type="text"
                              value={bankForm.ifscCode}
                              onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase() })}
                              placeholder="e.g. SBIN0001234 or HDFC0001234"
                              required
                              className="mt-1 font-mono uppercase"
                            />
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700">Account Type</Label>
                            <select
                              value={bankForm.accountType}
                              onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                              <option value="Savings Account">Savings Account</option>
                              <option value="Current Account">Current Account</option>
                              <option value="Salary Account">Salary Account</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-semibold text-gray-700">
                            Registered Mobile Number (For Bank OTP)
                          </Label>
                          <Input
                            type="text"
                            value={bankForm.linkedMobile}
                            onChange={(e) => setBankForm({ ...bankForm, linkedMobile: e.target.value })}
                            placeholder="+91 98765 43210"
                            required
                            className="mt-1 font-mono"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            An instant 6-digit OTP will be simulated and sent to this mobile number.
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                          <input
                            type="checkbox"
                            id="saveBankCheck"
                            checked={bankForm.saveForFuture}
                            onChange={(e) => setBankForm({ ...bankForm, saveForFuture: e.target.checked })}
                            className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                          />
                          <label htmlFor="saveBankCheck" className="text-xs text-gray-600 cursor-pointer">
                            Save bank details for this session
                          </label>
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isProcessing}
                          className="w-full font-bold shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 py-3 mt-4"
                        >
                          <Building2 className="h-4 w-4" />
                          <span>Generate Bank OTP & Pay ₹{finalPayable.toLocaleString()}</span>
                        </Button>
                      </form>
                    ) : (
                      /* Escrow Corporate Account Details */
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-gray-700/80 pb-3 mb-3">
                            <div>
                              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase block">
                                Corporate Escrow Account
                              </span>
                              <h4 className="text-base font-extrabold text-white">Adapt Travel Agent Pvt Ltd</h4>
                            </div>
                            <Badge variant="primary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                              Verified RTGS/NEFT
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-[10px] text-gray-400 block">Bank Name</span>
                              <span className="font-bold text-gray-200">HDFC Bank Limited</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 block">Account Type</span>
                              <span className="font-bold text-gray-200">Corporate Current</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 block">Account Number</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-extrabold text-white text-sm">ADAPT9820261108</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText('ADAPT9820261108', 'acc')}
                                  className="text-[10px] text-cyan-400 hover:underline font-bold"
                                >
                                  {copiedField === 'acc' ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 block">IFSC Code</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-extrabold text-white text-sm">HDFC0000060</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText('HDFC0000060', 'ifsc')}
                                  className="text-[10px] text-cyan-400 hover:underline font-bold"
                                >
                                  {copiedField === 'ifsc' ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <form onSubmit={handleManualUtrPayment} className="space-y-3 pt-2">
                          <div>
                            <Label className="text-xs font-bold text-gray-800">
                              Enter 12-Digit UTR / Transaction Reference Number
                            </Label>
                            <Input
                              type="text"
                              value={bankForm.utrNumber}
                              onChange={(e) => setBankForm({ ...bankForm, utrNumber: e.target.value })}
                              placeholder="e.g. HDFC260911894201 or SBIN20260911002"
                              required
                              className="mt-1 font-mono uppercase"
                            />
                            <p className="text-[11px] text-gray-500 mt-1">
                              After transferring ₹{finalPayable.toLocaleString()} from your netbanking app, paste the UTR number here for instant ticket confirmation.
                            </p>
                          </div>

                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={isProcessing}
                            className="w-full font-bold shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 py-3"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Submit UTR & Confirm Booking</span>
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <form onSubmit={handleProcessDirectPayment} className="space-y-4 animate-fade-in">
                    <div>
                      <Label htmlFor="cardName" className="text-xs font-semibold text-gray-700">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="cardNumber" className="text-xs font-semibold text-gray-700">Card Number</Label>
                        <div className="flex items-center space-x-1.5 text-[10px] text-gray-500 font-bold">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">VISA</span>
                          <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">Mastercard</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">RuPay</span>
                        </div>
                      </div>
                      <Input
                        id="cardNumber"
                        value={cardForm.number}
                        onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                        className="mt-1 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-xs font-semibold text-gray-700">Expiry Date (MM/YY)</Label>
                        <Input
                          id="expiry"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                          className="mt-1 font-mono"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-xs font-semibold text-gray-700">CVV / CVC</Label>
                        <Input
                          id="cvv"
                          type="password"
                          maxLength={4}
                          value={cardForm.cvv}
                          onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                          className="mt-1 font-mono"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isProcessing}
                      className="w-full font-bold shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 py-3 mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing via Razorpay Network...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" /> Pay ₹{finalPayable.toLocaleString()} & Confirm Trip
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {paymentMethod === 'upi' && (
                  <form onSubmit={handleProcessDirectPayment} className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                      <div className="inline-block p-3 bg-white rounded-xl border border-gray-200 shadow-2xs mb-2">
                        <QrCode className="h-32 w-32 text-gray-900 mx-auto" />
                      </div>
                      <p className="text-xs font-bold text-gray-900">Scan QR code using any UPI App</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Google Pay • PhonePe • Paytm • BHIM • CRED</p>
                    </div>

                    <div className="relative my-2 text-center">
                      <span className="text-[10px] text-gray-400 uppercase font-bold bg-white px-2">Or enter UPI ID</span>
                    </div>

                    <div>
                      <Label htmlFor="upiId" className="text-xs font-semibold text-gray-700">Virtual Payment Address (VPA)</Label>
                      <Input
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. username@okhdfcbank or yourname@upi"
                        className="mt-1 font-mono"
                      />
                      {upiId.includes('@') && upiId.length > 5 && (
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>UPI ID format verified</span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isProcessing}
                      className="w-full font-bold shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 py-3 mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Verifying UPI Request...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" /> Pay ₹{finalPayable.toLocaleString()} via UPI
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {paymentMethod === 'netbanking' && (
                  <form onSubmit={handleProcessDirectPayment} className="space-y-4 animate-fade-in">
                    <Label className="text-xs font-semibold text-gray-700">Popular Indian Banks</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            selectedBank === b
                              ? 'border-brand-600 bg-brand-50/60 text-brand-700 font-bold'
                              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isProcessing}
                      className="w-full font-bold shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 py-3 mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Redirecting to {selectedBank}...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" /> Pay ₹{finalPayable.toLocaleString()} via {selectedBank}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>

              {/* Security Badges */}
              <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-center justify-around text-[11px] text-gray-600 font-medium">
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <Zap className="h-3.5 w-3.5 text-orange-400 fill-orange-400" /> Razorpay Secured
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> PCI-DSS Level 1
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-gray-700 font-bold">
                  <Lock className="h-4 w-4 text-brand-600" /> 256-Bit SSL
                </span>
              </div>
            </div>

            {/* Itemized Payment Details Breakdown (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-gray-200/90 shadow-soft bg-white rounded-2xl p-6">
                <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Payment Breakdown</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{currentTrip.destination}</p>
                  </div>
                  <Badge variant="primary" className="text-[10px] font-bold">
                    {currentTrip.durationDays || 5} Days Tour
                  </Badge>
                </div>

                <div className="py-4 space-y-3 text-xs border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Accommodation & Stays</span>
                    <span className="font-semibold text-gray-900">₹{hotelPortion.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transit (Flights / Vande Bharat / Cabs)</span>
                    <span className="font-semibold text-gray-900">₹{transportPortion.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIP Darshan Passes & Guided Sightseeing</span>
                    <span className="font-semibold text-gray-900">₹{activityPortion.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> 24/7 AI Disruption Shield
                    </span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (5% Tour Operator SAC 998555)</span>
                    <span className="font-semibold text-gray-900">₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Convenience Fee</span>
                    <span className="font-semibold text-gray-900">₹{serviceFee.toLocaleString()}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> Voucher Discount
                      </span>
                      <span>-₹{appliedDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="py-4 border-b border-gray-100">
                  <Label className="text-[11px] font-bold text-gray-700">Apply Promo Voucher Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. ADAPT2026 or CHARDHAM500"
                      className="text-xs uppercase font-mono"
                    />
                    <Button type="submit" variant="secondary" size="sm" className="text-xs font-bold shrink-0">
                      Apply
                    </Button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] mt-1.5 font-medium ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Total */}
                <div className="pt-4 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-semibold">Total Payable Amount</span>
                    <p className="text-xs text-gray-500">Includes all taxes & disruption coverage</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-brand-600">
                      ₹{finalPayable.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-gray-400 font-medium">Approx. ${Math.round(finalPayable / 83)} USD</p>
                  </div>
                </div>
              </Card>

              {/* Adapt AI Disruption Promise */}
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-brand-600" /> Adapt AI Disruption Refund Guarantee
                </div>
                <p className="text-[11px] text-brand-800 leading-relaxed">
                  If mountain roadblocks, flight cancellations, or closed temple queues disrupt your travel, Adapt AI automatically reschedules your activities or provides instant hotel meal vouchers.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Payment History & Tax Invoices View */
          <div className="space-y-6">
            <Card className="border-gray-200/90 shadow-soft bg-white rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Recent Payment Transactions & Invoices</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Download official GST tax invoices and view Razorpay transaction reference numbers.</p>
                </div>
                <Badge variant="primary" className="self-start sm:self-auto text-xs">
                  {paymentHistory.length} Verified Transactions
                </Badge>
              </div>

              <div className="divide-y divide-gray-100 mt-2">
                {paymentHistory.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-900">{item.id}</span>
                        <span className="font-mono text-[11px] text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded border border-orange-500/30 font-semibold flex items-center gap-1">
                          <Zap className="h-2.5 w-2.5 fill-orange-400" /> {item.rzpId}
                        </span>
                        <Badge variant="success" className="text-[10px]">
                          {item.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">{item.trip}</h4>
                      <p className="text-xs text-gray-500">
                        {item.date} • {item.method}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Paid</span>
                        <p className="text-base font-extrabold text-gray-900">₹{item.amount.toLocaleString()}</p>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedInvoice(item)}
                        className="text-xs font-bold flex items-center gap-1.5"
                      >
                        <FileText className="h-3.5 w-3.5 text-brand-600" />
                        Tax Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Interactive Razorpay Standard Checkout Modal */}
      {/* Interactive Razorpay Standard Checkout Modal */}
      {isRazorpayModalOpen && (
        <Dialog open={isRazorpayModalOpen} onOpenChange={setIsRazorpayModalOpen}>
          <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl text-white">
            {/* Razorpay Iconic Black & Orange Header */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-b border-orange-500/30 p-5 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="h-9 w-9 rounded-lg bg-orange-500 flex items-center justify-center p-1.5">
                    <Zap className="h-6 w-6 text-black fill-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">Adapt Travel Agent</h3>
                    <p className="text-[10px] text-orange-300 font-mono">order_Rzp{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Amount to Pay</span>
                  <span className="text-lg font-extrabold text-orange-400">₹{finalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {razorpayStep === 'method' && (
                <div className="space-y-4">
                  {/* Contact prefill */}
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs flex justify-between items-center text-zinc-300">
                    <div>
                      <span className="font-bold block text-white">Aarav Sharma</span>
                      <span className="text-zinc-400">+91 98765 43210 • aarav.sharma@example.com</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-orange-500/20 text-orange-400 border-orange-500/30">
                      Verified
                    </Badge>
                  </div>

                  <p className="text-xs font-bold text-zinc-300">Preferred Payment Option</p>

                  {/* Razorpay payment methods list */}
                  <div className="space-y-2">
                    {[
                      { id: 'upi', name: 'UPI (Google Pay, PhonePe, Paytm, BHIM)', desc: 'Instant authorization via UPI intent', icon: Smartphone, tag: 'Fastest' },
                      { id: 'card', name: 'Cards (Credit & Debit)', desc: 'Visa, Mastercard, RuPay, Maestro', icon: CreditCard, tag: null },
                      { id: 'netbanking', name: 'Netbanking', desc: 'All Indian Banks (SBI, HDFC, ICICI, etc.)', icon: Building2, tag: null },
                      { id: 'paylater', name: 'Wallets & Pay Later', desc: 'Amazon Pay, CRED, Simpl, LazyPay', icon: Wallet, tag: '0% Interest' },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = razorpaySubMethod === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setRazorpaySubMethod(m.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/10 shadow-2xs'
                              : 'border-zinc-800 hover:bg-zinc-800/60'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white leading-tight">{m.name}</p>
                              <p className="text-[10px] text-zinc-400 mt-0.5">{m.desc}</p>
                            </div>
                          </div>
                          {m.tag && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400">
                              {m.tag}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    type="button"
                    onClick={handleExecuteRazorpay}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black py-3 text-xs rounded-xl shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    Proceed to Pay ₹{finalPayable.toLocaleString()} <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              {razorpayStep === 'processing' && (
                <div className="py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto" />
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Securing Bank Authorization...</h4>
                    <p className="text-xs text-zinc-400 mt-1">Connecting with Razorpay Payment Gateway & NPCI Network</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                    <Lock className="h-3.5 w-3.5 text-orange-400" />
                    <span>256-Bit SSL Encrypted Session</span>
                  </div>
                </div>
              )}

              {razorpayStep === 'otp' && (
                <div className="space-y-4 text-center py-2 animate-fade-in">
                  <div className="h-12 w-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-2 border border-orange-500/30">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Enter Bank Verification OTP</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Sent to registered mobile <strong>+91 98765 43210</strong>
                    </p>
                  </div>

                  {/* Simulated Incoming SMS Toast */}
                  <div className="p-3 rounded-2xl bg-zinc-950 text-white text-left text-xs shadow-md border border-zinc-800">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                      <span className="flex items-center gap-1 text-orange-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        Razorpay SMS Delivered
                      </span>
                      <span className="font-mono">+91 98765 43210</span>
                    </div>
                    <p className="text-zinc-200">
                      OTP for payment of ₹{finalPayable.toLocaleString()} to Adapt Travel is{' '}
                      <span className="text-amber-400 font-extrabold font-mono text-sm px-1 py-0.5 bg-black/40 rounded">
                        {razorpayOtp}
                      </span>. Valid for 10 mins.
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400">Works with all numbers</span>
                      <button
                        type="button"
                        onClick={() => setRazorpayOtp('482910')}
                        className="px-2 py-0.5 rounded bg-orange-500 hover:bg-orange-600 text-black text-[10px] font-bold cursor-pointer"
                      >
                        Auto-fill 482910
                      </button>
                    </div>
                  </div>

                  <div className="max-w-[200px] mx-auto my-3">
                    <Input
                      type="text"
                      maxLength={6}
                      value={razorpayOtp}
                      onChange={(e) => setRazorpayOtp(e.target.value)}
                      className="text-center text-lg font-mono tracking-widest font-extrabold bg-zinc-950 border-zinc-800 text-orange-400"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleConfirmRazorpayOtp}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black py-3 text-xs rounded-xl shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Confirm & Complete ₹{finalPayable.toLocaleString()}
                  </Button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-center text-[10px] text-zinc-400 font-medium flex items-center justify-center gap-2">
              <Zap className="h-3 w-3 text-orange-400 fill-orange-400" />
              <span>Secured by Razorpay • PCI-DSS Certified • ISO 27001 Compliant</span>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bank Details OTP Verification Dialog */}
      {isBankOtpModalOpen && (
        <Dialog open={isBankOtpModalOpen} onOpenChange={setIsBankOtpModalOpen}>
          <DialogContent className="max-w-md p-6 rounded-2xl text-center bg-zinc-900 border border-zinc-800 text-white shadow-2xl">
            <div className="h-12 w-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
              <Building2 className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-extrabold text-white">Authorize Bank Debit</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Authorizing payment of <strong>₹{finalPayable.toLocaleString()}</strong> from{' '}
              <strong>{bankForm.bankName}</strong> (A/C ••••{bankForm.accountNumber.slice(-4)})
            </p>

            {/* Simulated Live SMS Alert for Bank OTP */}
            <div className="my-4 p-3 rounded-xl bg-zinc-950 text-white text-left text-xs shadow-md border border-zinc-800">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Bank SMS Delivered
                </span>
                <span className="font-mono">{bankForm.linkedMobile || '+91 98765 43210'}</span>
              </div>
              <p className="text-gray-200">
                Bank OTP for payment of ₹{finalPayable.toLocaleString()} to Adapt Travel is{' '}
                <span className="text-amber-400 font-extrabold font-mono text-sm px-1 py-0.5 bg-black/40 rounded">
                  {bankOtpCode}
                </span>. Valid for 10 minutes.
              </p>
              <div className="mt-2 pt-1.5 border-t border-gray-800 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Works with all mobile numbers</span>
                <button
                  type="button"
                  onClick={() => {
                    setEnteredBankOtp(bankOtpCode);
                    setBankOtpError('');
                  }}
                  className="px-2 py-0.5 rounded bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-bold cursor-pointer"
                >
                  Auto-fill {bankOtpCode}
                </button>
              </div>
            </div>

            {/* OTP Input */}
            <div className="max-w-[220px] mx-auto mb-3">
              <Input
                type="text"
                maxLength={6}
                value={enteredBankOtp}
                onChange={(e) => {
                  setEnteredBankOtp(e.target.value);
                  setBankOtpError('');
                }}
                placeholder="6-Digit OTP"
                className="text-center font-mono text-xl font-extrabold tracking-widest"
              />
              {bankOtpError && <p className="text-xs text-red-600 mt-1">{bankOtpError}</p>}
            </div>

            <div className="flex space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsBankOtpModalOpen(false)}
                className="flex-1 text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmBankOtp}
                className="flex-1 text-xs font-bold bg-brand-600 hover:bg-brand-700"
              >
                Confirm & Pay
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Official Tax Invoice Modal */}
      {selectedInvoice && (
        <Dialog open={Boolean(selectedInvoice)} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
          <DialogContent className="max-w-xl p-0 overflow-hidden rounded-2xl bg-white">
            <DialogHeader className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-600" />
                    GST Tax Invoice
                  </DialogTitle>
                  <DialogDescription className="text-xs text-gray-500 mt-0.5">
                    Original for Recipient • Compliant with Section 31 of CGST Act, 2017
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="p-6 space-y-6 text-xs text-gray-700 max-h-[75vh] overflow-y-auto">
              {/* Company & Client Info */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-600">Issued By</span>
                  <h4 className="font-extrabold text-sm text-gray-900">Adapt Travel Agent Pvt. Ltd.</h4>
                  <p className="text-gray-500 mt-0.5">Connaught Place, New Delhi, 110001</p>
                  <p className="text-gray-500 font-mono">GSTIN: {selectedInvoice.gstNumber}</p>
                  <p className="text-gray-500">SAC Code: 998555 (Tour Operator Services)</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Billed To</span>
                  <h4 className="font-bold text-sm text-gray-900">Aarav Sharma</h4>
                  <p className="text-gray-500 mt-0.5">aarav.sharma@example.com</p>
                  <p className="text-gray-500">+91 98765 43210</p>
                  <p className="text-gray-500">State: Delhi (Code 07)</p>
                </div>
              </div>

              {/* Invoice Meta */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Invoice No</span>
                  <span className="font-mono font-bold text-gray-900">{selectedInvoice.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Date of Issue</span>
                  <span className="font-bold text-gray-900">{selectedInvoice.invoiceDate || selectedInvoice.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Payment Gateway</span>
                  <span className="font-bold text-orange-400 flex items-center gap-1 font-mono">
                    <Zap className="h-3 w-3 fill-orange-400" /> {selectedInvoice.rzpId || 'pay_RZP98124018'}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-[10px] text-gray-400 uppercase font-bold">
                      <th className="pb-2">Description of Service</th>
                      <th className="pb-2 text-right">SAC</th>
                      <th className="pb-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr>
                      <td className="py-2.5">
                        <span className="font-bold text-gray-900 block">{selectedInvoice.trip}</span>
                        <span className="text-[11px] text-gray-500">Includes Verified Accommodations, Transit & Temple Permits</span>
                      </td>
                      <td className="py-2.5 text-right font-mono">998555</td>
                      <td className="py-2.5 text-right font-bold text-gray-900">
                        ₹{(selectedInvoice.amount * 0.95).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">Central GST (CGST 2.5%)</td>
                      <td className="py-2 text-right font-mono">998555</td>
                      <td className="py-2 text-right font-semibold text-gray-900">
                        ₹{(selectedInvoice.amount * 0.025).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">State GST (SGST 2.5%)</td>
                      <td className="py-2 text-right font-mono">998555</td>
                      <td className="py-2 text-right font-semibold text-gray-900">
                        ₹{(selectedInvoice.amount * 0.025).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-900 font-extrabold text-sm">
                      <td className="pt-3">Grand Total (Inclusive of All Taxes)</td>
                      <td className="pt-3"></td>
                      <td className="pt-3 text-right text-brand-600">₹{Number(selectedInvoice.amount).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Security Seal */}
              <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-400 fill-orange-400 shrink-0" />
                  <span>Verified by Razorpay Payment Gateway • Transaction ID: {selectedInvoice.rzpId || 'pay_RZP98124018'}</span>
                </div>
                <span className="font-mono text-[10px] text-orange-400 font-bold">SETTLED</span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedInvoice(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.print();
                }}
                className="font-bold flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5" /> Print / Download PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


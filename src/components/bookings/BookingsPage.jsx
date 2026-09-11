import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Plane,
  Hotel,
  Car,
  Compass,
  Download,
  Printer,
  Calendar,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export function BookingsPage({ onNavigate }) {
  const { bookings, cancelBooking } = useTrip();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const categories = ['All', 'Flights', 'Hotels', 'Transport', 'Activities'];

  const filteredBookings = bookings.filter((b) => {
    if (activeCategory === 'All') return true;
    return b.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge variant="success" className="text-[10px]">Confirmed</Badge>;
      case 'Pending':
        return <Badge variant="warning" className="text-[10px]">Pending</Badge>;
      case 'Cancelled':
        return <Badge variant="danger" className="text-[10px]">Cancelled</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'flights': return <Plane className="h-4 w-4" />;
      case 'hotels': return <Hotel className="h-4 w-4" />;
      case 'transport': return <Car className="h-4 w-4" />;
      default: return <Compass className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Digital Pass & Vouchers</Badge>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Manage Bookings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Confirmed e-tickets, hotel reservations, and activity vouchers
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bookings Table / List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card className="p-12 text-center bg-white rounded-2xl border-gray-200">
              <p className="text-sm text-gray-500">No bookings found in this category.</p>
            </Card>
          ) : (
            filteredBookings.map((b) => (
              <Card
                key={b.id}
                className="border-gray-200/90 shadow-soft hover:shadow-card transition-all rounded-2xl overflow-hidden bg-white"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-brand-600 shrink-0 mt-0.5">
                        {getCategoryIcon(b.category)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs font-mono font-bold text-gray-500">
                            {b.id}
                          </span>
                          {getStatusBadge(b.status)}
                          <span className="text-xs text-gray-400 font-mono">
                            Ref: {b.confirmationCode}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mt-1">
                          {b.service}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span>{b.date} • {b.time}</span>
                          <span className="text-gray-300">|</span>
                          <span>{b.travelers}</span>
                        </p>

                        <p className="text-xs text-gray-600 mt-1">
                          {b.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <span className="text-base font-extrabold text-gray-900">
                        ₹{b.price.toLocaleString()}
                      </span>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedTicket(b)}
                          className="text-xs font-semibold flex items-center gap-1"
                        >
                          <Ticket className="h-3.5 w-3.5" />
                          E-Ticket
                        </Button>

                        {b.status === 'Confirmed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelBooking(b.id)}
                            className="text-xs text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* E-Ticket Modal */}
      {selectedTicket && (
        <Dialog open={Boolean(selectedTicket)} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-md p-6 rounded-2xl">
            <div className="border-b border-dashed border-gray-200 pb-4 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600">
                Adapt Travel Agent E-Voucher
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                {selectedTicket.service}
              </h3>
              <p className="text-xs font-mono text-gray-500 mt-0.5">
                Confirmation: {selectedTicket.confirmationCode}
              </p>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-mono font-bold text-gray-900">{selectedTicket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-bold text-gray-900">{selectedTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled Date</span>
                <span className="font-bold text-gray-900">{selectedTicket.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled Time</span>
                <span className="font-bold text-gray-900">{selectedTicket.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Travelers / Room</span>
                <span className="font-bold text-gray-900">{selectedTicket.travelers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-extrabold text-brand-600 text-sm">
                  ₹{selectedTicket.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <span className="text-[10px] font-mono text-gray-400 block mb-1">DIGITAL BARCODE PASS</span>
              <div className="h-10 w-48 bg-gray-800 mx-auto rounded flex items-center justify-center text-white text-[10px] font-mono tracking-widest">
                ||| | |||| | ||| |||||
              </div>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                ✓ Verified by Adapt AI Security Engine
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex space-x-3">
              <Button variant="outline" onClick={() => setSelectedTicket(null)} className="flex-1 text-xs">
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert('E-Ticket downloaded to your device!');
                  setSelectedTicket(null);
                }}
                className="flex-1 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

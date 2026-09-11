import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, CheckCircle2, Shield, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function HumanSupportModal({ open, onOpenChange }) {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('Urgent Flight Delay Assistance');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
      setMessage('');
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6 sm:p-8 rounded-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-2.5 mb-1">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Phone className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              24/7 Human Concierge Support
            </DialogTitle>
          </div>
          <DialogDescription>
            Speak directly with an Adapt Travel Agent senior travel specialist for urgent disruptions and custom inquiries.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="p-8 text-center space-y-3 animate-fade-in">
            <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Callback Requested!</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Senior agent Rajesh from the Adapt Travel Emergency Concierge will call your registered phone (+91 98765 43210) within 3 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-gray-500 font-semibold block">Toll-Free Priority Line</span>
                <span className="text-sm font-extrabold text-brand-600 font-mono">1800-ADAPT-AIR (232-782)</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Available Now
              </span>
            </div>

            <div>
              <Label htmlFor="supportSubject">Reason for Contact</Label>
              <Input
                id="supportSubject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="supportMsg">Brief Description</Label>
              <textarea
                id="supportMsg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain what you need assistance with..."
                className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-600 mt-1"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="text-xs font-bold px-5">
                Request Immediate Callback
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

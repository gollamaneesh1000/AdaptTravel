import React, { useState } from 'react';
import { Wallet, Sparkles, TrendingDown, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function CostCalculatorCard({ costBreakdown, onNavigate }) {
  const [budgetMultiplier, setBudgetMultiplier] = useState(1);
  const baseTotal = costBreakdown?.total || 40000;

  const currentTotal = Math.round(baseTotal * budgetMultiplier);
  const accommodation = Math.round((costBreakdown?.accommodation || 18000) * budgetMultiplier);
  const transportation = Math.round((costBreakdown?.transportation || 8400) * budgetMultiplier);
  const food = Math.round((costBreakdown?.food || 6500) * budgetMultiplier);
  const activities = Math.round((costBreakdown?.activities || 5200) * budgetMultiplier);
  const taxes = Math.round((costBreakdown?.taxesAndFees || 1900) * budgetMultiplier);

  const isReduced = budgetMultiplier < 1;

  return (
    <Card className="border-gray-200/90 shadow-soft bg-white rounded-2xl overflow-hidden">
      <CardHeader className="p-5 pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Wallet className="h-4 w-4 text-brand-600" />
            Cost Calculator & Budget
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">Estimated total for 2 travelers</p>
        </div>
        <Badge variant="primary" className="text-xs font-mono font-bold">
          ₹{currentTotal.toLocaleString()}
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Budget Adjustment Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
            <span>Budget Optimization Slider</span>
            <span className="text-brand-600 font-bold">{Math.round(budgetMultiplier * 100)}% of standard</span>
          </div>
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.05"
            value={budgetMultiplier}
            onChange={(e) => setBudgetMultiplier(parseFloat(e.target.value))}
            className="w-full accent-brand-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Budget Save (-30%)</span>
            <span>Standard</span>
            <span>Luxury Tier (+30%)</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2 text-xs divide-y divide-gray-100 pt-1">
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-gray-600">Accommodation (4 Nights)</span>
            <span className="font-bold text-gray-900">₹{accommodation.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-gray-600">Transportation (Flights & Cabs)</span>
            <span className="font-bold text-gray-900">₹{transportation.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-gray-600">Culinary & Dining</span>
            <span className="font-bold text-gray-900">₹{food.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-gray-600">Activities & Scuba</span>
            <span className="font-bold text-gray-900">₹{activities.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-gray-600">Taxes & Service Fees</span>
            <span className="font-bold text-gray-900">₹{taxes.toLocaleString()}</span>
          </div>
        </div>

        {/* Loco AI Smart Budget Recommendation */}
        {isReduced && (
          <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 space-y-1 animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-brand-700">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span>Loco AI Budget Recommendation</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Your budget was reduced. Loco recommends booking <strong>Casa Candolim Boutique Hotel</strong> instead of Taj Resort and opting for shared catamaran cruises to save <strong>₹{(baseTotal - currentTotal).toLocaleString()}</strong> without skipping top beaches!
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('payment')}
          className="w-full font-bold shadow-sm shadow-brand-600/30 flex items-center justify-center gap-2"
        >
          Book & Pay This Trip <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

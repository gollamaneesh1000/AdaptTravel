import React, { useState } from 'react';
import {
  AlertTriangle,
  Plane,
  CloudRain,
  Building2,
  Clock,
  Car,
  Wallet,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrainTrack
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { disruptionScenarios } from '../../data/mockItineraries';

export function AdaptTripDialog({ open, onOpenChange, onSelectScenario, isAdapting }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('flight_delayed_4h');
  const [customDescription, setCustomDescription] = useState('');

  const handleRunAdaptation = () => {
    onSelectScenario(selectedScenarioId, customDescription);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'PlaneLanding': return <Plane className="h-5 w-5" />;
      case 'AlertOctagon': return <AlertTriangle className="h-5 w-5" />;
      case 'Building2': return <Building2 className="h-5 w-5" />;
      case 'CloudRain': return <CloudRain className="h-5 w-5" />;
      case 'TrainTrack': return <TrainTrack className="h-5 w-5" />;
      case 'Wallet': return <Wallet className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-6 sm:p-8">
        <DialogHeader>
          <div className="flex items-center space-x-2.5 mb-1">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Adapt My Itinerary
            </DialogTitle>
          </div>
          <DialogDescription>
            What unexpected change occurred? Adapt AI will automatically identify affected activities, re-align timings, substitute closed venues, and recalculate transit.
          </DialogDescription>
        </DialogHeader>

        {/* Scenario Selection Grid */}
        <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {disruptionScenarios.map((sc) => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {getIcon(sc.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{sc.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{sc.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {sc.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Label htmlFor="customSituation" className="text-xs">
            Or Describe Your Exact Situation (Optional)
          </Label>
          <Input
            id="customSituation"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="e.g. Flight delayed 2 hours and feeling exhausted, shift dinner earlier"
            className="mt-1 text-xs"
          />
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isAdapting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleRunAdaptation}
            disabled={isAdapting}
            className="w-full sm:w-auto font-bold px-6 shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
          >
            {isAdapting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Adapt AI Calculating Schedule…</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run Adapt AI Engine</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

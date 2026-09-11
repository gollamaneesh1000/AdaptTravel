import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  X,
  AlertTriangle,
  RotateCcw,
  Check
} from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function AdaptationDiffModal({
  open,
  adaptationData,
  onAccept,
  onUndo,
  onClose
}) {
  if (!adaptationData) return null;

  const { scenario, beforeDay, afterDay, changes } = adaptationData;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6 sm:p-8 rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Itinerary Adaptation Review
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Triggered by disruption: <strong className="text-gray-800">{scenario.title}</strong>
            </p>
          </div>

          <Badge variant="primary" className="text-xs font-bold">
            Live Preview
          </Badge>
        </div>

        {/* Changes Summary Banner */}
        <div className="my-4 p-4 rounded-xl bg-amber-50 border border-amber-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="h-4 w-4 text-amber-600" /> Key Adaptations Made by Adapt AI:
          </h4>
          <ul className="space-y-1 text-xs text-amber-950">
            {changes.map((change, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">•</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side-by-Side Before vs After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 max-h-80 overflow-y-auto pr-1">
          {/* Before */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 mb-3">
              <span className="text-xs font-bold uppercase text-gray-500">Original Plan (Before)</span>
              <span className="text-[10px] text-red-500 font-semibold">Overlapped / Missed</span>
            </div>
            <div className="space-y-2.5">
              {beforeDay?.activities?.map((act, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-gray-200 text-xs opacity-75">
                  <span className="font-mono font-bold text-gray-500 line-through">{act.time}</span>
                  <p className="font-semibold text-gray-700 mt-0.5 line-through">{act.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-brand-50/40 border border-brand-200 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-brand-200 mb-3">
              <span className="text-xs font-bold uppercase text-brand-700 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" /> Adapted Plan (After)
              </span>
              <Badge variant="success" className="text-[10px]">Optimized</Badge>
            </div>
            <div className="space-y-2.5">
              {afterDay?.activities?.map((act, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-brand-200/90 shadow-2xs text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand-600">{act.time}</span>
                    {act.statusChange && (
                      <span className="text-[10px] text-amber-600 font-bold capitalize">
                        {act.statusChange}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-900 mt-0.5">{act.title}</p>
                  {act.note && <p className="text-[10px] text-gray-500 mt-1 italic">{act.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={onUndo}
            className="w-full sm:w-auto text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Discard & Undo
          </Button>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full sm:w-auto text-xs font-semibold"
            >
              Review Later
            </Button>
            <Button
              variant="primary"
              onClick={onAccept}
              className="w-full sm:w-auto font-bold text-xs px-6 shadow-md shadow-brand-600/30 flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" /> Accept Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

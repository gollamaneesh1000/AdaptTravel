import React from 'react';
import {
  Clock,
  MapPin,
  Car,
  Plane,
  Footprints,
  Edit2,
  Trash2,
  Sparkles,
  AlertCircle,
  Tag,
  Bus,
  Train,
  Bike
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function ActivityCard({ activity, dayIndex, onRemove }) {
  const getTransportIcon = (transport) => {
    if (!transport) return <Footprints className="h-3.5 w-3.5" />;
    const lower = transport.toLowerCase();
    if (lower.includes('flight') || lower.includes('plane') || lower.includes('airport')) return <Plane className="h-3.5 w-3.5" />;
    if (lower.includes('bus') || lower.includes('volvo') || lower.includes('isbt')) return <Bus className="h-3.5 w-3.5" />;
    if (lower.includes('train') || lower.includes('rail') || lower.includes('vande') || lower.includes('junction')) return <Train className="h-3.5 w-3.5" />;
    if (lower.includes('bike') || lower.includes('motorcycle') || lower.includes('enfield')) return <Bike className="h-3.5 w-3.5" />;
    if (lower.includes('cab') || lower.includes('drive') || lower.includes('car') || lower.includes('taxi')) return <Car className="h-3.5 w-3.5" />;
    return <Footprints className="h-3.5 w-3.5" />;
  };

  const isAdapted = activity.statusChange;

  return (
    <div className="relative flex items-start space-x-4 group">
      {/* Timeline Bullet */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
            isAdapted
              ? 'bg-amber-500 text-white ring-4 ring-amber-100'
              : 'bg-white border-2 border-brand-600 text-brand-600'
          }`}
        >
          {isAdapted ? <Sparkles className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
        </div>
        <div className="w-0.5 h-full bg-gray-200 group-last:hidden mt-2" />
      </div>

      {/* Activity Card Body */}
      <Card
        className={`flex-1 mb-4 border transition-all ${
          isAdapted
            ? 'bg-amber-50/30 border-amber-300 shadow-xs'
            : 'bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-soft'
        }`}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                  {activity.time}
                </span>

                {activity.duration && (
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {activity.duration}
                  </span>
                )}

                {isAdapted && (
                  <Badge variant="warning" className="text-[10px]">
                    Adapted by Adapt AI
                  </Badge>
                )}
              </div>

              <h4 className="text-base font-bold text-gray-900 mt-1.5 leading-snug">
                {activity.title}
              </h4>

              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>{activity.location}</span>
              </p>

              {activity.note && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200/60 rounded-lg p-2 mt-2 font-medium">
                  {activity.note}
                </p>
              )}
            </div>

            {/* Actions & Cost */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
              <span className="text-sm font-bold text-gray-900">
                {activity.cost > 0 ? `₹${activity.cost.toLocaleString()}` : 'Free / Included'}
              </span>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onRemove(dayIndex, activity.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove activity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Transportation Badge */}
          {activity.transport && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-gray-100 text-gray-700">
                  {getTransportIcon(activity.transport)}
                </span>
                <span>{activity.transport}</span>
              </span>

              {activity.travelTime && activity.travelTime !== '—' && (
                <span className="text-[11px] text-gray-400 font-medium">
                  Transit: {activity.travelTime}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

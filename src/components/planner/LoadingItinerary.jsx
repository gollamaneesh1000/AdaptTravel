import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, CheckCircle2, Plane, MapPin, Shield } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';

export function LoadingItinerary({ destination = 'Goa' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    `Connecting to airline & transit APIs for ${destination}...`,
    'Curating top-rated cultural highlights and hidden gems...',
    'Optimizing schedule timings & transit buffers...',
    'Calibrating autonomous Adapt AI disruption engine...',
    'Finalizing personalized day-by-day itinerary!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prev + 18;
      });
    }, 400);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12 text-center max-w-xl mx-auto">
      {/* Animated Glowing Icon */}
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-3xl bg-brand-600 text-white flex items-center justify-center shadow-red-glow animate-bounce-subtle">
          <Compass className="h-10 w-10 text-white animate-spin [animation-duration:8s]" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600">
          <Sparkles className="h-4 w-4 fill-brand-600" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Adapt AI is creating your personalized itinerary…
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Building your autonomous travel schedule for <strong className="text-gray-800">{destination}</strong>
      </p>

      {/* Progress bar */}
      <div className="w-full mt-6 space-y-2">
        <Progress value={progress} className="h-2.5 bg-gray-200" />
        <div className="flex justify-between text-xs font-semibold text-gray-400">
          <span>Processing</span>
          <span className="text-brand-600">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Steps checklist */}
      <div className="mt-8 w-full text-left bg-white p-5 rounded-2xl border border-gray-200/90 shadow-soft space-y-3">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={idx} className="flex items-center space-x-3 text-xs">
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <div className="h-4 w-4 rounded-full border-2 border-brand-600 border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300 shrink-0" />
              )}
              <span
                className={`transition-colors ${
                  isDone
                    ? 'text-gray-900 font-medium'
                    : isCurrent
                    ? 'text-brand-600 font-bold'
                    : 'text-gray-400'
                }`}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

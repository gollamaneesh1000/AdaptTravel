import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Phone,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useChat, SUGGESTED_QUESTIONS } from '../../context/ChatContext';
import { useTrip } from '../../context/TripContext';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion } from '../ui/accordion';
import { HumanSupportModal } from './HumanSupportModal';

export function HelpPage({ onNavigate }) {
  const {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    isHumanSupportOpen,
    setIsHumanSupportOpen
  } = useChat();

  const { adaptTrip } = useTrip();
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleActionClick = (actionType) => {
    if (actionType === 'adapt_flight_cancelled') {
      adaptTrip('flight_cancelled');
      onNavigate('itinerary');
    } else if (actionType === 'open_adapt') {
      onNavigate('itinerary');
    } else if (actionType === 'view_flights') {
      onNavigate('transport');
    } else if (actionType === 'navigate_bookings') {
      onNavigate('bookings');
    } else if (actionType === 'navigate_payments') {
      onNavigate('payment');
    } else if (actionType === 'view_itinerary') {
      onNavigate('itinerary');
    }
  };

  const faqs = [
    {
      title: 'How does Adapt Travel Agent automatically adapt my trip?',
      content:
        'Adapt AI continuously cross-checks airline flight statuses, local weather warnings, and attraction operating hours. When a disruption occurs (e.g. 4-hour flight delay or heavy monsoon), Adapt AI shifts timings, finds nearby indoor alternatives, and coordinates hotel arrival notices.',
    },
    {
      title: 'Are cancellation waivers automatic for delayed flights?',
      content:
        'Yes! Through Adapt Travel Agent verified partner agreements, if your inbound transport is delayed or cancelled, hotel night adjustments and activity rescheduling are processed without penalty fees.',
    },
    {
      title: 'Can I undo an adaptation if my flight schedule recovers?',
      content:
        'Always. Every adaptation provides a side-by-side Before & After view with full Undo capability, allowing you to accept or discard changes anytime.',
    },
    {
      title: 'Who is Loco and how does Loco assist me?',
      content:
        'Loco is your dedicated 24/7 AI customer service assistant. Loco can explain your itinerary, look up booking statuses, trigger emergency adaptations, and escalate to human travel concierges.',
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Top Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary" className="mb-2">AI Customer Service</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How can Loco help you?
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Get instant help with your trips, bookings, payments and travel plans.
          </p>
        </div>

        {/* LOCO Main Chat Box */}
        <Card className="border-gray-200/90 shadow-card bg-white rounded-3xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <CardHeader className="p-4 sm:p-5 bg-gradient-to-r from-brand-600 to-brand-700 text-white flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 text-white shadow-xs">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-extrabold leading-none tracking-tight">Loco</h2>
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Online
                  </span>
                </div>
                <p className="text-xs text-white/80 mt-1">
                  AI Customer Support — Adapt Travel Agent
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => setIsHumanSupportOpen(true)}
                className="text-xs bg-white text-brand-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Human Support</span>
              </button>
            </div>
          </CardHeader>

          {/* Chat Feed */}
          <CardContent className="p-4 sm:p-6 flex-1 min-h-[400px] max-h-[500px] overflow-y-auto bg-gray-50/50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div className="flex items-end space-x-2 max-w-[90%] sm:max-w-[80%]">
                  {msg.sender === 'loco' && (
                    <div className="h-7 w-7 rounded-full bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0 mb-1">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200/90 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                    {/* Action buttons inside bot response */}
                    {msg.actions && (
                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-2">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act.actionType)}
                            className="px-3 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Human Support Fallback Button */}
                    {msg.showHumanSupport && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setIsHumanSupportOpen(true)}
                          className="font-bold text-xs"
                        >
                          Contact Human Support
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-gray-400 mt-1 px-9">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-200 w-fit">
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </CardContent>

          {/* Suggested Question Chips */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
              Suggested Questions:
            </span>
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300 border border-transparent transition-all cursor-pointer shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-gray-200 bg-white flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Loco anything about flights, hotel cancellations, or adapting your itinerary..."
              className="flex-1 text-sm bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!inputText.trim()}
              className="font-bold px-5 shadow-sm shadow-brand-600/30"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* Common Help Topics / FAQ Section */}
        <div className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>
          <Accordion items={faqs} />
        </div>
      </div>

      {/* Human Concierge Escalation Modal */}
      <HumanSupportModal
        open={isHumanSupportOpen}
        onOpenChange={setIsHumanSupportOpen}
      />
    </div>
  );
}

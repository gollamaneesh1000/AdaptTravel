import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Badge } from '../ui/badge';

export function FloatingLoco({ onNavigate }) {
  const { messages, isTyping, sendMessage, isFloatingOpen, setIsFloatingOpen } = useChat();
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-18 md:bottom-6 right-5 z-40">
        <button
          onClick={() => setIsFloatingOpen(true)}
          className="group flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-black px-4 py-2.5 rounded-full shadow-lg shadow-orange-500/35 hover:shadow-orange-glow transition-all duration-200 cursor-pointer active:scale-95"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-zinc-950 stroke-[2.5] animate-bounce-subtle" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <span className="text-sm font-black tracking-wide">Ask Loco</span>
        </button>
      </div>

      {/* Slide-over Drawer Chat */}
      <Sheet open={isFloatingOpen} onOpenChange={setIsFloatingOpen}>
        <SheetContent onClose={() => setIsFloatingOpen(false)} className="sm:max-w-md p-0 flex flex-col h-full bg-zinc-900 border-l border-zinc-800 text-zinc-100">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-zinc-950 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center border border-black/20">
                <Bot className="h-6 w-6 text-zinc-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-base leading-none text-zinc-950">Loco</h3>
                  <Badge variant="secondary" className="text-[10px] bg-black/20 text-zinc-950 border-0 py-0 font-bold">
                    AI Support
                  </Badge>
                </div>
                <p className="text-xs text-zinc-900/80 font-medium mt-0.5">Adapt Travel Agent Concierge</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsFloatingOpen(false);
                onNavigate('help');
              }}
              className="text-xs bg-black/15 hover:bg-black/25 px-2.5 py-1 rounded-md text-zinc-950 font-bold flex items-center gap-1 transition-colors"
              title="Open full Help page"
            >
              Full Help <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-medium rounded-br-none'
                      : 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 bg-zinc-900 px-3.5 py-2 rounded-2xl border border-zinc-800 max-w-[120px]">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-zinc-800 bg-zinc-900 flex overflow-x-auto no-scrollbar gap-1.5">
            {['My flight was cancelled', 'Where is my booking?', 'Change my itinerary'].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-orange-500/50 hover:text-orange-400 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 bg-zinc-900 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Loco anything..."
              className="flex-1 text-sm bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <Button type="submit" size="sm" variant="primary" disabled={!inputText.trim()} className="font-bold">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'loco',
    text: 'Hi! I’m Loco, your Adapt Travel Agent customer support assistant. How can I help you today?',
    timestamp: 'Just now',
    actions: null,
  }
];

export const SUGGESTED_QUESTIONS = [
  'My flight was cancelled',
  'I want to change my itinerary',
  'Where is my booking?',
  'How can I cancel my hotel?',
  'I need help with payment',
  'My trip has changed',
  'I want to contact support',
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isHumanSupportOpen, setIsHumanSupportOpen] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  const sendMessage = (text, onTriggerAdapt) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';
      let actions = null;
      let showHumanSupport = false;

      if (lower.includes('flight was cancelled') || lower.includes('flight cancelled')) {
        reply = "I understand how stressful a cancelled flight is! As your Adapt Travel Agent assistant, I can instantly trigger our **Adaptive Itinerary Engine** to condense your itinerary, request hotel waiver policies, or find alternative flights for you.";
        actions = [
          { label: '⚡ Adapt My Itinerary Now', actionType: 'adapt_flight_cancelled' },
          { label: 'View Replacement Flights', actionType: 'view_flights' },
        ];
      } else if (lower.includes('change my itinerary') || lower.includes('modify trip') || lower.includes('trip has changed')) {
        reply = "You can easily adapt your trip! Whether your plans shifted, a flight is delayed, or you want to add or remove activities, click the **'Adapt My Trip'** button on your Itinerary page or let me adjust it here.";
        actions = [
          { label: 'Open Adapt Trip Engine', actionType: 'open_adapt' },
          { label: 'View Current Itinerary', actionType: 'view_itinerary' },
        ];
      } else if (lower.includes('where is my booking') || lower.includes('booking status') || lower.includes('view booking')) {
        reply = "You currently have **4 confirmed bookings** in your account: \n• IndiGo Flight 6E 5382 (Confirmed)\n• Taj Holiday Village Resort (Confirmed)\n• Scuba Diving Tour (Confirmed)\n• Airport Cab Transfer (Confirmed)\n\nYou can view your full e-tickets and vouchers on the Bookings page.";
        actions = [
          { label: 'Go to My Bookings', actionType: 'navigate_bookings' },
        ];
      } else if (lower.includes('cancel my hotel') || lower.includes('hotel cancellation')) {
        reply = "To cancel or modify a hotel booking, visit the **Bookings** section, locate your hotel card, and click 'Cancel Booking'. Taj Holiday Village offers 100% free cancellation up to 24 hours prior to check-in.";
        actions = [
          { label: 'Manage Hotel Booking', actionType: 'navigate_bookings' },
        ];
      } else if (lower.includes('payment') || lower.includes('refund') || lower.includes('payment status')) {
        reply = "We accept Credit/Debit Cards, UPI (GPay, PhonePe), Net Banking, and Wallets. If a transaction fails, funds are automatically reversed within 24-48 hours. For refund processing on adapted trips, refunds are credited to your original payment mode.";
        actions = [
          { label: 'Check Payment History', actionType: 'navigate_payments' },
        ];
      } else if (lower.includes('delay') || lower.includes('traffic') || lower.includes('weather')) {
        reply = "Don't worry about unexpected weather or delays! Loco monitors live signals. If you are experiencing heavy rain or a 2-hour traffic jam, Adapt Travel Agent will swap outdoor activities with indoor heritage gems and notify your hotel.";
        actions = [
          { label: '⚡ Adapt for Weather / Delay', actionType: 'open_adapt' },
        ];
      } else if (lower.includes('contact support') || lower.includes('human') || lower.includes('agent') || lower.includes('representative')) {
        reply = "I’m unable to resolve this directly. Would you like to contact human support? Our 24/7 travel concierge team is available via priority phone and live ticket.";
        showHumanSupport = true;
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply = "Hello! I'm Loco, your 24/7 Adapt Travel Agent assistant. Ask me anything about your active trips, flight disruptions, hotel check-ins, or adapting your schedule!";
      } else {
        reply = "I'm looking into this for you. I can assist with adapting your itinerary, checking booking confirmations, rescheduling delayed flights, and payment queries. Would you like to contact our human support concierge for specialized requests?";
        showHumanSupport = true;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `loco-${Date.now()}`,
          sender: 'loco',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions,
          showHumanSupport,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        sendMessage,
        clearChat,
        isHumanSupportOpen,
        setIsHumanSupportOpen,
        isFloatingOpen,
        setIsFloatingOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}

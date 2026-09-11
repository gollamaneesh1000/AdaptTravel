import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialGoaTrip,
  chardhamKedarnathTrip,
  varanasiTrip,
  hampiTrip,
  disruptionScenarios,
} from '../data/mockItineraries';
import { mockBookings, mockNotifications } from '../data/mockBookings';
import { mockDestinations } from '../data/mockDestinations';
import { generateVibeSpecificTrip } from '../lib/vibeTripGenerator';
import { db } from '../lib/database';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [currentTrip, setCurrentTrip] = useState(chardhamKedarnathTrip);
  const [originalTripBeforeAdapt, setOriginalTripBeforeAdapt] = useState(null);
  const [activeAdaptation, setActiveAdaptation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdapting, setIsAdapting] = useState(false);

  // Saved Trips synchronized with persistent database
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const tripsFromDb = db.table('trips').getAll();
      return tripsFromDb.length > 0 ? tripsFromDb : [
        { ...chardhamKedarnathTrip, id: 'trip-chardham-upcoming', type: 'upcoming' },
        { ...initialGoaTrip, id: 'trip-goa-upcoming', type: 'upcoming' },
        { ...varanasiTrip, id: 'trip-varanasi-past', status: 'Completed', type: 'past' },
        { ...hampiTrip, id: 'trip-hampi-past', status: 'Completed', type: 'past' },
      ];
    } catch {
      return [
        { ...chardhamKedarnathTrip, id: 'trip-chardham-upcoming', type: 'upcoming' },
        { ...initialGoaTrip, id: 'trip-goa-upcoming', type: 'upcoming' },
      ];
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const bookingsFromDb = db.table('bookings').getAll();
      return bookingsFromDb.length > 0 ? bookingsFromDb : mockBookings;
    } catch {
      return mockBookings;
    }
  });

  const [notifications, setNotifications] = useState(mockNotifications);

  // Subscribe to reactive database changes
  useEffect(() => {
    const unsubTrips = db.subscribe('trips', (updatedTrips) => {
      if (updatedTrips && updatedTrips.length > 0) {
        setSavedTrips(updatedTrips);
      }
    });

    const unsubBookings = db.subscribe('bookings', (updatedBookings) => {
      if (updatedBookings && updatedBookings.length > 0) {
        setBookings(updatedBookings);
      }
    });

    return () => {
      unsubTrips();
      unsubBookings();
    };
  }, []);

  // Mark notification read
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Generate Trip from Wizard or Hero Quick Planner
  const generateTrip = (formData, onComplete) => {
    setIsGenerating(true);

    setTimeout(() => {
      // Dynamically generate authentic places, vibe-matched itinerary, and mode-aware transit
      const newTrip = generateVibeSpecificTrip(formData);

      // Insert record into persistent database
      const insertedTrip = db.table('trips').insert({
        ...newTrip,
        type: 'upcoming',
        status: 'Confirmed'
      });

      setCurrentTrip(insertedTrip);
      setIsGenerating(false);

      // Add notification
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'itinerary_generated',
          title: `Itinerary for ${insertedTrip.destination} Ready!`,
          description: `Personalized ${insertedTrip.travelMode} transit & ${insertedTrip.travelStyle?.split('(')[0] || 'vibe'} places saved to Database.`,
          time: 'Just now',
          unread: true,
          category: 'ai',
        },
        ...prev,
      ]);

      if (onComplete) onComplete(insertedTrip);
    }, 1800);
  };

  // Adapt Trip Algorithm
  const adaptTrip = (scenarioId, customDetails = '') => {
    setIsAdapting(true);
    const scenario = disruptionScenarios.find((s) => s.id === scenarioId) || disruptionScenarios[0];

    setTimeout(() => {
      // Store current state for undo
      setOriginalTripBeforeAdapt(JSON.parse(JSON.stringify(currentTrip)));

      // Clone and modify current trip based on scenario
      const adapted = JSON.parse(JSON.stringify(currentTrip));
      adapted.isAdapted = true;
      adapted.adaptationReason = scenario.title;

      if (scenario.id === 'flight_delayed_4h' && adapted.days && adapted.days[0]) {
        adapted.days[0].activities = adapted.days[0].activities.map((act, idx) => {
          if (idx === 0) {
            return {
              ...act,
              time: '03:00 PM (Delayed 4h)',
              title: `Delayed Arrival & Check-in at ${adapted.destination}`,
              statusChange: 'delayed',
            };
          }
          if (idx === 1) {
            return {
              ...act,
              time: '04:30 PM (Shifted)',
              title: 'Express Hotel / Ashram Check-in & Refreshments',
              statusChange: 'rescheduled',
            };
          }
          if (idx === 2) {
            return {
              ...act,
              time: '06:30 PM (Shifted)',
              title: 'Evening Sunset Viewpoint / Sacred Aarti Darshan',
              statusChange: 'rescheduled',
            };
          }
          return act;
        });
      } else if (scenario.id === 'temple_closed_or_crowded' && adapted.days && adapted.days[1]) {
        adapted.days[1].activities = adapted.days[1].activities.map((act, idx) => {
          if (idx === 1) {
            return {
              ...act,
              title: 'VIP Darshan Slot & Pujan (Re-routed to skip 3h queue)',
              statusChange: 'substituted',
              note: 'Shifted from morning general line to afternoon VIP fast-track darshan.',
            };
          }
          return act;
        });
      }

      setActiveAdaptation({
        scenario,
        customDetails,
        adaptedTrip: adapted,
        beforeDay: currentTrip.days ? currentTrip.days[0] : null,
        afterDay: adapted.days ? adapted.days[0] : null,
        changes: scenario.changesSummary,
      });

      setIsAdapting(false);
    }, 1200);
  };

  // Accept Adaptation
  const acceptAdaptation = () => {
    if (activeAdaptation && activeAdaptation.adaptedTrip) {
      setCurrentTrip(activeAdaptation.adaptedTrip);
      setActiveAdaptation(null);

      // Add alert notification
      setNotifications((prev) => [
        {
          id: `notif-adapt-${Date.now()}`,
          type: 'itinerary_adapted',
          title: 'Pilgrimage Itinerary Successfully Adapted!',
          description: `Timeline and darshan schedules updated for ${activeAdaptation.scenario.title}. All timings synced.`,
          time: 'Just now',
          unread: true,
          category: 'ai',
        },
        ...prev,
      ]);
    }
  };

  // Undo Adaptation
  const undoAdaptation = () => {
    if (originalTripBeforeAdapt) {
      setCurrentTrip(originalTripBeforeAdapt);
      setOriginalTripBeforeAdapt(null);
      setActiveAdaptation(null);
    }
  };

  // Discard preview without applying
  const closeAdaptationPreview = () => {
    setActiveAdaptation(null);
  };

  // Remove Activity
  const removeActivity = (dayIndex, actId) => {
    setCurrentTrip((prev) => {
      const copy = { ...prev };
      if (copy.days && copy.days[dayIndex]) {
        copy.days[dayIndex].activities = copy.days[dayIndex].activities.filter(
          (a) => a.id !== actId
        );
      }
      return copy;
    });
  };

  // Add Booking
  const addBooking = (item) => {
    const newBooking = {
      id: `ATA-${Math.floor(1000 + Math.random() * 9000)}`,
      category: item.category || 'Hotels',
      service: item.name || item.provider || item.service || 'Travel Booking',
      date: item.date || 'Oct 15, 2026',
      time: item.time || 'Confirmed Time',
      travelers: '2 Guests / Pilgrims',
      status: 'Confirmed',
      price: item.price || item.pricePerNight || 3500,
      confirmationCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      details: item.location || item.details || 'Instant Booking Confirmed',
    };
    setBookings((prev) => [newBooking, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-book-${Date.now()}`,
        type: 'booking_confirmed',
        title: `Booking Confirmed: ${newBooking.service}`,
        description: `Your confirmation code is ${newBooking.confirmationCode}. View in Bookings.`,
        time: 'Just now',
        unread: true,
        category: 'hotel',
      },
      ...prev,
    ]);

    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        setCurrentTrip,
        savedTrips,
        bookings,
        notifications,
        isGenerating,
        isAdapting,
        activeAdaptation,
        generateTrip,
        adaptTrip,
        acceptAdaptation,
        undoAdaptation,
        closeAdaptationPreview,
        removeActivity,
        addBooking,
        cancelBooking,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  return useContext(TripContext);
}

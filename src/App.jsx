import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { ChatProvider } from './context/ChatContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { FloatingLoco } from './components/layout/FloatingLoco';

import { HomePage } from './components/home/HomePage';
import { TripPlannerWizard } from './components/planner/TripPlannerWizard';
import { ItineraryView } from './components/itinerary/ItineraryView';
import { HotelsPage } from './components/hotels/HotelsPage';
import { TransportPage } from './components/transport/TransportPage';
import { ExplorePage } from './components/explore/ExplorePage';
import { MyTripsPage } from './components/trips/MyTripsPage';
import { BookingsPage } from './components/bookings/BookingsPage';
import { PaymentPage } from './components/payment/PaymentPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { HelpPage } from './components/help/HelpPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState(null);

  // Strictly enforce login visibility rule:
  // "The Login page must NOT appear if the user is already logged in."
  useEffect(() => {
    if (isLoggedIn && (currentRoute === 'login' || currentRoute === 'signup')) {
      setCurrentRoute('home');
    }
    if (!isLoggedIn && (currentRoute === 'trips' || currentRoute === 'bookings' || currentRoute === 'profile')) {
      setCurrentRoute('login');
    }
  }, [isLoggedIn, currentRoute]);

  const navigate = (route, params = null) => {
    // Protected routes check
    const protectedRoutes = ['trips', 'bookings', 'payment', 'profile'];
    if (protectedRoutes.includes(route) && !isLoggedIn) {
      setCurrentRoute('login');
      return;
    }

    // Login route check
    if ((route === 'login' || route === 'signup') && isLoggedIn) {
      setCurrentRoute('home');
      return;
    }

    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'planner':
        return <TripPlannerWizard onNavigate={navigate} params={routeParams} />;
      case 'itinerary':
        return <ItineraryView onNavigate={navigate} />;
      case 'hotels':
        return <HotelsPage onNavigate={navigate} />;
      case 'transport':
        return <TransportPage onNavigate={navigate} />;
      case 'explore':
        return <ExplorePage onNavigate={navigate} />;
      case 'trips':
        return <MyTripsPage onNavigate={navigate} />;
      case 'bookings':
        return <BookingsPage onNavigate={navigate} />;
      case 'payment':
        return <PaymentPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'help':
        return <HelpPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignUpPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-textDark">
      {/* Global Header */}
      <Header currentRoute={currentRoute} onNavigate={navigate} />

      {/* Main Page Body */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav currentRoute={currentRoute} onNavigate={navigate} />

      {/* Floating Loco Bottom-Right Widget (when logged in or browsing) */}
      {currentRoute !== 'help' && (
        <FloatingLoco onNavigate={navigate} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </TripProvider>
    </AuthProvider>
  );
}

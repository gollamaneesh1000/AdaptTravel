import React, { useState } from 'react';
import {
  Compass,
  Bell,
  Search,
  User,
  LogOut,
  Calendar,
  CheckCircle,
  Menu,
  X,
  Bot,
  Plane,
  ShieldCheck,
  ChevronDown,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { GlobalSearchModal } from './GlobalSearchModal';

export function Header({ currentRoute, onNavigate }) {
  const { isLoggedIn, authUser, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useTrip();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = (notifications || []).filter((n) => n?.unread).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'planner', label: 'Plan Trip' },
    { id: 'explore', label: 'Explore' },
    { id: 'trips', label: 'My Trips', protected: true },
    { id: 'bookings', label: 'Bookings', protected: true },
    { id: 'payment', label: 'Payment Details', protected: true },
    { id: 'help', label: 'Help', isLoco: true },
  ];

  const handleNavClick = (id, isProtected) => {
    if (isProtected && !isLoggedIn) {
      onNavigate('login');
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-black font-black shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Compass className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none flex items-center">
                Adapt <span className="text-orange-500 ml-1">Travel Agent</span>
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase mt-0.5">
                AI Autonomous Planning & Adaptation
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.protected)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-orange-400 bg-orange-950/40 border border-orange-500/30 shadow-2xs'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.isLoco && (
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Loco AI
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 h-9 px-3 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-zinc-100 hover:border-orange-500/40 text-xs font-medium transition-colors cursor-pointer"
              title="Search destinations and bookings"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden lg:inline">Search trips...</span>
              <kbd className="hidden lg:inline rounded bg-zinc-950 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 border border-zinc-800 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Bell with Dropdown */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-black ring-2 ring-zinc-950 animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="right" className="w-80 p-0 overflow-hidden bg-zinc-900 border-zinc-800 text-zinc-200">
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">Notifications</span>
                      {unreadCount > 0 && (
                        <Badge variant="primary" className="text-[10px] px-2 py-0 bg-orange-500 text-black font-bold">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs font-medium text-orange-400 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-zinc-800">
                    {(!notifications || notifications.length === 0) ? (
                      <div className="p-4 text-center text-xs text-zinc-500">No notifications</div>
                    ) : (
                      (notifications || []).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3.5 hover:bg-zinc-800/80 transition-colors cursor-pointer text-left ${
                            n.unread ? 'bg-orange-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-bold text-white leading-tight">
                              {n.title}
                            </h5>
                            <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{n.time}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 leading-snug">{n.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Authentication States */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center space-x-2.5 p-1 pl-1.5 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-zinc-800">
                    <Avatar className="h-8 w-8 ring-2 ring-orange-500/40">
                      <AvatarImage src={authUser?.avatar} alt={authUser?.name} />
                      <AvatarFallback className="bg-zinc-800 text-orange-400 font-bold">
                        {authUser?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-bold text-zinc-100 leading-none flex items-center">
                        {authUser?.name?.split(' ')[0] || 'Traveler'}
                        <ChevronDown className="h-3 w-3 text-zinc-500 ml-1" />
                      </span>
                      <span className="text-[10px] text-zinc-500">Explorer</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="right" className="w-56 p-1 bg-zinc-900 border-zinc-800 text-zinc-200">
                  <div className="px-3 py-2.5 border-b border-zinc-800 mb-1">
                    <p className="text-xs font-bold text-white">{authUser?.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{authUser?.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => onNavigate('profile')} className="hover:bg-zinc-800 hover:text-orange-400 cursor-pointer">
                    <User className="h-4 w-4 mr-2.5 text-zinc-400" />
                    My Profile & Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('trips')} className="hover:bg-zinc-800 hover:text-orange-400 cursor-pointer">
                    <Calendar className="h-4 w-4 mr-2.5 text-zinc-400" />
                    My Trips
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('bookings')} className="hover:bg-zinc-800 hover:text-orange-400 cursor-pointer">
                    <CheckCircle className="h-4 w-4 mr-2.5 text-zinc-400" />
                    Bookings & E-Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('payment')} className="hover:bg-zinc-800 hover:text-orange-400 cursor-pointer">
                    <CreditCard className="h-4 w-4 mr-2.5 text-zinc-400" />
                    Payment Details & Invoices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('help')} className="hover:bg-zinc-800 hover:text-orange-400 cursor-pointer">
                    <Bot className="h-4 w-4 mr-2.5 text-orange-500" />
                    Ask Loco Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      onNavigate('login');
                    }}
                    className="text-red-400 hover:bg-red-950/40 hover:text-red-300 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2.5 text-red-400" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('login')}
                  className="font-semibold text-zinc-200 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-orange-400 cursor-pointer"
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('signup')}
                  className="font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:brightness-110 shadow-md shadow-orange-500/25 hidden sm:inline-flex cursor-pointer"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-1 shadow-2xl animate-slide-up">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.protected)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentRoute === item.id
                    ? 'bg-orange-950/40 text-orange-400 border border-orange-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.isLoco && (
                  <Badge variant="primary" className="text-[10px] bg-orange-500/20 text-orange-400 border-orange-500/30">
                    Loco AI
                  </Badge>
                )}
              </button>
            ))}
            {!isLoggedIn && (
              <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
                <Button variant="outline" onClick={() => handleNavClick('login', false)} className="w-full bg-zinc-900 border-zinc-700 text-zinc-200">
                  Log In
                </Button>
                <Button variant="primary" onClick={() => handleNavClick('signup', false)} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onNavigate={onNavigate}
      />

    </>
  );
}

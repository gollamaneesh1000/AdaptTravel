import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  Search,
  Download,
  RotateCcw,
  Layers,
  MapPin,
  Sparkles,
  Users,
  Compass,
  CreditCard,
  Hotel,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  X,
  Code
} from 'lucide-react';
import { db } from '../../lib/database.js';
import { Dialog, DialogContent } from '../ui/dialog.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';

export function DatabaseInspectorModal({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState('destinations');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(() => db.getTableStats());
  const [tableData, setTableData] = useState(() => db.table('destinations').getAll());
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [copied, setCopied] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Subscribe to table changes dynamically
  useEffect(() => {
    const unsub = db.subscribe(activeTab, (data) => {
      setTableData([...data]);
      setStats(db.getTableStats());
    });
    return () => unsub();
  }, [activeTab]);

  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedRecord(null);
    setTableData(db.table(tab).getAll());
  };

  // Filter rows based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return tableData;
    const term = searchTerm.toLowerCase().trim();
    return tableData.filter((item) => {
      return Object.values(item).some((val) => {
        if (typeof val === 'string') return val.toLowerCase().includes(term);
        if (typeof val === 'number') return val.toString().includes(term);
        if (Array.isArray(val)) {
          return val.some((sub) => typeof sub === 'string' && sub.toLowerCase().includes(term));
        }
        return false;
      });
    });
  }, [tableData, searchTerm]);

  // Export JSON file
  const handleExportJSON = () => {
    const jsonStr = db.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adapt_travel_database_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy active table or record
  const handleCopyJSON = (data) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset database with confirmation
  const handleReset = () => {
    if (window.confirm('Reset database back to default seed data? Any new bookings or customized profiles will revert.')) {
      db.reset();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  const tabsConfig = [
    { id: 'destinations', label: 'Destinations', icon: MapPin, count: stats.destinations || 0 },
    { id: 'places', label: 'Places & Sights', icon: Sparkles, count: stats.places || 0 },
    { id: 'trips', label: 'Trips & Itineraries', icon: Compass, count: stats.trips || 0 },
    { id: 'users', label: 'Users', icon: Users, count: stats.users || 0 },
    { id: 'bookings', label: 'Bookings', icon: CreditCard, count: stats.bookings || 0 },
    { id: 'hotels', label: 'Hotels', icon: Hotel, count: stats.hotels || 0 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full p-0 overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Adapt Travel Persistent Database
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                  Engine Online
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                LocalStorage relational engine with reactive listeners, CRUD tables, and comprehensive Indian travel datasets.
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportJSON}
              className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white text-xs h-8"
              title="Download entire database as JSON"
            >
              <Download className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
              Export JSON
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="bg-slate-800/80 border-slate-700 text-rose-300 hover:bg-rose-950/50 hover:border-rose-700 hover:text-rose-200 text-xs h-8"
              title="Reset database to seed records"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5 text-rose-400" />
              Reset DB
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Alert for reset */}
        {resetSuccess && (
          <div className="bg-emerald-50 text-emerald-800 px-4 py-2 text-xs font-semibold flex items-center gap-2 border-b border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Database restored to initial seed dataset successfully!
          </div>
        )}

        {/* Navigation Tabs and Search Bar */}
        <div className="bg-slate-50 border-b border-gray-200 px-5 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-emerald-700/80 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="h-3.5 w-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Body: Split Table / Detail Panel */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Main Table View */}
          <div className={`flex-1 overflow-auto p-4 transition-all ${selectedRecord ? 'md:w-3/5' : 'w-full'}`}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold sticky top-0 z-10 uppercase text-[10px] tracking-wider">
                  {renderTableHeaders(activeTab)}
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-400 text-xs">
                        No records found matching "{searchTerm}" in {activeTab}.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        onClick={() => setSelectedRecord(row)}
                        className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${
                          selectedRecord?.id === row.id ? 'bg-emerald-50/80 font-medium' : ''
                        }`}
                      >
                        {renderTableRow(activeTab, row)}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 px-1">
              <span>
                Showing <strong>{filteredData.length}</strong> of <strong>{tableData.length}</strong> {activeTab}
              </span>
              <span className="text-[11px] text-gray-400">
                Click any row to inspect full JSON attributes & schema
              </span>
            </div>
          </div>

          {/* Side Inspector Drawer (If Record Selected) */}
          {selectedRecord && (
            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 bg-slate-50 flex flex-col max-h-[45vh] md:max-h-none overflow-hidden">
              <div className="p-3.5 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-900">
                    Record Inspector: <code className="text-emerald-700 font-mono">{selectedRecord.id || selectedRecord.name}</code>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyJSON(selectedRecord)}
                    className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-gray-600 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Copy record JSON"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="p-1 text-gray-400 hover:text-gray-700 rounded-md"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-3.5 font-mono text-[11px] text-slate-800 bg-slate-900 text-emerald-400">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(selectedRecord, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Table Header Render Helper
function renderTableHeaders(tab) {
  switch (tab) {
    case 'destinations':
      return (
        <tr>
          <th className="p-3">Destination</th>
          <th className="p-3">Region / State</th>
          <th className="p-3">Vibes</th>
          <th className="p-3">Altitude & Weather</th>
          <th className="p-3">Best Season</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      );
    case 'places':
      return (
        <tr>
          <th className="p-3">Sight / Attraction</th>
          <th className="p-3">Destination</th>
          <th className="p-3">Vibe</th>
          <th className="p-3">Duration</th>
          <th className="p-3">Est. Cost</th>
          <th className="p-3 text-right">Rating</th>
        </tr>
      );
    case 'trips':
      return (
        <tr>
          <th className="p-3">Trip Destination</th>
          <th className="p-3">Dates & Days</th>
          <th className="p-3">Travel Mode</th>
          <th className="p-3">Budget</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-right">Places</th>
        </tr>
      );
    case 'users':
      return (
        <tr>
          <th className="p-3">User</th>
          <th className="p-3">Email</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Role</th>
          <th className="p-3">Loyalty Pts</th>
          <th className="p-3 text-right">Created</th>
        </tr>
      );
    case 'bookings':
      return (
        <tr>
          <th className="p-3">Booking ID</th>
          <th className="p-3">Service & Route</th>
          <th className="p-3">Date & Time</th>
          <th className="p-3">Status</th>
          <th className="p-3">Total Paid</th>
          <th className="p-3 text-right">Seat/Ref</th>
        </tr>
      );
    case 'hotels':
      return (
        <tr>
          <th className="p-3">Hotel Name</th>
          <th className="p-3">Destination</th>
          <th className="p-3">Category</th>
          <th className="p-3">Amenities</th>
          <th className="p-3 text-right">Price / Night</th>
        </tr>
      );
    default:
      return null;
  }
}

// Table Row Render Helper
function renderTableRow(tab, item) {
  switch (tab) {
    case 'destinations':
      return (
        <>
          <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
            <span className="text-base">📍</span>
            <span>{item.name}</span>
          </td>
          <td className="p-3 text-gray-600">
            {item.region} • <span className="text-gray-400">{item.state}</span>
          </td>
          <td className="p-3">
            <div className="flex flex-wrap gap-1">
              {(item.vibes || []).slice(0, 3).map((v) => (
                <span
                  key={v}
                  className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold capitalize"
                >
                  {v}
                </span>
              ))}
            </div>
          </td>
          <td className="p-3 text-gray-600">{item.weather || item.altitude || 'Pleasant'}</td>
          <td className="p-3 text-gray-600">{item.bestSeason || 'Oct - Mar'}</td>
          <td className="p-3 text-right">
            <Button size="sm" variant="ghost" className="h-7 text-emerald-600 hover:text-emerald-800 text-xs">
              <Eye className="h-3 w-3 mr-1" /> View
            </Button>
          </td>
        </>
      );
    case 'places':
      return (
        <>
          <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
            <span>{item.name}</span>
          </td>
          <td className="p-3 text-gray-600 font-medium capitalize">
            {item.destinationId?.replace(/_/g, ' ')}
          </td>
          <td className="p-3">
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold capitalize">
              {item.vibe}
            </span>
          </td>
          <td className="p-3 text-gray-600">{item.duration}</td>
          <td className="p-3 font-semibold text-gray-800">{item.cost}</td>
          <td className="p-3 text-right font-bold text-amber-600">★ {item.rating}</td>
        </>
      );
    case 'trips':
      return (
        <>
          <td className="p-3 font-bold text-gray-900">
            {item.destination || item.title}
          </td>
          <td className="p-3 text-gray-600">
            {item.dates || `${item.days || 3} Days`}
          </td>
          <td className="p-3">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
              {item.travelMode || item.transportMode || 'Bus'}
            </span>
          </td>
          <td className="p-3 font-semibold text-emerald-700">{item.budget || '₹35,000'}</td>
          <td className="p-3">
            <Badge variant={item.type === 'past' ? 'secondary' : 'primary'} className="text-[10px]">
              {item.status || (item.type === 'past' ? 'Completed' : 'Confirmed')}
            </Badge>
          </td>
          <td className="p-3 text-right text-gray-500 font-medium">
            {(item.itinerary || []).reduce((acc, d) => acc + (d.places?.length || 0), 0) || item.places?.length || 4} spots
          </td>
        </>
      );
    case 'users':
      return (
        <>
          <td className="p-3 font-bold text-gray-900">{item.name}</td>
          <td className="p-3 text-gray-600">{item.email}</td>
          <td className="p-3 text-gray-600">{item.phone}</td>
          <td className="p-3">
            <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
              {item.role || 'Member'}
            </span>
          </td>
          <td className="p-3 font-bold text-emerald-600">{item.loyaltyPoints || 0} pts</td>
          <td className="p-3 text-right text-gray-400">
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
          </td>
        </>
      );
    case 'bookings':
      return (
        <>
          <td className="p-3 font-mono font-bold text-slate-800">{item.id}</td>
          <td className="p-3 text-gray-800 font-medium">
            {item.service || item.title} • <span className="text-gray-500">{item.route || item.subtitle}</span>
          </td>
          <td className="p-3 text-gray-600">{item.date || item.departureTime || 'Upcoming'}</td>
          <td className="p-3">
            <Badge variant="primary" className="text-[10px]">
              {item.status || 'Confirmed'}
            </Badge>
          </td>
          <td className="p-3 font-bold text-emerald-700">{item.total || item.price || '₹1,850'}</td>
          <td className="p-3 text-right font-mono text-gray-600">{item.seat || item.reference || 'A1'}</td>
        </>
      );
    case 'hotels':
      return (
        <>
          <td className="p-3 font-bold text-gray-900">{item.name}</td>
          <td className="p-3 text-gray-600 capitalize">{item.destinationId}</td>
          <td className="p-3">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold capitalize">
              {item.category}
            </span>
          </td>
          <td className="p-3 text-gray-500 text-[11px]">{(item.amenities || []).slice(0, 3).join(', ')}</td>
          <td className="p-3 text-right font-bold text-emerald-700">{item.pricePerNight}</td>
        </>
      );
    default:
      return null;
  }
}

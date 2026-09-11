/**
 * Client-Side Persistent Database Engine (Adapt Travel Agent DB)
 * Provides relational table management, CRUD operations, queries, and reactive subscriptions.
 * Persists data to LocalStorage with automatic fallback and in-memory cache.
 */

import { MASTER_DESTINATIONS, MASTER_PLACES, MASTER_HOTELS, MASTER_TRANSPORTS } from '../data/travelDatabase.js';
import { initialGoaTrip, chardhamKedarnathTrip, varanasiTrip, hampiTrip } from '../data/mockItineraries.js';
import { mockBookings } from '../data/mockBookings.js';

const DB_STORAGE_KEY = 'adapt_travel_agent_db_v2';

// Initial seed data
const SEED_DATA = {
  users: [
    {
      id: 'usr-8821',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      password: 'password123',
      role: 'Explorer Member',
      loyaltyPoints: 3450,
      travelStyle: 'Romantic & Cultural',
      budget: 'Comfort (₹35,000 - ₹60,000)',
      preferredTransport: 'Bus (AC Volvo Sleeper)',
      createdAt: '2026-01-10T10:00:00Z',
    },
    {
      id: 'usr-9042',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98123 45678',
      password: 'password123',
      role: 'VIP Traveler',
      loyaltyPoints: 5120,
      travelStyle: 'Spiritual Pilgrimage',
      budget: 'Premium (₹60,000 / $720)',
      preferredTransport: 'Train (Vande Bharat)',
      createdAt: '2026-02-15T14:30:00Z',
    }
  ],
  trips: [
    {
      ...chardhamKedarnathTrip,
      id: 'trip-chardham-upcoming',
      userId: 'usr-8821',
      type: 'upcoming',
      status: 'Confirmed',
      travelMode: 'Bus (AC Volvo Sleeper)',
      transportMode: 'Bus',
    },
    {
      ...initialGoaTrip,
      id: 'trip-goa-upcoming',
      userId: 'usr-8821',
      type: 'upcoming',
      status: 'Confirmed',
      travelMode: 'Flight',
      transportMode: 'Flight',
    },
    {
      ...varanasiTrip,
      id: 'trip-varanasi-past',
      userId: 'usr-8821',
      type: 'past',
      status: 'Completed',
      travelMode: 'Train (Vande Bharat)',
      transportMode: 'Train',
    },
    {
      ...hampiTrip,
      id: 'trip-hampi-past',
      userId: 'usr-8821',
      type: 'past',
      status: 'Completed',
      travelMode: 'Private Cab / Car',
      transportMode: 'Car / Cab',
    }
  ],
  bookings: mockBookings.map((b, i) => ({
    ...b,
    userId: 'usr-8821',
    createdAt: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
  })),
  destinations: MASTER_DESTINATIONS,
  places: MASTER_PLACES,
  hotels: MASTER_HOTELS,
  favorites: [
    { id: 'fav-1', userId: 'usr-8821', itemType: 'destination', itemId: 'manali', savedAt: '2026-03-01T08:00:00Z' },
    { id: 'fav-2', userId: 'usr-8821', itemType: 'destination', itemId: 'kedarnath', savedAt: '2026-03-05T12:00:00Z' },
  ]
};

class DatabaseEngine {
  constructor() {
    this.tables = {};
    this.listeners = {};
    this.init();
  }

  init() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(DB_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          this.tables = { ...SEED_DATA, ...parsed };
          // Ensure all seed destinations & places are available
          if (!this.tables.destinations || this.tables.destinations.length === 0) {
            this.tables.destinations = MASTER_DESTINATIONS;
          }
          if (!this.tables.places || this.tables.places.length === 0) {
            this.tables.places = MASTER_PLACES;
          }
          return;
        }
      }
    } catch (e) {
      console.warn('Database initialization from localStorage failed, using seed data:', e);
    }

    // Default to seed data
    this.tables = JSON.parse(JSON.stringify(SEED_DATA));
    this.persist();
  }

  persist() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(this.tables));
      }
    } catch (e) {
      console.error('Failed to persist database to localStorage:', e);
    }
  }

  notify(tableName) {
    if (this.listeners[tableName]) {
      const data = this.tables[tableName] || [];
      this.listeners[tableName].forEach((fn) => {
        try {
          fn(data);
        } catch (err) {
          console.error(`Error in database listener for ${tableName}:`, err);
        }
      });
    }
  }

  subscribe(tableName, callback) {
    if (!this.listeners[tableName]) {
      this.listeners[tableName] = new Set();
    }
    this.listeners[tableName].add(callback);

    // Initial trigger
    callback(this.tables[tableName] || []);

    return () => {
      if (this.listeners[tableName]) {
        this.listeners[tableName].delete(callback);
      }
    };
  }

  table(tableName) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }

    const self = this;
    const tableData = this.tables[tableName];

    return {
      getAll() {
        return [...tableData];
      },

      getById(id) {
        return tableData.find((row) => String(row.id) === String(id)) || null;
      },

      find(predicate) {
        return tableData.filter(predicate);
      },

      findOne(predicate) {
        return tableData.find(predicate) || null;
      },

      count() {
        return tableData.length;
      },

      insert(record) {
        const id = record.id || `${tableName.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newRecord = {
          ...record,
          id,
          createdAt: record.createdAt || new Date().toISOString(),
        };
        tableData.unshift(newRecord);
        self.persist();
        self.notify(tableName);
        return newRecord;
      },

      update(id, updates) {
        const index = tableData.findIndex((row) => String(row.id) === String(id));
        if (index === -1) return null;
        tableData[index] = {
          ...tableData[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        self.persist();
        self.notify(tableName);
        return tableData[index];
      },

      delete(id) {
        const index = tableData.findIndex((row) => String(row.id) === String(id));
        if (index === -1) return false;
        tableData.splice(index, 1);
        self.persist();
        self.notify(tableName);
        return true;
      },

      clear() {
        self.tables[tableName] = [];
        self.persist();
        self.notify(tableName);
      }
    };
  }

  // Specialized Domain Helper Queries
  destinations = {
    search: (keyword = '', vibe = '') => {
      const kw = keyword.toLowerCase().trim();
      const v = vibe.toLowerCase().trim();
      const all = this.table('destinations').getAll();

      return all.filter((d) => {
        const nameMatch = !kw || d.name.toLowerCase().includes(kw) || d.state.toLowerCase().includes(kw) || d.tags?.some(t => t.toLowerCase().includes(kw));
        const vibeMatch = !v || d.tags?.some(t => t.toLowerCase().includes(v));
        return nameMatch && vibeMatch;
      });
    },
    getByIdOrName: (idOrName) => {
      if (!idOrName) return null;
      const lower = idOrName.toLowerCase().trim();
      return this.table('destinations').findOne(
        (d) => d.id.toLowerCase() === lower || d.name.toLowerCase() === lower || d.name.toLowerCase().includes(lower)
      );
    }
  };

  places = {
    getByDestination: (destIdOrName, vibe = '') => {
      const dest = this.destinations.getByIdOrName(destIdOrName);
      const destId = dest ? dest.id : destIdOrName.toLowerCase().replace(/\s+/g, '_');
      const vLower = vibe.toLowerCase();

      return this.table('places').find((p) => {
        const destMatch = p.destinationId === destId || (dest && p.destinationId === dest.id);
        const vibeMatch = !vibe || (p.vibe && vLower.includes(p.vibe.toLowerCase()));
        return destMatch && vibeMatch;
      });
    }
  };

  users = {
    findByEmail: (email) => {
      if (!email) return null;
      const clean = email.toLowerCase().trim();
      return this.table('users').findOne((u) => u.email.toLowerCase() === clean);
    },
    findByPhone: (phone) => {
      if (!phone) return null;
      const clean = phone.replace(/[^0-9]/g, '');
      return this.table('users').findOne((u) => u.phone.replace(/[^0-9]/g, '').includes(clean));
    }
  };

  trips = {
    getByUserId: (userId) => {
      return this.table('trips').find((t) => t.userId === userId);
    },
    getUpcoming: (userId) => {
      return this.table('trips').find((t) => (!userId || t.userId === userId) && t.type === 'upcoming');
    },
    getPast: (userId) => {
      return this.table('trips').find((t) => (!userId || t.userId === userId) && t.type === 'past');
    }
  };

  // Database Management
  exportJSON() {
    return JSON.stringify(this.tables, null, 2);
  }

  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && typeof data === 'object') {
        this.tables = data;
        this.persist();
        Object.keys(this.tables).forEach((table) => this.notify(table));
        return { success: true, tableCount: Object.keys(data).length };
      }
      return { success: false, error: 'Invalid database JSON format' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  reset() {
    this.tables = JSON.parse(JSON.stringify(SEED_DATA));
    this.persist();
    Object.keys(this.tables).forEach((table) => this.notify(table));
    return { success: true };
  }

  getTableStats() {
    const stats = {};
    Object.keys(this.tables).forEach((t) => {
      stats[t] = this.tables[t].length;
    });
    return stats;
  }
}

// Global Singleton Instance
export const db = new DatabaseEngine();

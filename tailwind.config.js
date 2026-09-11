/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#FF6600', // Signature High-Octane Solar Flare Orange
          700: '#EA580C',
          800: '#C2410C',
          900: '#9A3412',
          950: '#431407',
          DEFAULT: '#FF6600',
        },
        primary: {
          DEFAULT: '#FF6600',
          foreground: '#FFFFFF',
          hover: '#EA580C',
        },
        dark: {
          50: '#27272A',
          100: '#1F1F23',
          200: '#18181B',
          300: '#141417',
          800: '#121215',
          900: '#0C0C0E',
          950: '#08080A',
          DEFAULT: '#08080A',
        },
        accent: {
          amber: '#F59E0B',
          cyan: '#06B6D4',
          emerald: '#10B981',
          orange: '#FF6600',
          gold: '#FBBF24',
        },
        background: '#09090B',
        surface: '#121215',
        textDark: '#F4F4F5',
        border: '#27272A',
        input: '#18181B',
        ring: '#FF6600',
        muted: {
          DEFAULT: '#18181B',
          foreground: '#A1A1AA',
        },
        card: {
          DEFAULT: '#121215',
          foreground: '#F4F4F5',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px -2px rgba(0, 0, 0, 0.6)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        'red-glow': '0 0 30px -4px rgba(255, 102, 0, 0.5)',
        'brand-glow': '0 0 30px -4px rgba(255, 102, 0, 0.5)',
        'orange-glow': '0 0 30px -4px rgba(255, 102, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0B0E17',
        'surface': '#111625',
        'surface-card': '#151C2E',
        'surface-card-hover': '#1A233A',
        'surface-elevated': '#1E2842',
        'border-subtle': '#1F293D',
        'border-highlight': '#2A3752',
        'primary-purple': '#6366F1',
        'primary-purple-dark': '#4F46E5',
        'primary-purple-light': '#818CF8',
        'accent-cyan': '#06B6D4',
        'accent-teal': '#14B8A6',
        'accent-green': '#10B981',
        'accent-lime': '#84CC16',
        'accent-amber': '#F59E0B',
        'accent-orange': '#F97316',
        'accent-pink': '#EC4899',
        'accent-red': '#EF4444',
        'text-main': '#F1F5F9',
        'text-muted': '#94A3B8',
        'text-dim': '#64748B',
      },
      fontFamily: {
        'sans': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'display': ['"Hanken Grotesk"', '"Inter"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        '3d-subtle': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        '3d-elevated': '0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 10px 15px -5px rgba(0, 0, 0, 0.4)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.25)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.25)',
      },
      borderRadius: {
        'card': '14px',
        'button': '10px',
      }
    },
  },
  plugins: [],
};

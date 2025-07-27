/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Cores Primárias (Laranja)
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Laranja principal
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        
        // Cores Secundárias (Preto/Cinza)
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Preto principal
          950: '#020617',
        },

        // Cores de Background
        background: {
          light: '#ffffff',
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
          darker: '#020617',
        },

        // Cores de Texto
        text: {
          light: '#f8fafc',
          DEFAULT: '#334155',
          dark: '#1e293b',
          muted: '#64748b',
        },

        // Cores de Superfície/Cards
        surface: {
          light: '#ffffff',
          DEFAULT: '#f1f5f9',
          dark: '#1e293b',
          darker: '#0f172a',
        },

        // Cores de Border
        border: {
          light: '#e2e8f0',
          DEFAULT: '#cbd5e1',
          dark: '#475569',
        },

        // Cores de Status
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },

        // Cores de Accent (Variações do laranja)
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-surface': 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
      },

      // Sombras personalizadas
      boxShadow: {
        'orange': '0 4px 14px 0 rgba(249, 115, 22, 0.15)',
        'orange-lg': '0 10px 25px 0 rgba(249, 115, 22, 0.2)',
        'dark': '0 4px 14px 0 rgba(15, 23, 42, 0.15)',
        'dark-lg': '0 10px 25px 0 rgba(15, 23, 42, 0.2)',
      },

      // Bordas com cores personalizadas
      borderColor: {
        'primary': '#f97316',
        'secondary': '#334155',
      },

      // Ring colors para foco
      ringColor: {
        'primary': '#f97316',
        'secondary': '#334155',
      },
    },
  },
  plugins: [],
}


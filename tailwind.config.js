/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- Paleta de colores personalizada ---
      colors: {
        primary: {
          200: '#f8f2ff',
          300: '#7DF9FF', // Azulado vibrante para iconos
          500: '#412DB2', // Morado para botones y highlights
          700: '#005EB8', // Azul fuerte para fondos
          900: '#229FA9', // Verde para iconos
        },
      },

      // --- Fuente personalizada ---
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
      },

      // --- Animación personalizada 'twinkle' ---
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.8)' },
        }
      },
      animation: {
        twinkle: 'twinkle 2s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}

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
          500: '#6366F1', // Morado/índigo vibrante para botones y highlights
          700: '#4F46E5', // Versión más oscura para el hover
          900: '#312E81', // Morado muy oscuro para fondos de sección
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

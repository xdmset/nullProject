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
        100: '#000000',   // Negro absoluto — Ideal para texto o fondo profundo
        200: '#F4F0FF',   // Blanco lavanda — Suave para fondos o tarjetas claras
        300: '#7DF9FF',   // Azul neón — Íconos vibrantes (mantener)
        400: '#5B6BC0',   // Azul/morado intermedio — Hover o bordes
        500: '#6C4AB6',   // Morado vibrante — Botones principales, highlights
        600: '#3D3D97',   // Morado oscuro — Botones secundarios, fondos medios
        700: '#005EB8',   // Azul fuerte — Fondos principales (mantener)
        800: '#198E94',   // Verde-azulado — Éxito, completar nivel
        900: '#229FA9',   // Cian/verde vibrante — Íconos activos (mantener)
        },
      },

      // --- Fuente personalizada ---
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
      },

      // --- Keyframes personalizados ---
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.8)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
          heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
    waveFlow: {
      '0%': { backgroundPosition: '0% 50%' },
      '100%': { backgroundPosition: '100% 50%' },
    },
        wiggle: {
      '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
      '25%': { transform: 'rotate(-8deg) scale(1.05)' },
      '50%': { transform: 'rotate(8deg) scale(1.05)' },
      '75%': { transform: 'rotate(-4deg) scale(1.03)' },
    },
      waveFlow: {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '100% 50%' },
  },
      },

      // --- Animaciones personalizadas ---
      animation: {
        twinkle: 'twinkle 2s infinite ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        bounceSlow: 'bounceSlow 1s infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
    waveFlow: 'waveFlow 5s linear infinite',
      wiggle: 'wiggle 1.2s ease-in-out infinite',
        waveFlow: 'waveFlow 5s linear infinite',

      },
    },
  },
  plugins: [],
}

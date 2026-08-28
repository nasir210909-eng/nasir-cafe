/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF4E9',
        'cream-dark': '#F2E7D5',
        coffee: {
          DEFAULT: '#6F4E37',
          light: '#8B6146',
          dark: '#4A3222',
        },
        espresso: '#2B1B12',
        ink: '#1A120B',
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E0C284',
          dark: '#A9822F',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(43, 27, 18, 0.25)',
        soft: '0 4px 20px rgba(43, 27, 18, 0.08)',
        gold: '0 8px 24px -6px rgba(201, 162, 75, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'scale-in': 'scaleIn 0.25s ease-out both',
        float: 'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

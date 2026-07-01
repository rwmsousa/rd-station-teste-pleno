const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdcff',
          300: '#8ec5ff',
          400: '#59a5ff',
          500: '#3182f6',
          600: '#1c64e0',
          700: '#174fb5',
          800: '#174392',
          900: '#193b74',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

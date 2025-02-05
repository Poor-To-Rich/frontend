/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        oliveGreen: '#A1C377',
        pastelLime: '#E7F6D1',
        vanillaCream: '#FEFFE9',
        sunsetRose: '#EB6060',
        pointRed: '#FE9588',
        oceanBlue: '#81AAF6',
        defaultGrey: '#ADADAD',
        strokeGray: '#E6E6E6',
      },
    },
  },
  plugins: [],
};

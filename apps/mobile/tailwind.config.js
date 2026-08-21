/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: { wanderly: { 50: '#f4f7f2', 600: '#277253', 950: '#17231f' } },
      borderRadius: { control: '12px', card: '20px' },
      spacing: { screen: '24px' },
    },
  },
};

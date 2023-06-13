/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    inset: {
      '1': '1rem',
      '0': '0px',
      '1/6': '3%',
    },
    maxWidth: {
      '2/3': '40%',
      'x': '700px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'maize': '#fbc44c',
      'yellow-red': '#f6b84a',
      'dark-brown': 'rgba(101, 74, 31)',
      'bazaar': 'rgba(144, 122, 120)',
      'pale-silver': 'rgba(207, 197, 187,.5)',
      'silver': '#ecebff',
      'royal-brown': '#4f3c31',
      'white': '#ffffff',
      'gray-100': 'rgb(243 244 246)',
      'gray-300': 'rgb(209 213 219)',
      'red': '#ff4d4f',
      'black': "#000000",
    },
  },
  plugins: [],
}


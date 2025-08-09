/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#1a1a2e',
          secondary: '#16213e',
          accent: '#0f3460',
          text: '#e6e6e6',
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        accent: '#10B981',
        purple: '#8B5CF6',
        orange: '#F97316',
        teal: '#14B8A6',
        amber: '#F59E0B',
      },
    },
  },
  plugins: [],
}


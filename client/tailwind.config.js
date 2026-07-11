/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'f1-red': '#e10600',
        'f1-dark': '#15151e',
        'f1-card-bg': '#1f1f27',
        'f1-grey-border': '#38383f',
      },
      fontFamily: {
        sans: ['"Titillium Web"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

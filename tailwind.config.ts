import type {Config} from 'tailwindcss';
const config: Config = {
  darkMode: "class", // IMPORTANT: must be 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

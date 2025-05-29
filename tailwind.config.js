/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico"],
      },
      colors: {
        primary: "#E91E63",
        darkPrimary: "#C2185B",
        dark: "#020617"
      }
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#050016",
        "bg-card": "#3C1675",
        accent: "#D08BFF",
        "accent-soft": "#8B5CF6",
        "nav-bg": "#1A0B2E",
      },
      fontFamily: {
        sans: ["Preahvihear", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(192, 132, 252, 0.6)",
      },
    },
  },
  plugins: [],
};

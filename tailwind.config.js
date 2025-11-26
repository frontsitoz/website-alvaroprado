/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#050016",
        accent: "#6ba3ff",
        "accent-soft": "#4d8ee8",
        "nav-bg": "#0c0a1f",
      },
      fontFamily: {
        sans: ["Preahvihear", "sans-serif"],
      },
      boxShadow: {
        glow: "0px 0px 32px rgba(80, 115, 168, 0.4)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "line-animate": "line-animate 0.5s ease-in-out forwards",
      },
      keyframes: {
        "line-animate": {
          from: { "stroke-dashoffset": "261" },
          to: { "stroke-dashoffset": "0" },
        },
      },
    },
  },
  plugins: [],
};

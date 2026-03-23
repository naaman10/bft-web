import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef2f4",
          100: "#fde5e9",
          200: "#faccd4",
          300: "#f6a3b0",
          400: "#f07588",
          500: "#F75074",
          600: "#e52d54",
          700: "#c21d42",
          800: "#a21b3d",
          900: "#8b1a38",
          950: "#4c0d1e",
        },
        secondary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#fcd434",
          500: "#F9D51B",
          600: "#e4be0a",
          700: "#bd9909",
          800: "#96750d",
          900: "#7c6010",
          950: "#463a06",
        },
      },
      fontFamily: {
        sans: ["'National Park'", "system-ui", "sans-serif"],
        serif: ["'National Park'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

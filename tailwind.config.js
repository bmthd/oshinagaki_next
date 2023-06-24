/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#87cefa",
          dark: "#03bfff",
        },
        secondary: {
          DEFAULT: "#94c1ff",
          dark: "769acc",
        },
        accent: {
          DEFAULT: "#ffb865",
          dark: "#cc9350",
        },
        text: {
          DEFAULT: "#333333",
          dark: "#ffffff",
        },
        background: {
          DEFAULT: "#ffffff",
          dark: "#000000",
        },
      },
      width:{
        main: "960px",
      }
    },
  },
  plugins: [],
};

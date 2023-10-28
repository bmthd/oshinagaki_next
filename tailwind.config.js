/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      width: {
        main: "1280px",
      },
    },
  },
  plugins: [],
};

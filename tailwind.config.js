/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    screens: {
      xs: "415px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        cera: ["Cera Pro", "sans-serif"],
      },
      screens: {
        mlscreen: { min: "550px", max: "1023px" },
      },
      colors: {
        // Font Colors
        type: {
          300: "#C1C0C0",
          400: "#919293",
          500: "#5F6868",
          600: "#45464B",
          700: "#191635",
        },
        // Main Colors
        primary: "#356AF0",
        secondary: "#FF9901",
        info: "#F5F8FE",
        danger: "#F84837",
        success: "#53D258",
        warning: "#F7931A",
      },
      fontSize: {
        // Heading Typo
        "heading-1": [
          "48px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "heading-2": [
          "36px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "heading-3": [
          // TODO:
          // "32px",
          "28px",
          {
            // TODO:
            // lineHeight: "24px", Default
            lineHeight: "36px",
            fontWeight: "600",
          },
        ],
        "heading-4": [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "700",
          },
        ],
        "heading-5": [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "500",
          },
        ],
        // Body Type
        "body-1": [
          "18px",
          {
            // TODO:
            // lineHeight: "27px",
            lineHeight: "30px",
            fontWeight: "500",
          },
        ],
        "body-2": [
          "16px",
          {
            // TODO:
            // lineHeight: "24px",
            lineHeight: "26px",
            fontWeight: "500",
          },
        ],
        "body-3": [
          "14px",
          {
            lineHeight: "21px",
            fontWeight: "500",
          },
        ],
        "body-4": [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "500",
          },
        ],
        "body-5": [
          "10px",
          {
            lineHeight: "15px",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        border: "0 0 0 0.1rem rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        centerSpin: {
          "0%": {
            transform:
              "translate(var(--position-x), -50%) rotateZ(var(--first-angle))",
          },
          "100%": {
            transform:
              "translate(var(--position-x), -50%) rotateZ(var(--last-angle))",
          },
        },
      },
      animation: {
        "center-spin": "centerSpin 2s linear infinite",
      },
    },
  },
  plugins: [],
};

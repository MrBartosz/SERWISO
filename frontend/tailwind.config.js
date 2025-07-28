/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        ethnocentric: ["Ethnocentric", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        elevated: "#2A2A2A",
        foreground: "#F0F0F0",
        muted: "#A0A0A0",
        border: "#333333",

        accent: "#E82127",
        accentHover: "#FF2C2C",

        success: "#00C47E",
        warning: "#FFA733",
        error: "#FF4D4D",
      },
      fontSize: {
        medium: "14px",
        small: "12px",
        big: "24px",
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
        desktopLarge: "1440px",
        desktop4k: "2560px",
      },
      boxShadow: {
        buttonBoxShadow: "0px 10px 20px 0px rgba(126, 126, 126, 0.1)",
        taskCardShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      width: {
        90: "356px",
      },
    },
  },
  plugins: [],
};

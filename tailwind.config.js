/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "neon-cyan": "#00f5ff",
        "electric-purple": "#915eff",
        "deep-purple": "#6b21a8",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 20px rgba(145, 94, 255, 0.5)",
        "glow-cyan": "0 0 20px rgba(0, 245, 255, 0.5)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "space-gradient": "linear-gradient(to bottom, #050816, #0a0a20, #100d25)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(145, 94, 255, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(145, 94, 255, 0.8)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}

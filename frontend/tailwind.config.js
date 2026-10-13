/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1680px" },
    },
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        primary: "#111827",
        secondary: "#64748B",
        border: "#E2E8F0",
        accent: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
          soft: "#F3E8FF",
        },
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
      },
      boxShadow: {
        card: "0 8px 24px rgba(15,23,42,.06)",
        "card-hover": "0 16px 40px rgba(15,23,42,.10)",
        float: "0 24px 60px rgba(15,23,42,.14)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
}

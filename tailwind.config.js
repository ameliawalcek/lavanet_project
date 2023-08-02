/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#010518",
        secondary: "#8992a3",
        tertiary: "#ffffff14",
        "orange-100": "#ef6000",
        "red-100": "#c80412",
        "yellow-100": "#e80",
        "purple-100": "#54245c",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
}
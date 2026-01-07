/** @type {import('tailwindcss').Config} */
exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      bg: "#ffffff",
      banner: "#e9ebed",
      active: "#ffffff",
      inactive: "#adbecb",
      orange: "#ed8d25",
      divide: "#394146",
      dark: {
        bg: "#1c262d",
        banner: "#131b1f",
        active: "#ffffff",
        inactive: "#adbecb",
        orange: "#ed8d25",
        divide: "#394146",
      },
    },
  },
  plugins: [],
};

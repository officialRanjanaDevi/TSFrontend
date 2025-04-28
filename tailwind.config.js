/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontBold: ["Poppins Semi-Bold", "sans-serif"],
        fontRegular: ["Poppins Regular", "sans-serif"],
        fontMedium: ["Poppins Medium", "sans-serif"],
      },
      listStyleType: {
        roman: "lower-roman",
      },
      colors: {
        primary: "#EB8105",
        secondary: "#FAAC06",
        tertiary: "#ffffff",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dancing-script": "Dancing Script, cursive",
        montserrat: "Montserrat, sans-serif",
      },
      colors: {
        brand: "#EEB5B5",
        "brand-dark": "#738276",
      },
    },
  },
  plugins: [],
};

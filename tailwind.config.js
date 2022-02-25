module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'wonderful-branding': 'WonderfulBranding, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        'nixie-one': 'NixieOne, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
      },
      colors: {
        'brand': '#d37200',
        'brand-dark': '#824200'
      },
    },
  },
  plugins: [],
}

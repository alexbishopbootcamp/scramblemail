module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'theme-white-100': '#fefefe',
        'theme-white-200': '#f6fbfe',
        'theme-white-300': '#d5dae9',
        'theme-white-400': '#a9adc5',
        'theme-white-500': '#6f728a',
        'theme-white-600': '#4f5160',
        'theme-blue-100': '#caf2fa',
        'theme-blue-200': '#95c9f9',
        'theme-blue-300': '#205cd6',
        'theme-blue-400': '#1b4aa6',
        'theme-green-100': '#bef2f7',
        'theme-green-200': '#8dd9de',
        'theme-green-300': '#4ca3bf',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

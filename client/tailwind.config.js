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
      dropShadow: {
        'glow-white-100': '0 0 1px #fefefe',
        'glow-white-200': '0 0 1px #f6fbfe',
        'glow-white-300': '0 0 1px #d5dae9',
        'glow-white-400': '0 0 1px #a9adc5',
        'glow-white-500': '0 0 1px #6f728a',
        'glow-white-600': '0 0 1px #4f5160',
        'glow-blue-100': '0 0 1px #caf2fa',
        'glow-blue-200': '0 0 1px #95c9f9',
        'glow-blue-300': '0 0 1px #205cd6',
        'glow-blue-400': '0 0 1px #1b4aa6',
        'glow-green-100': '0 0 1px #bef2f7',
        'glow-green-200': '0 0 1px #8dd9de',
        'glow-green-300': '0 0 1px #4ca3bf',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

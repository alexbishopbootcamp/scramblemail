import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import TailwindCSS from 'tailwindcss';
import Autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss:{
      plugins: [
        TailwindCSS,
        Autoprefixer,
      ]
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:24582',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
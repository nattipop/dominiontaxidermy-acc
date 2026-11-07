import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "dominion-accounting-cb7d62a3e512.herokuapp.com"
    ]
  }
})

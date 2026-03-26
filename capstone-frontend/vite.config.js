// Vite configuration file
// Configures build tool settings for React and Tailwind CSS

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Enable React and Tailwind CSS plugins
  plugins: [react(), tailwindcss()],
})

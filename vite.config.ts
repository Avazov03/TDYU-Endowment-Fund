import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: '/cyan/index.html',
  },
  preview: {
    open: '/cyan/index.html',
  },
})

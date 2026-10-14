import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The Django backend lives in ./backend — don't let Vite watch it.
    watch: { ignored: ["**/backend/**"] },
  },
})

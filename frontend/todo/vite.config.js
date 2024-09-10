import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This binds the server to all network interfaces
    port: 5173,       // Ensure the port matches the one exposed in Docker
  },
})

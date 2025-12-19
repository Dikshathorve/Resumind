import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => {
          console.log('[Vite Proxy] Proxying request:', path)
          return path
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log('[Vite Proxy] Response received from backend:', proxyRes.statusCode)
        }
      }
    }
  }
})


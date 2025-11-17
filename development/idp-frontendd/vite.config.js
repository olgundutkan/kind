import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/idp-frontend/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['local.portal.k2.io'],
    proxy: {
      '/idp-backend': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/idp-backend/, ''),
      },
    },
  },
})

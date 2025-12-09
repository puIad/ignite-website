import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'

import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3005,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    proxy: {
      // Proxy all requests starting with /api to the backend during development
      '/api': {
        target: 'https://ignite-backend-el33.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
  },
  publicDir: "public",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

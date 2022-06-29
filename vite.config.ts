import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {config} from 'dotenv'

config();
const {BASE_URL} = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${BASE_URL ?? 'http://localhost:5000'}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/client',
  },
})

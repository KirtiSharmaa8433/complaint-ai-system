import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }) => {
  // load .env files
  const env = loadEnv(mode, process.cwd(), '');
  const VITE_API_URL = env.VITE_API_URL || '';

  return defineConfig({
    plugins: [react()],
    server: {
      // allow access from other devices on the LAN
      host: true,
      hmr: {
        host: env.VITE_HMR_HOST || undefined,
      },
      proxy: {
        '/api': {
          target: VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    define: {
      // expose the env var to the client as import.meta.env.VITE_API_URL
      'process.env': process.env,
    }
  })
}

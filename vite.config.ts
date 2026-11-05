import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vite only exposes prefixed env vars to the browser. NEXT_PUBLIC_ is accepted
  // so names from a Next.js guide still work. Do not add a SUPABASE_ prefix:
  // that would ship the secret key in the client bundle.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    port: 5173,
    strictPort: false,
  },
})

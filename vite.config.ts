import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Read REPO_BASE or VITE_BASE_URL environment variables at build time; default to '/'
const repoBase = process.env.REPO_BASE ?? process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  base: repoBase,
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Read REPO_BASE environment variable at build time; default to '/'
const repoBase = process.env.REPO_BASE ?? '/'

export default defineConfig({
  base: repoBase,
  plugins: [react()],
})

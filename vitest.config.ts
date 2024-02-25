/// <reference types="vitest" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ['app/**/*.spec.tsx'],
    environment: 'jsdom',
    setupFiles: ['setup-vitest.ts'],
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/patternit/',

  plugins: [
    vue(),
  ],

  server: {
    port: 8080,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})



import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  root: 'src/renderer',
  base: './',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('src/renderer/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/renderer', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/renderer/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/renderer/views', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/renderer/utils', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/renderer/constants', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/renderer/types', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/renderer/config', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/renderer/plugins', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/renderer/store', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
})

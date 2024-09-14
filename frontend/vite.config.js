import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window'
  },
  plugins: [
    vue(),
    vueJsx(),
    nodePolyfills(),
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      buffer: 'buffer',
      process: 'process/browser'
      // process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
    }
  },
  optimizeDeps: {
    include: ['buffer', 'process']
  }
})

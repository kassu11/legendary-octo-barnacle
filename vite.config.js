import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  base: "/legendary-octo-barnacle",
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  server: {
    port: 5173
  }
})

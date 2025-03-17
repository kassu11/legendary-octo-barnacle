import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  base: "/MyAniList",
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  server: {
    port: 5173
  }
})

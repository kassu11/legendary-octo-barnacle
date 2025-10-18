import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import scopedStyling from './solidjs-scoped-styling';

export default defineConfig({
  plugins: [scopedStyling(), solid()],
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

import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import scopedStyling from "./vite-plugins/solidjs-scoped-styling";
import autoImportScopedStyles from "./vite-plugins/auto-import-scoped-styles";
import AutoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [
    scopedStyling(),
    autoImportScopedStyles(),
    solid(),
    AutoImport({
      include: [
        /\.jsx$/,
        /\.js$/,
      ],
      imports: [
        "@solidjs/router",
        "solid-js",
      ],
      dirsScanOptions: {
        fileFilter: file => {
          return file.endsWith(".js") || file.endsWith(".jsx");
        }
      },
      dirs: [
        "./src/assets",
        "./src/components",
        "./src/context",
        "./src/hooks",
        "./src/pages",
        "./src/libs",
        "./src/collections/collections.js",
        "./src/utils/utils.js",
        "./src/utils/api.js",
      ],
      defaultExportByFilename: true,
    })
  ],
  base: "/legendary-octo-barnacle",
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: "camelCaseOnly"
    }
  },
  server: {
    port: 5173
  }
})

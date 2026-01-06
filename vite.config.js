import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import scopedStyling from "./vite-plugins/solidjs-scoped-styling";
import autoImportScopedStyles from "./vite-plugins/auto-import-scoped-styles";
import AutoImport from "unplugin-auto-import/vite"

const __PORT__ = 5173;
const __DEBUG_PORT__ = 5174;

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
        "solid-js",
        {
          "@solidjs/router": [
            "A", "Navigate", "useLocation", "useNavigate", "useParams"
          ],
        },
      ],
      dirsScanOptions: {
        fileFilter: file => {
          return file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx");;
        }
      },
      dirs: [
        "./src/assets",
        "./src/components/**",
        "./src/context",
        "./src/hooks",
        "./src/pages/**",
        "./src/libs",
        "./src/collections/collections.js",
        "./src/utils/utils.js",
        "./src/utils/api.js",
      ],
    })
  ],
  base: "/legendary-octo-barnacle",
  build: {
    chunkSizeWarningLimit: 1000,
    cssTarget: ["es2024"]
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: "camelCaseOnly"
    }
  },
  define: {
    __PORT__,
    __DEBUG_PORT__,
  },
  server: {
    port: __PORT__
  }
})

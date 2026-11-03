import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import scopedStyling from "./vite-plugins/solidjs-scoped-styling";
import autoImportScopedStyles from "./vite-plugins/auto-import-scoped-styles";
import checker from 'vite-plugin-checker';
import AutoImport from "unplugin-auto-import/vite"
import grapqlMinimizer from "./vite-plugins/graphql-minimize";
import openInEditor from "./vite-plugins/open-in-editor";

const __PORT__ = 5173;
const __DEBUG_PORT__ = 5174;
const __BASE__ = "/legendary-octo-barnacle";


// eslint-disable-next-line no-undef
const branch = process.env.SAFE_BRANCH_NAME || "main";

export default defineConfig({
  plugins: [
    scopedStyling(),
    autoImportScopedStyles(),
    grapqlMinimizer(),
    openInEditor(),
    solid(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx}"', // Fail on Lint errors
      },
    }),
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
          return file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx");
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
        "./src/utils/api-OLD.js",
      ],
    })
  ],
  base: __BASE__ + (branch !== "main" ? "/branches/" + branch : ""),
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
    __BASE__: JSON.stringify(__BASE__),
    // Branch is definitely just a string, but this is the only way to pass a string, dont ask why
    __BRANCH__: JSON.stringify(branch),
  },
  server: {
    port: __PORT__
  }
});

import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import importX, { createNodeResolver } from "eslint-plugin-import-x";

// Allowed import direction: app -> pages -> components -> state/hooks/api -> utils/constants
const layerZones = [
  { target: "./src/utils", from: ["./src/api", "./src/state", "./src/hooks", "./src/components", "./src/pages", "./src/app"] },
  { target: "./src/constants", from: ["./src/api", "./src/state", "./src/hooks", "./src/components", "./src/pages", "./src/app"] },
  { target: "./src/api", from: ["./src/components", "./src/pages", "./src/app"] },
  { target: "./src/state", from: ["./src/components", "./src/pages", "./src/app"] },
  { target: "./src/hooks", from: ["./src/components", "./src/pages", "./src/app"] },
  { target: "./src/components", from: ["./src/pages", "./src/app"] },
  { target: "./src/pages", from: "./src/app" },
];

// Code shared between pages belongs in components, hooks or utils
const pageZones = readdirSync(new URL("./src/pages", import.meta.url)).map(page => ({
  target: `./src/pages/${page}`,
  from: "./src/pages",
  except: [`./${page}`],
  message: "Pages can't import from other pages.",
}));

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["!**/node_modules/"],
    plugins: {
      "import-x": importX,
    },
    settings: {
      "import-x/resolver-next": [
        createNodeResolver({
          alias: { "@": [fileURLToPath(new URL("./src", import.meta.url))] },
          extensions: [".js", ".jsx"],
        }),
      ],
    },
    rules: {
      "no-undef": "error",        // This catches missing imports/variables
      "no-unused-vars": ["error", {"args": "after-used"}],   // Helps clean up imports you don't need anymore
      "import-x/no-unresolved": ["error", { ignore: ["\\?worker$"] }],   // This catches broken import paths
      "import-x/no-restricted-paths": ["error", { zones: [...layerZones, ...pageZones] }],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        __PORT__: "readonly",
        __DEBUG_PORT__: "readonly",
        __BASE__: "readonly",
        __BRANCH__: "readonly",
        __DEPLOYMENT__: "readonly",
      },
      parser: tsParser,      // Use the TS parser for JSX support
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];

import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-undef": "error",        // This catches missing imports/variables
      "no-unused-vars": ["error", {"args": "after-used"}],   // Helps clean up imports you don't need anymore
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        __PORT__: "readonly",
        __DEBUG_PORT__: "readonly",
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

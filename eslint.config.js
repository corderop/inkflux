import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath, URL } from "node:url";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...eslintPluginAstro.configs.recommended,
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];

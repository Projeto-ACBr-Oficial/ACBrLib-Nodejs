const tseslint = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: parser,
      sourceType: "commonjs"
    },

    plugins: {
      "@typescript-eslint": tseslint
    },

    rules: {
      // regras básicas
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      "no-console": "off",

      "no-undef": "off"
    }
  }
];
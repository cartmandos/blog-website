import eslintPluginAstro from "eslint-plugin-astro";

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import('eslint').Linter.Config}
 */
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];

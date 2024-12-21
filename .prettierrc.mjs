/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,

  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
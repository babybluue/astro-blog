module.exports = {
  printWidth: 120,
  singleQuote: true,
  semi: false,
  endOfLine: 'auto',
  importOrder: [
    '^astro(.*)$',
    '^@astrojs/(.*)$',
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^@ui/(.*)$',
    '^[./]',
    '^@assets/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}

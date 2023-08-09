module.exports = {
  printWidth: 120,
  singleQuote: true,
  semi: false,
  endOfLine: 'auto',
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
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

module.exports = {
  printWidth: 120,
  singleQuote: true,
  semi: false,
  endOfLine: 'auto',
  importOrder: ['^(astro|@astrojs)(.*)$', '', '^@[a-z]+/(.*)$', '^@assets/(.*)$'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro', '@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#56b6c2',
        'primary-dark': '#1f1f1f',
        'primary-gray': '#525252',
        'primary-white': '#fcfcfcf2',
      },
      borderColor: {
        DEFAULT: '#b0bec5',
      },
    },
  },
  plugins: [],
}

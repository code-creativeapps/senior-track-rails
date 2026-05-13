/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ruby: {
          DEFAULT: '#CC342D',
          light: '#E85D5A',
          dark: '#A82A24',
        },
        rails: {
          DEFAULT: '#D30001',
          light: '#FF3333',
          dark: '#B00000',
        },
        // Brand pink shared with railsfullstack.com — used for the slash
        // in the rails/learn wordmark and the diagonal stroke in the favicon.
        'gum-pink': '#ec1c5e',
      },
    },
  },
  plugins: [],
}

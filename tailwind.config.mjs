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
        // Mirrors blog.railsfullstack.com's gum-pink palette so the
        // wordmark, links, and accents all read as the same product.
        'gum-pink': {
          DEFAULT: '#ec1c5e',
          50: '#fdf2f7',
          100: '#fce7f0',
          200: '#fbcfe1',
          300: '#f9a8c5',
          400: '#f472a0',
          500: '#ec1c5e',
          600: '#db1454',
          700: '#bd1145',
          800: '#9b0f3a',
          900: '#7e1031',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}

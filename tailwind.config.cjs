import { spacing } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#313233',
        selection: '#95a5ac40',
        background: '#fcfcfc',
        divider: '#5d676a',
        'link-hover': 'rgb(93 103 106 / 0.7)',
      },
      animation: {
        'ticker-loop': '20s infinite linear ticker-loop',
      },
      keyframes: {
        'ticker-loop': {
          '0%': {
            transform: 'translatex(0)',
          },
          '100%': {
            transform: 'translatex(-100%)',
          },
        },
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#313233',
            a: {
              color: theme('colors.divider'),
              'text-decoration-color': 'rgb(93 103 106 / 0.6)',
              ' text-underline-offset': '2px',
              '&:hover': {
                opacity: 0.7,
              },
              code: { color: theme('colors.divider') },
            },
            'h2,h3,h4': {
              'font-weight': '700',
              'margin-top': '2em',
              'margin-bottom': '1em',
              'line-height': '1.3333',
              'letter-spacing': '-.02em',
              'font-variation-settings': "'wght' 700",
              'scroll-margin-top': spacing[32],
            },
            li: {
              'margin-top': '0.5em',
              'margin-bottom': '0.5em',
            },
            thead: {
              borderBottomColor: theme('colors.gray.200'),
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            strong: {
              'font-variation-settings': "'wght' 600",
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

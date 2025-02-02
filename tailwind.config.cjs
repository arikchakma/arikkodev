import { spacing } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#313233',
            a: {
              color: 'var(--color-divider)',
              'text-decoration-color': 'rgb(93 103 106 / 0.6)',
              ' text-underline-offset': '2px',
              '&:hover': {
                opacity: 0.7,
              },
              code: { color: 'var(--color-divider)' },
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
              borderBottomColor: 'var(--color-gray-200)',
            },
            code: { color: 'var(--color-pink-500)' },
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
};

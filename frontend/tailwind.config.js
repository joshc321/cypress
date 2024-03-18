/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': {
          light: '#69696a',
          DEFAULT: '#28282a',
          dark: '#1e1e1f',
        },
        'secondary': {
          light: '#D9D9D9',
          DEFAULT: '#838383',
          dark: '#1F1F1F',
        },
        'gray': {
          light: '#f2f2f2',
          DEFAULT: '#6b7280',
          dark: '#1f2937',
        }
      },
    },
  },
  plugins: [],
}

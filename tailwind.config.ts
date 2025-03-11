/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      }
    },
  },
  plugins: [],
}
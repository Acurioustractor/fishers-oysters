import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A6741',
        secondary: '#8B7355',
        accent: '#D4A574',
        background: '#F5F3EF',
        foreground: '#2D3B2D',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Raleway', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Aleo', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

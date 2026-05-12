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
        primary: '#5A432C',
        secondary: '#8A6F4D',
        accent: '#AFC1C4',
        background: '#EFF4F3',
        foreground: '#2B241C',
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

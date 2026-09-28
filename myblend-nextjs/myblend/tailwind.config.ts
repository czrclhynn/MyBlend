import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        cream: '#F8F3EA',
        paper: '#FFFDF9',
        espresso: '#3A261C',
        soft: '#725C4D',
        caramel: '#C9945A',
        'caramel-soft': '#E6C08B',
        sage: '#AAB89A',
        green: '#526446',
        line: '#E8DED0',
        rose: '#C97878',
      },
      boxShadow: {
        soft: '0 12px 40px rgba(58,38,28,.08)',
        float: '0 20px 60px rgba(58,38,28,.12)',
      },
    },
  },
  plugins: [],
}
export default config

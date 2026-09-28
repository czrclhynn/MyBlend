import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        paper: 'var(--color-surface-paper)',
        subtle: 'var(--color-surface-subtle)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-ink-muted)',
        olive: 'var(--color-accent-olive)',
        'olive-soft': 'var(--color-accent-olive-soft)',
        caramel: 'var(--color-accent-caramel)',
        'caramel-soft': 'var(--color-accent-caramel-soft)',
        berry: 'var(--color-accent-berry)',
        border: 'var(--color-border)',
        focus: 'var(--color-focus)',
        danger: 'var(--color-danger)',
        cream: 'var(--cream)',
        espresso: 'var(--espresso)',
        soft: 'var(--soft)',
        sage: 'var(--sage)',
        green: 'var(--green)',
        line: 'var(--line)',
        rose: 'var(--rose)',
      },
      borderRadius: {
        'ds-sm': 'var(--radius-sm)',
        'ds-md': 'var(--radius-md)',
        'ds-lg': 'var(--radius-lg)',
        'ds-xl': 'var(--radius-xl)',
      },
      boxShadow: {
        soft: 'var(--shadow-card)',
        float: 'var(--shadow-floating)',
        sheet: 'var(--shadow-sheet)',
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        // Brand purple ramp (anchored on logo ink #632573 / brief #672779)
        purple: {
          50: '#F4EDF7',
          100: '#EFE6F3', // yumuşak lavanta
          200: '#DDC6E5',
          300: '#C29BD1',
          400: '#9C63B2',
          500: '#7B3A90',
          600: '#672779', // ana mor
          700: '#4E2160',
          800: '#2B1035', // koyu mor
          900: '#241329',
          950: '#180c1d', // gece moru
        },
        gold: {
          50: '#FBF3E1',
          100: '#F7E7C2',
          200: '#F2C45E', // açık altın
          300: '#E4AC34',
          400: '#D2940B', // ana altın
          500: '#7B5209',
          600: '#7B5209',
          700: '#5F4106',
        },
        cream: '#FAF7F2',
        ink: '#211923',
        'ink-soft': '#5A4E60',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        'display-sm': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,11,25,0.04), 0 8px 24px -12px rgba(20,11,25,0.12)',
        lift: '0 12px 40px -16px rgba(43,16,53,0.28)',
        glow: '0 0 0 1px rgba(210,148,11,0.25), 0 20px 60px -24px rgba(210,148,11,0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        grain: "url('/images/texture/grain.png')",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 7s ease-in-out infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [typography],
};

export default config;

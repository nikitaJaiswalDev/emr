import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'hsl(210 80% 30%)',
          'primary-foreground': 'hsl(0 0% 100%)',
        },
        surface: 'hsl(210 20% 98%)',
        'surface-sunken': 'hsl(210 15% 95%)',
        border: 'hsl(210 15% 88%)',
        'text-primary': 'hsl(210 30% 15%)',
        'text-secondary': 'hsl(210 15% 35%)',
        'text-muted': 'hsl(210 10% 50%)',
        sidebar: 'hsl(210 30% 12%)',
        'sidebar-foreground': 'hsl(210 15% 85%)',
        'sidebar-muted': 'hsl(210 10% 55%)',
        'sidebar-border': 'hsl(210 25% 18%)',
        'sidebar-accent': 'hsl(210 35% 20%)',
        'sidebar-accent-foreground': 'hsl(0 0% 100%)',
        success: 'hsl(150 55% 40%)',
        warning: 'hsl(40 85% 50%)',
        danger: 'hsl(0 70% 50%)',
        info: 'hsl(200 80% 45%)',
        accent: 'hsl(210 30% 95%)',
      },
      fontSize: {
        'h1': '1.75rem',
        'h4': '1.125rem',
        'body': '0.875rem',
        'body-sm': '0.8125rem',
        'caption': '0.75rem',
      },
    },
  },
  plugins: [],
};
export default config;

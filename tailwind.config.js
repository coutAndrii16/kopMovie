/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#10131a',
        surface: '#171b24',
        surface2: '#1e2330',
        border: '#282e3d',
        ink: '#e7e9ef',
        muted: '#8892a6',
        gold: '#e8b34c',
        indigo: '#6c63e8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

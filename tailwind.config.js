/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './sanity/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // палитра снята с фотографии сосен над морем на закате
        paper: '#FBF3E8',
        linen: '#F2E5D4',
        sand: '#D9C3A8',
        ember: '#A9663C',
        needle: '#6E7C68',
        ink: '#2E2820',
        soft: '#6F6355',
        // светлое для текста поверх фотографии
        glow: '#FBF3E8',
        glowdim: '#EBD9BE',
      },
      fontFamily: {
        display: ['var(--font-prata)', 'Georgia', 'serif'],
        caps: ['var(--font-tenor)', 'Trebuchet MS', 'sans-serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 30px 80px -40px rgba(46,40,32,0.45)',
        card: '0 20px 50px -30px rgba(46,40,32,0.55)',
        cut: '0 24px 34px rgba(30,22,14,0.42)',
      },
      textShadow: {
        glow: '0 2px 32px rgba(40,32,22,0.55), 0 1px 4px rgba(40,32,22,0.32)',
      },
    },
  },
  plugins: [],
}

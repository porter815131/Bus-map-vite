module.exports = {
  mode: 'jit',
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      screens: {
        sm: { min: '24.375em' },
        mf: { min: '47.5em' },
        pd: { min: '62.5em' },
        lt: '89em',
      },

      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(120%)',
            transform: 'translateX(120%)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0%)',
            transform: 'translateX(0%)',
          },
        },
      },
      backgroundImage: {
        bus: "url('/asset/bus-hero.jpg')",
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

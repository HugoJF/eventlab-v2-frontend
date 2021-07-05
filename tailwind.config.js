module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.ts'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

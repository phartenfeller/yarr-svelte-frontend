module.exports = {
  content: ['./public/index.html', './src/**/*.svelte'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp')],
};

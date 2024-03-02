module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'button': '2px 2px teal'
      },
      fontFamily: {
        'base': [
          '"Benton Sans"',
          '"Helvetica Neue"',
          "helvetica",
          "arial",
          "sans-serif",
        ],
      },
      colors: {
        "blue-custom": "#373fff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

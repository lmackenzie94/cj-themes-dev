const fonts = require('./src/utils/fonts').getFonts(`./static/fonts`).fonts;
const fontsHeaders = fonts.map(
  ({ url, extension }) =>
    `Link: <${url}>; rel=preload; as=font; type=font/${extension}; crossorigin=anonymous`
);

module.exports = {
  plugins: ['gatsby-plugin-theme-ui']
};

// export as function to use options
// module.exports = () => ({
//   plugins: ['gatsby-plugin-theme-ui']
// });

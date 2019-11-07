const fonts = require('@campj/utils/fonts')(`./static/fonts`).fonts;
const fontsHeaders = fonts.map(
  ({ url, extension }) =>
    `Link: <${url}>; rel=preload; as=font; type=font/${extension}; crossorigin=anonymous`
);

module.exports = ({
  analyticsEnabled = false,
  analyticsIds,
  useNetlify = true,
  host
}) => {
  const plugins = [];
  const trackingIds = [analyticsIds];

  // THEME UI
  plugins.push(`gatsby-plugin-theme-ui`);

  // ANALYTICS
  if (analyticsEnabled) {
    plugins.push(
      {
        resolve: `gatsby-plugin-robots-txt`,
        options: {
          host: host,
          env: {
            development: {
              policy: [{ userAgent: '*', disallow: ['/'] }]
            },
            production: {
              policy: [{ userAgent: '*', allow: '/' }]
            }
          }
        }
      },
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: trackingIds,
          pluginConfig: {
            head: false,
            respectDNT: true
          }
        }
      }
    );
  }

  // NETLIFY
  if (useNetlify) {
    plugins.push(
      {
        resolve: `gatsby-plugin-netlify`,
        options: {
          allPageHeaders: [...fontsHeaders]
        }
      },
      `gatsby-plugin-netlify-cache`
    );
  }

  // SHARP
  plugins.push(`gatsby-plugin-sharp`, `gatsby-transformer-sharp`);

  // OTHER
  plugins.push(`gatsby-plugin-react-helmet`, `gatsby-plugin-catch-links`);

  return {
    plugins: plugins
  };
};

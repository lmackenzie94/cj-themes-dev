module.exports = ({ contentPath = 'data', langs = ['en'] }) => ({
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: contentPath,
        langs: langs,
        ignore: [`**/\.*`] // ignore files starting with a dot
      }
    }
  ]
});

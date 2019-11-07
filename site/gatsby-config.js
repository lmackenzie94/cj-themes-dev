module.exports = {
  plugins: [
    {
      resolve: `@campj/json`,
      options: {
        dataPath: `src/data`,
        imagePath: `src/img`
        // useImage: false
      }
    },
    {
      resolve: `@campj/dato`,
      options: {}
    },
    {
      resolve: `@campj/preview`,
      options: {
        herokuAppName: `cj-themes-dev`, // will prompt user for name if ommitted
        previewSlug: `preview` // defaults to `preview` if ommitted
      }
    },
    {
      resolve: `@campj/core`,
      options: {
        analyticsEnabled: false,
        useNetlify: true,
        analyticsIds: `12345`,
        host: `https://www.TESTING.com`,
        siteMapConfig: {
          siteMetadata: {
            siteUrl: `https://cj-themes-dev.netlify.com`,
            title: `cj-themes-dev`,
            description: `Repo for developing CJ Gatsby themes`
          }
          // pluginOptions: {
          //   test: 'hey'
          // }
        }
      }
    }
  ]
};

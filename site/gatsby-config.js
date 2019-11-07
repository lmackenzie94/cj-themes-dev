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
        host: `https://www.TESTING.com`
      }
    }
  ]
};

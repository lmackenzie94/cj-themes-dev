module.exports = {
  plugins: [
    {
      resolve: `@campj/theme`,
      options: {}
    },
    {
      resolve: `@campj/json`,
      options: {
        contentPath: `src/data`,
        langs: [`en`, `fr`]
      }
    },
    {
      resolve: `@campj/dato`,
      options: {}
    },
    {
      resolve: `@campj/preview`,
      options: {
        herokuAppName: `cj-themes-dev`, //will prompt user for name if ommitted
        previewSlug: `preview` //defaults to `preview` if ommitted
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

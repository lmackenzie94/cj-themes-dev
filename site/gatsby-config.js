module.exports = {
  plugins: [
    {
      resolve: '@campj/theme',
      options: {}
    },
    {
      resolve: '@campj/json',
      options: {
        contentPath: 'luke',
        langs: ['en', 'fr']
      }
    },
    {
      resolve: '@campj/dato',
      options: {}
    },
    {
      resolve: '@campj/preview',
      options: {
        herokuAppName: 'cj-themes-dev', //will prompt user for name if ommitted
        previewSlug: 'preview' //defaults to 'preview' if ommitted
      }
    }
  ]
};

const path = require(`path`);

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    devtool: `source-map`,
    resolve: {
      alias: {
        global: path.resolve(__dirname, 'src/global'),
        css: path.resolve(__dirname, 'src/css'),
        system: path.resolve(__dirname, 'src/system'),
        theme: path.resolve(__dirname, 'src/gatsby-plugin-theme-ui'),
        components: path.resolve(__dirname, 'src/components'),
        blocks: path.resolve(__dirname, 'src/blocks'),
        utils: path.resolve(__dirname, 'src/utils')
      }
    }
  });
};

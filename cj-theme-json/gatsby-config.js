const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

module.exports = ({
  langs = [`en`],
  dataPath = `src/data`,
  imagePath = `src/img`,
  useData = true,
  useImage = true
}) => {
  const plugins = [`gatsby-transformer-json`];

  if (useData) {
    if (!fs.existsSync(dataPath)) {
      console.log(
        chalk.green.bold(`@campj/json: Creating the ${dataPath} directory...`)
      );
      fs.mkdirSync(dataPath);
    } else {
      console.log(
        chalk.yellow.bold(
          `@campj/json: Looks like you already have a ${dataPath} directory`
        )
      );
    }

    langs.forEach(lang => {
      if (!fs.existsSync(`${dataPath}/${lang}.json`)) {
        fs.appendFileSync(`${dataPath}/${lang}.json`, '{}', err => {
          if (err) throw err;
        });
      }
      return;
    });

    plugins.push({
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: dataPath,
        ignore: [`**/\.*`] // ignore files starting with a dot
      }
    });
  }

  if (useImage) {
    if (!fs.existsSync(imagePath)) {
      console.log(
        chalk.green.bold(`@campj/json: Creating the ${imagePath} directory...`)
      );
      fs.mkdirSync(imagePath);
    } else {
      console.log(
        chalk.yellow.bold(
          `@campj/json: Looks like you already have a ${imagePath} directory`
        )
      );
    }
    plugins.push({
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: imagePath,
        ignore: [`**/\.*`] // ignore files starting with a dot
      }
    });
  }

  return {
    plugins: plugins
  };
};

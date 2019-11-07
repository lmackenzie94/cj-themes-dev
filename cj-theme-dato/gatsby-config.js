require('dotenv').config();
// This module loads environment variables from a .env file that you create
// and adds them to the process.env object that is made available to the application.

const fs = require('fs');
const readlineSync = require(`readline-sync`);
const isProduction = process.env.NODE_ENV === `production`;
const chalk = require('chalk');

let DatoAPIToken = process.env.DATO_API_TOKEN;

if (
  (!process.env.IS_HEROKU || process.env.IS_HEROKU !== `true`) &&
  !isProduction
) {
  // prompts user for Dato API Token and creates a .env that includes the token
  if (fs.existsSync(`.env`)) {
    let fileContent = fs.readFileSync(`.env`, `utf8`);
    if (fileContent.includes(`DATO_API_TOKEN`)) {
      console.log(
        chalk.yellow.bold(
          `@campj/dato: Looks like you already have a Dato API Token set in your .env file`
        )
      );
    } else {
      DatoAPIToken = readlineSync.question(
        chalk.blue.bold(`@campj/dato: Please enter your Dato API Token: `)
      );
      fs.appendFileSync(`.env`, `DATO_API_TOKEN=${DatoAPIToken}`, err => {
        if (err) throw err;
      });
      console.log(
        chalk.green.bold(
          `@campj/dato: Added your Dato API Token to the existing .env file`
        )
      );
    }
  } else {
    DatoAPIToken = readlineSync.question(
      chalk.blue.bold(`@campj/dato: Please enter your Dato API Token: `)
    );
    fs.writeFileSync(`.env`, `DATO_API_TOKEN=${DatoAPIToken}`, err => {
      if (err) throw err;
    });
    console.log(
      chalk.green.bold(
        `@campj/dato: Created a .env file and added your Dato API Token`
      )
    );
  }
}

module.exports = () => {
  return {
    plugins: [
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-source-datocms`,
        options: {
          apiToken: DatoAPIToken,
          previewMode: !isProduction,
          disableLiveReload: isProduction
        }
      }
    ]
  };
};

// const pjson = require(`./package.json`);
// const path = require(`path`);
const fs = require(`fs`);
const readlineSync = require(`readline-sync`);
const cmd = require(`node-cmd`);
const chalk = require('chalk');

let herokuAppName;

exports.onPreBootstrap = (_, options) => {
  if (!process.env.DATO_API_TOKEN && !options.datoAPIToken) {
    console.log(
      chalk.red.bold(
        `@campj/preview: Please add a "DATO_API_TOKEN" to your .env file OR add "datoAPIToken" as an option of this plugin in your gatsby-config`
      )
    );
  }
  const datoAPIToken = options.datoAPIToken
    ? options.datoAPIToken
    : process.env.DATO_API_TOKEN;

  const netlifyEnvVars = `environment = {DATO_API_TOKEN = "${datoAPIToken}"}`;

  // ensures that a new heroku app isn't built when heroku does a build
  if (process.env.IS_HEROKU || process.env.IS_HEROKU === `true`) return;

  function setHerokuAppName() {
    // if no herokuAppName was set in gatsby-config, prompt user for name.
    if (!options.herokuAppName) {
      herokuAppName = readlineSync.question(
        chalk.blue.bold(
          `@campj/preview: Please provide a name for your heroku app (no spaces or capital letters): `
        )
      );
    } else {
      herokuAppName = options.herokuAppName;
    }
    console.log(
      chalk.green.bold(
        `@campj/preview: Heroku app will be named ${herokuAppName}`
      )
    );
  }

  function setupRedirect() {
    // the slug for the netlify URL that will redirect to the heroku app
    const previewSlug = options.previewSlug ? options.previewSlug : `preview`;

    // if no static folder exists, create it
    if (!fs.existsSync(`./static`)) {
      console.log(
        chalk.green.bold(`@campj/preview: Creating the static directory...`)
      );
      fs.mkdirSync(`./static`);
    }

    // if a _redirects file exists, check if it contains 'herokuapp'
    // if it does, user likely has already set this up so skip and move on
    // if it does NOT, append the heroku redirect string to the file
    // if a _redirects file does NOT exist, create it
    if (fs.existsSync(`./static/_redirects`)) {
      let fileContent = fs.readFileSync(`./static/_redirects`, `utf8`);
      if (fileContent.includes(`herokuapp`)) {
        console.log(
          chalk.red.bold(
            `@campj/preview: Looks like you already have a heroku redirect set up. Check 'static/_redirects'`
          )
        );
      } else {
        fs.appendFileSync(
          `./static/_redirects`,
          `/${previewSlug} https://${options.herokuAppName ||
            herokuAppName}.herokuapp.com/ 302`,
          err => {
            if (err) throw err;
            console.log(
              chalk.green.bold(
                `@campj/preview: Added a redirect for heroku to your existing _redirects file`
              )
            );
          }
        );
      }
    } else {
      fs.writeFileSync(
        `./static/_redirects`,
        `/${previewSlug} https://${options.herokuAppName ||
          herokuAppName}.herokuapp.com/ 302`,
        err => {
          if (err) throw err;
          console.log(
            chalk.green.bold(
              `@campj/preview: Successfully created _redirects in the "static" directory`
            )
          );
        }
      );
    }
  }

  function setupHerokuApp(oldName, newName) {
    // create the heroku app and required files (assumes user is logged in)
    console.log(
      chalk.green.bold(`@campj/preview: Setting up Heroku app. Please wait...`)
    );
    if (fs.existsSync(`./Procfile`)) {
      console.log(
        chalk.red.bold(
          `@campj/preview: Procfile already exists. Make sure your heroku dyno is properly set.`
        )
      );
    } else {
      fs.writeFileSync(
        `Procfile`,
        `web: gatsby develop -p $PORT -H 0.0.0.0`,
        err => {
          if (err) throw err;
          console.log(
            chalk.green.bold(`@campj/preview: Successfully created Procfile `)
          );
        }
      );
    }
    cmd.get(
      `
            heroku apps:rename ${newName} --app ${oldName}
            heroku config:set NODE_ENV=development --app ${newName}
            heroku config:set IS_HEROKU=true --app ${newName}
            heroku config:set DATO_API_TOKEN=${datoAPIToken} --app ${newName}
            heroku git:remote -a ${newName}
            `,
      function(err, data) {
        if (err) throw err;
        else
          console.log(
            chalk.green.bold(
              `@campj/preview: Changed heroku app name to ${newName} and set all required environment variables`
            )
          );
      }
    );
  }

  async function createHerokuApp() {
    let appInit = new Promise((resolve, reject) => {
      cmd.get(
        `
        heroku create
        `,
        function(err, data) {
          if (err) reject(err);
          else {
            let appName = data.substring(
              data.lastIndexOf('/') + 1,
              data.lastIndexOf('.git')
            );
            resolve(appName);
            console.log(
              chalk.green.bold(
                `@campj/preview: Successfully created new Heroku app`
              )
            );
          }
        }
      );
    });
    let oldAppName = await appInit;
    setupHerokuApp(oldAppName, herokuAppName);
  }

  function setNetlifyEnvVars() {
    if (fs.existsSync(`./netlify.toml`)) {
      let fileContent = fs.readFileSync(`./netlify.toml`, `utf8`);
      if (fileContent.includes(`DATO_API_TOKEN`)) {
        console.log(
          chalk.green.bold(
            `@campj/preview: Looks like you already have a DATO_API_TOKEN set up in your netlify.toml`
          )
        );
      } else {
        if (datoAPIToken) {
          fs.appendFileSync(`./netlify.toml`, netlifyEnvVars, err => {
            if (err) throw err;
            console.log(
              chalk.green.bold(
                `@campj/preview: Added Netlify environment variables to netlify.toml`
              )
            );
            console.log(
              chalk.yellow.bold(
                `@campj/preview: If you had previously set Netlify environment variables, make sure you combine them into one 'environment' object`
              )
            );
          });
        } else {
          console.log(
            chalk.red.bold(
              `@campj/preview: Please add your DATO_API_TOKEN to your .env file OR add "datoAPIToken" as an option of this plugin in your gatsby-config`
            )
          );
        }
      }
    } else {
      if (datoAPIToken) {
        fs.writeFileSync(`./netlify.toml`, `[build] ${netlifyEnvVars}`, err => {
          if (err) throw err;
          console.log(
            chalk.green.bold(
              `@campj/preview: Successfully created netlify.toml with necessary environment variables`
            )
          );
        });
      } else {
        console.log(
          chalk.red.bold(
            `@campj/preview: Please add your DATO_API_TOKEN to your .env file OR add "datoAPIToken" as an option of this plugin in your gatsby-config`
          )
        );
      }
    }
  }

  if (!fs.existsSync(`./Procfile`)) {
    setHerokuAppName();
    setupRedirect();
    createHerokuApp();
    setNetlifyEnvVars();
  } else {
    setNetlifyEnvVars();
  }
};

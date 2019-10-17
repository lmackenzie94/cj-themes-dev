// const pjson = require(`./package.json`);
// const path = require(`path`);
const fs = require(`fs`);
const readlineSync = require(`readline-sync`);
const cmd = require(`node-cmd`);

const netlifyEnvVars = `environment = {DATO_API_TOKEN = "${process.env.DATO_API_TOKEN}"`;
let herokuAppName;

exports.onPreBootstrap = ({ reporter }, options) => {
  // ensures that a new heroku app isn't built when heroku does a build
  if (process.env.IS_HEROKU || process.env.IS_HEROKU === `true`) return;

  function setHerokuAppName() {
    // if no herokuAppName was set in gatsby-config, prompt user for name.
    if (!options.herokuAppName) {
      herokuAppName = readlineSync.question(
        `Please provide a name for your heroku app (no spaces or capital letters): `
      );
    } else {
      herokuAppName = options.herokuAppName;
    }
    reporter.success(`Heroku app will be named ${herokuAppName}`);
  }

  function setupRedirect() {
    // the slug for the netlify URL that will redirect to the heroku app
    const previewSlug = options.previewSlug ? options.previewSlug : `preview`;

    // if no static folder exists, create it
    if (!fs.existsSync(`./static`)) {
      reporter.info(`creating the static directory`);
      fs.mkdirSync(`./static`);
    }

    // if a _redirects file exists, check if it contains 'herokuapp'
    // if it does, user likely has already set this up so skip and move on
    // if it does NOT, append the heroku redirect string to the file
    // if a _redirects file does NOT exist, create it
    if (fs.existsSync(`./static/_redirects`)) {
      let fileContent = fs.readFileSync(`./static/_redirects`, `utf8`);
      if (fileContent.includes(`herokuapp`)) {
        reporter.warn(`Looks like you already have a heroku redirect set up`);
      } else {
        fs.appendFileSync(
          `./static/_redirects`,
          `/${previewSlug} https://${options.herokuAppName ||
            herokuAppName}.herokuapp.com/ 302`,
          err => {
            if (err) throw err;
            reporter.success(
              `Added a redirect for heroku to your existing _redirects file`
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
          reporter.success(
            `Successfully created _redirects in the "static" directory`
          );
        }
      );
    }
  }

  function setupHerokuApp(oldName, newName) {
    // create the heroku app and required files (assumes user is logged in)
    reporter.info(`Setting up Heroku app...`);
    if (fs.existsSync(`./Procfile`)) {
      reporter.warn(
        `Procfile already exists. Make sure your heroku dyno is properly set`
      );
    } else {
      fs.writeFileSync(
        `Procfile`,
        `web: gatsby develop -p $PORT -H 0.0.0.0`,
        err => {
          if (err) throw err;
          reporter.success(`Procfile successfully created`);
        }
      );
    }
    cmd.get(
      `
            heroku apps:rename ${newName} --app ${oldName}
            heroku config:set NODE_ENV=development --app ${newName}
            heroku config:set IS_HEROKU=true --app ${newName}
            heroku config:set DATO_API_TOKEN=${process.env.DATO_API_TOKEN ||
              options.datoAPIToken} --app ${newName}
            heroku git:remote -a ${newName}
            `,
      function(err, data) {
        if (err) throw err;
        else
          reporter.success(
            `Changed heroku app name to ${newName} and set all required environment variables`
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
            reporter.success(`Successfully created new Heroku app`);
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
        reporter.warn(
          `Looks like you already have a DATO_API_TOKEN set up in your netlify.toml`
        );
      } else {
        fs.appendFileSync(`./netlify.toml`, netlifyEnvVars, err => {
          if (err) throw err;
          reporter.success(
            `Added Netlify environment variables to netlify.toml`
          );
        });
      }
    } else {
      fs.writeFileSync(`./netlify.toml`, `[build] ${netlifyEnvVars}`, err => {
        if (err) throw err;
        reporter.success(
          `Successfully created netlify.toml with necessary environment variables`
        );
      });
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

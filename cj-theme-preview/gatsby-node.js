// const pjson = require(`./package.json`);
const path = require(`path`);
const fs = require(`fs`);
const readlineSync = require(`readline-sync`);
const cmd = require(`node-cmd`);

exports.onPreBootstrap = ({ reporter }, options) => {
  // ensures that a new heroku app isn't built when heroku does a build
  if (process.env.IS_HEROKU || process.env.IS_HEROKU === `true`) return;

  // SHOULD PROBABLY CHANGE THIS
  if (fs.existsSync(`./Procfile`)) return;
  let herokuAppName;
  function init() {
    // the slug for the netlify URL that will redirect to the heroku app
    const previewSlug = options.previewSlug ? options.previewSlug : `preview`;

    // if no herokuAppName was set in gatsby-config, prompt user for name.
    if (!options.herokuAppName) {
      herokuAppName = readlineSync.question(
        `Please provide a name for your heroku app (no spaces or capital letters): `
      );
    } else {
      herokuAppName = options.herokuAppName;
    }

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

    // create the heroku app and required files (assumes user is logged in)
    reporter.info(`NOW CREATING HEROKU APP...`);
    if (fs.existsSync(`./Procfile`)) {
      reporter.warn(`Procfile already exists`);
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
  }

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
        }
      }
    );
  });

  function setupHerokuApp(oldName, newName) {
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
        else reporter.success(`changed heroku app name to ${newName}`);
      }
    );
  }

  async function createHerokuApp(newAppName) {
    let oldAppName = await appInit;
    setupHerokuApp(oldAppName, newAppName);
  }

  init();
  createHerokuApp(herokuAppName);
};

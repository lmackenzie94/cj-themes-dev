// make sure data directory exists
const fs = require('fs');

exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'src/data';
  const langs = options.langs || ['en'];

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }

  langs.forEach(lang => {
    if (!fs.existsSync(`${contentPath}/${lang}.json`)) {
      fs.appendFileSync(`${contentPath}/${lang}.json`, '{}', err => {
        if (err) throw err;
      });
    }
    return;
  });
};

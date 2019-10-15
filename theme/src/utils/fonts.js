const glob = require('glob');
const path = require('path');

function getFonts(dir, extensions = [`woff`]) {
  const extString = `@(${extensions.join(`|`)})`;
  const families = {};

  let fonts = glob.sync(`${dir}/**/*.${extString}`).map(fontFile => {
    const fontName = path.basename(fontFile);
    let family = fontName.split(`.`)[0];
    let aFamily = family.split(`-`);
    let weight = aFamily.pop();
    if (weight.toLowerCase() === `regular`) {
      weight = `normal`;
    }

    family = aFamily
      .map(chunk => `${chunk.charAt(0).toUpperCase()}${chunk.substr(1)}`)
      .join(` `);

    const extension = path.extname(fontFile).substr(1);
    const url = `/fonts/${fontName}`;

    if (!families[`${family}-${weight}`]) {
      families[`${family}-${weight}`] = { name: family, weight, data: [] };
    }
    families[`${family}-${weight}`].data.push({ url, extension });
    return {
      url,
      extension,
      family,
      weight
    };
  });

  return {
    fonts,
    families: Object.keys(families).map(family => families[family])
  };
}

module.exports = { getFonts };

const srcFolder = './src';
const buildFolder = './build';

export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
  },
  ico: `${srcFolder}/ico/*.png`,
  srcSvg: `${srcFolder}/img/sprite/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};

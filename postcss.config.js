const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');
const stylelint = require('stylelint');

module.exports = {
  plugins: [
    stylelint,
    postcssImport,
    precss,
    autoprefixer,
  ],
};

const path = require('path');
const devConfig = require("./webpack.config.js");

const prodConfig = devConfig;

prodConfig.output = {
  path: path.resolve(__dirname, './docs'),
  filename: "bundle.js"
};
delete prodConfig.devtool;

module.exports = prodConfig;
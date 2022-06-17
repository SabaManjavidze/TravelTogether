const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,

  typescript: {
    enableTypeChecking: false /* (default value)  */,
  },
};

const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    // Ignore source map warnings for @tonconnect
    config.ignoreWarnings = [
      {
        module: /node_modules\/@tonconnect/,
        message: /Failed to parse source map/,
      },
    ];
    return config;
  }
);
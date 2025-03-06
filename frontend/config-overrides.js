const { override, adjustWebpackConfig } = require('customize-cra');

module.exports = override(
  adjustWebpackConfig((config) => {
    // Filter out ENOENT source map warnings
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: [
        {
          loader: 'source-map-loader',
          options: {
            filterSourceMappingUrl: (url, resourcePath) => {
              if (/node_modules\/@tonconnect/.test(resourcePath)) {
                return false; // Skip source map loading for @tonconnect
              }
              return true;
            },
          },
        },
      ],
    });
    return config;
  })
);
const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer()({
  swcMinify: true,
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/audio/`,
            outputPath: `${isServer ? '../' : ''}static/audio/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    });

    return config;
  }
});

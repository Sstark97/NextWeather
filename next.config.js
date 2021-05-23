const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/*/node_modules'),
    ],
  },
  images: {
    domains: [
      'assets.tutorbook.app',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
    imageSizes: [260, 160, 120, 85, 40, 24],
  },
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/default/signup',
        permanent: true,
      },
      {
        source: '/search/:slug*',
        destination: '/default/search/:slug*',
        permanent: true,
      },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer && process.env.ANALYZE === 'true') {
      // Only run the bundle analyzer for the client-side chunks.
      // @see {@link https://github.com/vercel/next.js/issues/15481}
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze/client.html',
          generateStatsFile: true,
        })
      );
    }
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'raw-loader',
    });
    return config;
  },
});
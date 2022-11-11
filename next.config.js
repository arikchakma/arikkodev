const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
module.exports = withContentlayer({
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com'],
  },
});

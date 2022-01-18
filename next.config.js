module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/studio',
        destination: 'https://1x3.studio',
        permanent: true
      }
    ];
  }
};

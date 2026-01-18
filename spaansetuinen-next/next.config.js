/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects() {
    return [
      {
        source: '/trachycarpus-fortunei',
        destination: '/bomen/trachycarpus-fortunei',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

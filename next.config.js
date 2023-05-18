/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'frontend-take-home.fetch.com',
        port: '',
        pathname: '/dog-images/**'
      }
    ]
  }
}

module.exports = nextConfig

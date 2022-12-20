/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig

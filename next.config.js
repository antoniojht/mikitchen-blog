const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? '' : process.env.HOST,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["s3.us-west-2.amazonaws.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //swcMinify: false, // soluciona error al hacer el build
  images: {
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  transpilePackages: ['@stoop-sale/ui', '@stoop-sale/db'],
}

module.exports = nextConfig

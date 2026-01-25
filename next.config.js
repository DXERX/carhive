/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:3001',
        '*.app.github.dev',
        'super-space-journey-v76jjxqp7xqfvqq-3000.app.github.dev',
        'super-space-journey-v76jjxqp7xqfvqq-3001.app.github.dev',
      ],
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carhive.eduam.dev",
      },
      {
        protocol: "https",
        hostname: "carhive.vercel.app",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
    ],
  },
}

module.exports = nextConfig

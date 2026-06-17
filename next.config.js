/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Allow image/video uploads through server actions (default is 1mb).
    serverActions: { bodySizeLimit: '50mb' },
  },
  compress: true,
}

module.exports = nextConfig

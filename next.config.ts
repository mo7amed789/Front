import type { NextConfig } from 'next';

const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://localhost:7236';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendBaseUrl}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendBaseUrl}/health`,
      },
    ];
  },
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

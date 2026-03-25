import type { NextConfig } from 'next';

const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!backendBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
}

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
};

export default nextConfig;
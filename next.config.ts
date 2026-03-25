import type { NextConfig } from 'next';

const configuredApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://localhost:7236/api/auth';
const backendOrigin = new URL(configuredApiUrl).origin;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendOrigin}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendOrigin}/health`,
      },
    ];
  },
};

export default nextConfig;

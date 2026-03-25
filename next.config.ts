import type { NextConfig } from 'next';

<<<<<<< HEAD
const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!backendBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
}
=======
const configuredApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://localhost:7236/api/auth';
const backendOrigin = new URL(configuredApiUrl).origin;
>>>>>>> e7e14a01f4482de08f6f0f9abaec1c46daba15f2

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
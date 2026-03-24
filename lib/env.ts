const envSchema = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

if (!envSchema.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
}

export const env = {
  apiBaseUrl: envSchema.NEXT_PUBLIC_API_BASE_URL,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
};

export default nextConfig;
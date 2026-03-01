import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove Tailwind dependency by using plain CSS
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove Tailwind dependency by using plain CSS
  experimental: {
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'media.licdn.com'],
  },
};

export default nextConfig;

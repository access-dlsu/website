import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize bundle size and target modern browsers
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

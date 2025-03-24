import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],

  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/login',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/api/auth/register',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

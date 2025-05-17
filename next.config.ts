import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    }
  },
   images: {
    domains: ["i.pravatar.cc", "https://img.clerk.com", ], 
  },
  
};

export default nextConfig;
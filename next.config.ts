import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/work/sheknowmics",
        permanent: true, // 308 (Next.js) / treated as 301 by Google
      },
    ];
  },
};

export default nextConfig;

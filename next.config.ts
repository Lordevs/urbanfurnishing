import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Standalone output for optimized AWS Amplify deployment
  output: "standalone",

  images: {
    // Unoptimized images to reduce build size and processing time
    // unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [100, 95, 90, 85, 80, 75, 50, 25],
    minimumCacheTTL: 60,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "urbanfurnishing-backend.onrender.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Optimize output
  poweredByHeader: false,
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Experimental features for optimization
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  async headers() {
    return [
      // Hashed Next.js build assets (immutable)
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Next.js image optimizer endpoint
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },

      // Public images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // SVGs anywhere
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

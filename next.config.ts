import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/py/:path*",
        destination:
          process.env.NODE_ENV === "test"
            ? "http://127.0.0.1:8000/api/py/:path*"
            : "/api/", // Proxy to Backend
      },
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

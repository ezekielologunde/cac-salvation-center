import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },

  compiler: {
    removeConsole: { exclude: ["error"] },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host" as const, value: "blog.cacsalvationcenter.org" }],
          destination: "/blog",
        },
        {
          source: "/",
          has: [{ type: "host" as const, value: "city.cacsalvationcenter.org" }],
          destination: "/salvationcity",
        },
        {
          source: "/",
          has: [{ type: "host" as const, value: "ilorin.cacsalvationcenter.org" }],
          destination: "/ilorin",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

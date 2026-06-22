import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "blog.cacsalvationcenter.org" }],
        destination: "https://www.cacsalvationcenter.org/blog",
        permanent: false,
      },
    ];
  },
  // Subdomain rewrites: serve each page at its own subdomain URL without
  // changing the address bar (city + ilorin both keep their subdomain).
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;

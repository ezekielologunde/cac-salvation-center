import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  // Subdomain rewrites run in beforeFiles so they take priority over the
  // filesystem — without this, app/page.tsx at "/" is found first and the
  // host-based rewrite is never reached.
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

import type { NextConfig } from "next";

const SITE = "https://www.cacsalvationcenter.org";

// city + blog: redirect the subdomain to its page on the main site.
const subdomainRedirects = [
  { host: "city.cacsalvationcenter.org", path: "/salvationcity" },
  { host: "blog.cacsalvationcenter.org", path: "/blog" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return subdomainRedirects.map((s) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: s.host }],
      destination: `${SITE}${s.path}`,
      permanent: false,
    }));
  },
  // ilorin keeps its OWN subdomain URL: rewrite the root to the Ilorin page so
  // it serves at ilorin.cacsalvationcenter.org without changing the address bar.
  // Only the root is rewritten — asset/_next paths pass through untouched.
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host" as const, value: "ilorin.cacsalvationcenter.org" }],
        destination: "/ilorin",
      },
    ];
  },
};

export default nextConfig;

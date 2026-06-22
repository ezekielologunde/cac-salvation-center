import type { NextConfig } from "next";

const SITE = "https://www.cacsalvationcenter.org";

// Subdomain aliases → their page on the main site. Each fires only for its own
// host, and only once that subdomain is pointed at Vercel (dormant until then).
const subdomainRedirects = [
  { host: "salvationcity.cacsalvationcenter.org", path: "/salvationcity" },
  { host: "ilorin.cacsalvationcenter.org", path: "/ilorin" },
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
};

export default nextConfig;

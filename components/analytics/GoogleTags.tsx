import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // GA4 measurement id, e.g. G-XXXXXXX
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // Google Ads id, e.g. AW-XXXXXXX

/**
 * Google tag (gtag.js) — powers GA4 analytics and, optionally, Google Ads
 * conversion tracking. Renders nothing unless an id is configured, so the site
 * stays clean in development and on previews. Set the ids in Vercel →
 * Project → Settings → Environment Variables (NEXT_PUBLIC_GA_ID /
 * NEXT_PUBLIC_GOOGLE_ADS_ID) and redeploy to activate.
 */
export function GoogleTags() {
  const ids = [GA_ID, ADS_ID].filter(Boolean) as string[];
  if (ids.length === 0) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${ids
          .map((id) => `gtag('config','${id}');`)
          .join("")}`}
      </Script>
    </>
  );
}

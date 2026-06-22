import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-8M8BEVEEWM";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // Google Ads id, e.g. AW-XXXXXXX

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

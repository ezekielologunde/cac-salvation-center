import { churchJsonLd } from "@/lib/site";

/** The full Randallstown church graph (address, hours, pastors, rating and
 *  reviews). Render it only on pages about that church: the root layout
 *  carries just the WebSite, so the Ilorin and Salvation City micro-sites,
 *  which share the layout, never claim Randallstown's details. */
export function ChurchJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Static, app-controlled data only. `<` is escaped so no value can
      // ever break out of the <script> element (JSON-LD hardening).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd()).replace(/</g, "\\u003c") }}
    />
  );
}

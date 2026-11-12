import { CITY_URL } from "@/lib/site";
import { networkLlmsSection, type NetworkData } from "@/lib/network";
import network from "@/lib/network.json";

// Served as city.cacsalvationcenter.org/llms.txt (host rewrite in
// next.config.ts). About Salvation City only; the Randallstown church has its
// own /llms.txt on www.
const NETWORK: NetworkData = network;

export function GET() {
  const body = `# CAC Salvation City

> Spirit-filled worship in Rosedale, Maryland. A Christ Apostolic Church assembly, sister to the CAC Salvation Center in Randallstown.

## About
- Full name: Christ Apostolic Church - Salvation City (CAC Salvation City)
- Location: 8330 Pulaski Hwy Suite F, Rosedale, MD 21237, USA
- Phone: +1 443-985-3738
- Email: cacsalvationcity@outlook.com
- Worship online: every Sunday on Zoom (link on the home page)

## Key pages
- [Home, with directions and how to join](${CITY_URL}/)

${networkLlmsSection(NETWORK, "city")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

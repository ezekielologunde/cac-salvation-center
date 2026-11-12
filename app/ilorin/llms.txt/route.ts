import { ILORIN_URL, SITE_URL } from "@/lib/site";
import { networkLlmsSection, type NetworkData } from "@/lib/network";
import network from "@/lib/network.json";

// Served as ilorin.cacsalvationcenter.org/llms.txt (host rewrite in
// next.config.ts). About the Ilorin church only; the Randallstown church has
// its own /llms.txt on www.
const NETWORK: NetworkData = network;

export function GET() {
  const body = `# Christ Apostolic Church Salvation Centre, Ilorin

> The District Headquarters and parent assembly of the Christ Apostolic Church Salvation Centre, in Ilorin, Kwara State, Nigeria. Established July 6, 1997.

## About
- Full name: Christ Apostolic Church Salvation Centre, Ilorin (C.A.C Salvation Centre Ilorin)
- Location: Fate-Tanke Road & Abdullahi Mohammed Street, Oko Erin, Ilorin, Kwara State 240102, Nigeria
- District Superintendent: Pastor R.T. Owoseni
- Languages: English, Yoruba
- Email: cacsalvationcentreilorin@gmail.com

## Key pages
- [Home, with service times and daily word](${ILORIN_URL}/)
- [Ilorin blog](${SITE_URL}/ilorin/blog)

## Messages
- [Pastor Owoseni's messages on Spotify](https://open.spotify.com/show/2VBBGHUo6nMITGmGGrEUoM)
- [YouTube](https://www.youtube.com/@c.a.csalvationvoicefate-ta5068)

${networkLlmsSection(NETWORK, "ilorin")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

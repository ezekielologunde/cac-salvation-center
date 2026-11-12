// Checks the CAC network wiring in this repo (lib/network.json, lib/site.ts,
// the llms.txt family section, the Ilorin JSON-LD, the footer):
//
//   node scripts/check-network-seo.mjs [path/to/canonical/network.json]
//
// With a path, also checks this copy matches the canonical one (the
// cacnorthamerica repo's lib/network.json) apart from line endings.
// Node 24 strips TypeScript types natively. Exits 1 if any check fails.
import { readFileSync } from "node:fs";

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const norm = (s) => s.split("\r\n").join("\n");
const raw = norm(read("lib/network.json"));
const net = JSON.parse(raw);
const { networkLlmsSection, relationshipLines } = await import("../lib/network.ts");

let failures = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failures++;
}

// The family section a crawler gets from /llms.txt.
const llms = networkLlmsSection(net, "salvation-center");
for (const s of net.sites.filter((s) => s.id !== "salvation-center")) {
  check(`llms.txt links ${s.id} (${s.url})`, llms.includes(`](${s.url})`));
}
check("llms.txt does not link the site to itself", !llms.includes("](https://www.cacsalvationcenter.org)"));
check("llms.txt names Pastor Owoseni with his Spotify show",
  llms.includes("Pastor R.T. Owoseni") && llms.includes("open.spotify.com/show/2VBBGHUo6nMITGmGGrEUoM"));
check("llms.txt lists the Hope for Today podcast", llms.includes("open.spotify.com/show/0wFUgSZq4CuVuM0M9gRFUw"));
const rel = relationshipLines(net, "salvation-center").join(" ");
check("salvation center: member of CACNA, parent is Ilorin, Salvation City is its sister",
  /member of Christ Apostolic Church North America/.test(rel) && /parent assembly is .*Ilorin/.test(rel) && /Salvation City is its sister/.test(rel));
check("Salvation City sees the salvation center as its sister",
  /Salvation Center is its sister/.test(relationshipLines(net, "city").join(" ")));

// Wiring: constants, JSON-LD and footer must use the canonical hosts.
const site = read("lib/site.ts");
check("CACNA_URL is cacna.org", /export const CACNA_URL = "https:\/\/cacna\.org";/.test(site));
check("YYAM_URL is yyam.cacna.org", /export const YYAM_URL = "https:\/\/yyam\.cacna\.org";/.test(site));
check("convention link has no /en prefix", /CAC_CONVENTION_URL = `\$\{CACNA_URL\}\/calendar`/.test(site));
check("no cacna.cacsalvationcenter.org left in site.ts", !/cacna\.cacsalvationcenter\.org/.test(site));
check("church JSON-LD: parentOrganization is Ilorin, memberOf CACNA",
  /parentOrganization: \{[^}]*ILORIN_URL/.test(site) && /memberOf: \{[^}]*CACNA_URL/.test(site));
check("church JSON-LD has the Hope for Today PodcastSeries", /"@type": "PodcastSeries"/.test(site) && site.includes("0wFUgSZq4CuVuM0M9gRFUw"));
const ilorin = read("app/ilorin/page.tsx");
check("Ilorin JSON-LD no longer names Baltimore as its parent", !/parentOrganization/.test(ilorin));
check("Ilorin JSON-LD lists the Baltimore churches as subOrganization", /subOrganization/.test(ilorin));
check("Ilorin JSON-LD links the show to Pastor Owoseni (@id)", /author: \{ "@id": OWOSENI_ID \}/.test(ilorin));
check("footer links YYAM", /YYAM_URL/.test(read("components/sections/FooterExperience.tsx")));
check("llms route uses the network section", /networkLlmsSection\(NETWORK, "salvation-center"\)/.test(read("app/llms.txt/route.ts")));

const canonical = process.argv[2];
if (canonical) {
  let theirs = null;
  try { theirs = norm(readFileSync(canonical, "utf8")); } catch { /* reported below */ }
  check(`network.json matches the canonical copy: ${canonical}`, theirs !== null && theirs === raw);
}

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");

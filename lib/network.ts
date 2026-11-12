// The CAC web family (lib/network.json) as markdown for /llms.txt. Kept free of
// "@/" imports and JSON imports so scripts/check-network-seo.mjs can run it
// under plain Node; callers pass the data (import it from "@/lib/network.json").

export interface NetworkSite {
  id: string;
  name: string;
  shortName: string;
  url: string;
  role: string;
  external?: boolean;
}
export interface NetworkData {
  sites: NetworkSite[];
  relationships: { from: string; type: string; to: string }[];
  people: { id: string; name: string; jobTitle: string; worksFor: string }[];
  media: { id: string; type: string; name: string; url: string; host?: string; site: string }[];
}

const siteName = (net: NetworkData, id: string) => net.sites.find((s) => s.id === id)?.name ?? id;

/** Plain-English lines about how `selfId` relates to the other sites. */
export function relationshipLines(net: NetworkData, selfId: string): string[] {
  const out: string[] = [];
  for (const r of net.relationships) {
    const other = (id: string) => siteName(net, id);
    if (r.from === selfId) {
      if (r.type === "memberOf") out.push(`This site's church is a member of ${other(r.to)}.`);
      else if (r.type === "partOf") out.push(`This site is part of ${other(r.to)}.`);
      else if (r.type === "parentOrganization") out.push(`Its parent assembly is ${other(r.to)}.`);
      else if (r.type === "siblingOf") out.push(`${other(r.to)} is its sister assembly.`);
    } else if (r.to === selfId) {
      if (r.type === "siblingOf") out.push(`${other(r.from)} is its sister assembly.`);
      else if (r.type === "parentOrganization") out.push(`${other(r.from)} is a church under this one.`);
    }
  }
  return out;
}

/** The "CAC family" block for an llms.txt: every other site with its role,
 *  how this one relates to them, and the people and media the family shares. */
export function networkLlmsSection(net: NetworkData, selfId: string): string {
  const others = net.sites.filter((s) => s.id !== selfId);
  const lines = [
    "## The CAC family",
    "These sites belong to one family of Christ Apostolic Church assemblies. Each has its own job; link to the one that answers the question.",
    ...others.map((s) => `- [${s.name}](${s.url}): ${s.role}`),
  ];
  const rel = relationshipLines(net, selfId);
  if (rel.length) lines.push("", ...rel.map((l) => `- ${l}`));

  const people = net.people.map((p) => {
    const shows = net.media.filter((m) => m.host === p.id).map((m) => `[${m.name}](${m.url})`);
    const site = net.sites.find((s) => s.id === p.worksFor);
    const at = site ? ` at [${site.name}](${site.url})` : "";
    return `- ${p.name}, ${p.jobTitle}${at}${shows.length ? `. Listen: ${shows.join(", ")}` : ""}`;
  });
  if (people.length) lines.push("", "## People", ...people);

  const shows = net.media.filter((m) => m.type === "PodcastSeries" && !m.host);
  if (shows.length) lines.push("", "## Podcasts", ...shows.map((m) => `- [${m.name}](${m.url})`));
  return lines.join("\n");
}

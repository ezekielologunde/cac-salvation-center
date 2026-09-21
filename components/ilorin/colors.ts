// Shared green identity for the Ilorin micro-site. Deliberately NOT a "use client"
// module: server components (the Messages pages) import these values directly, and
// values exported from a client module resolve to undefined on the server.
export const ilorinColors = {
  deep: "#06311F",
  green: "#0E7A43",
  greenBright: "#2BB673",
  gold: "#E8A33D",
  cream: "#EEF5EE",
  cream2: "#E3EFE4",
  paper: "#FFFFFF",
  ink: "#0A2418",
  inkSoft: "#46604F",
  line: "rgba(8,40,24,.10)",
  onDeep: "rgba(238,245,238,.74)",
  onDeepLine: "rgba(238,245,238,.16)",
};

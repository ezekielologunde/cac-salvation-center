import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactElement } from "react";
import { specialEvents } from "@/lib/events";
import { SITE } from "@/lib/site";

/** Shared by every generated social image: 1200x630 is what Facebook, X, WhatsApp and Google use. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export interface OgCardProps {
  /** Small gold line above the title. */
  kicker: string;
  /** The big line. Keep it to about 40 characters so it fits on two lines. */
  title: string;
  /** One supporting line (dates, place). Facts only, from the site's own data. */
  detail: string;
  /** Bottom line, normally the site address. */
  footer: string;
}

async function logoDataUrl(): Promise<string> {
  const png = await readFile(join(process.cwd(), "public/images/logo.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** The card layout. Colours are the site's own (app/globals.css): ink, red, red-deep, flame, gold. */
export async function ogCard({ kicker, title, detail, footer }: OgCardProps): Promise<ReactElement> {
  const logo = await logoDataUrl();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1B130E 0%, #1B130E 55%, #9E1B1B 100%)",
        color: "#FFF7EF",
        position: "relative",
        padding: "72px 72px 64px 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          background: "linear-gradient(90deg, #D62828, #F15F22)",
          display: "flex",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#E8A33D" }}>
            {kicker}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 76, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 36, lineHeight: 1.3, color: "#FBEAD9" }}>{detail}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#E8A33D" }}>{footer}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 280,
            borderRadius: 140,
            background: "#FFFFFF",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img>; next/image is not available here */}
          <img src={logo} width={220} height={165} alt="" />
        </div>
      </div>
    </div>
  );
}

/** Site default card: church name, town and the Sunday service time, all from lib/site.ts. */
export function siteCard(): Promise<ReactElement> {
  return ogCard({
    kicker: `${SITE.address.city}, ${SITE.address.region}`,
    title: SITE.name,
    detail: "Sunday worship at 10:30 AM ET",
    footer: "cacsalvationcenter.org",
  });
}

/** Card for a featured event in lib/events.ts: title and date label come from the entry. */
export function eventCard(id: string, opts: { kicker: string; place: string; withTime?: boolean }): Promise<ReactElement> {
  const ev = specialEvents.find((e) => e.id === id);
  if (!ev) throw new Error(`ogCard: no event with id ${id}`);
  return ogCard({
    kicker: opts.kicker,
    title: ev.title,
    detail: opts.withTime ? `${ev.dateLabel} · ${ev.timeLabel}` : ev.dateLabel,
    footer: opts.place,
  });
}

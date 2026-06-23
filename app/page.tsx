import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/sections/Hero";
import { Watchword } from "@/components/sections/Watchword";
import { Testimonials } from "@/components/sections/Testimonials";
import { PastorWelcome } from "@/components/sections/PastorWelcome";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { Impact } from "@/components/sections/Impact";
import { Youth } from "@/components/sections/Youth";
import { Events } from "@/components/sections/Events";
import { GlobalChurches } from "@/components/sections/GlobalChurches";
import { PlanVisit } from "@/components/sections/PlanVisit";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { createServiceClient } from "@/lib/supabase/server";

export default async function Home() {
  const service = createServiceClient();
  const { data: announcements } = await service
    .from("announcements")
    .select("id, title, body, cta_text, cta_url, bg_color, text_color")
    .eq("active", true)
    .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
    .in("placement", ["homepage", "both"])
    .order("sort_order");

  return (
    <main>
      <Nav heroDark />
      {announcements?.map((ann) => (
        <div key={ann.id} style={{
          background: ann.bg_color,
          color: ann.text_color,
          padding: "14px clamp(20px,5vw,64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          textAlign: "center",
        }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{ann.title}</span>
          {ann.body && <span style={{ opacity: 0.85, fontSize: 14 }}>{ann.body}</span>}
          {ann.cta_text && ann.cta_url && (
            <a href={ann.cta_url} style={{
              background: "rgba(255,255,255,0.2)",
              color: ann.text_color,
              fontWeight: 800,
              fontSize: 13,
              padding: "6px 16px",
              borderRadius: 20,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}>
              {ann.cta_text}
            </a>
          )}
        </div>
      ))}
      <Hero />
      <Watchword />
      <Testimonials />
      <PastorWelcome />
      <WhatToExpect />
      <Impact />
      <Youth />
      <Events />
      <GlobalChurches />
      <PlanVisit />
      <InstagramFeed />
      <FooterExperience />
    </main>
  );
}

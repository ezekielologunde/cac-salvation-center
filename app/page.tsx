import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Sermons } from "@/components/sections/Sermons";
import { Storytelling } from "@/components/sections/Storytelling";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { Impact } from "@/components/sections/Impact";
import { Youth } from "@/components/sections/Youth";
import { Events } from "@/components/sections/Events";
import { GlobalChurches } from "@/components/sections/GlobalChurches";
import { PlanVisit } from "@/components/sections/PlanVisit";
import { FooterExperience } from "@/components/sections/FooterExperience";

export default function Home() {
  return (
    <main>
      <Nav heroDark />
      <Hero />
      <Testimonials />
      <Sermons />
      <Storytelling />
      <WhatToExpect />
      <Impact />
      <Youth />
      <Events />
      <GlobalChurches />
      <PlanVisit />
      <FooterExperience />
    </main>
  );
}

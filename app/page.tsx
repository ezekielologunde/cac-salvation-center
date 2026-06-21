import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/sections/Hero";
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

export default function Home() {
  return (
    <main>
      <Nav heroDark />
      <Hero />
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

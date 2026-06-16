import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/sections/Hero";
import { Storytelling } from "@/components/sections/Storytelling";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { Events } from "@/components/sections/Events";
import { Sermons } from "@/components/sections/Sermons";
import { Youth } from "@/components/sections/Youth";
import { Impact } from "@/components/sections/Impact";
import { Testimonials } from "@/components/sections/Testimonials";
import { PlanVisit } from "@/components/sections/PlanVisit";
import { FooterExperience } from "@/components/sections/FooterExperience";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Storytelling />
      <WhatToExpect />
      <Events />
      <Sermons />
      <Youth />
      <Impact />
      <Testimonials />
      <PlanVisit />
      <FooterExperience />
    </main>
  );
}

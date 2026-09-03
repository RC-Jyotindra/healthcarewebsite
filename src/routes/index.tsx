import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Caregivers } from "@/components/site/Caregivers";
import { Guardian } from "@/components/site/Guardian";
import { Pillars } from "@/components/site/Pillars";
import { Publications } from "@/components/site/Publications";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Waitlist } from "@/components/site/Waitlist";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medexa Research — Where clinical rigor meets breakthrough discovery" },
      {
        name: "description",
        content:
          "Medexa Research is a leading scientific institute dedicated to translating complex biological insights into clinical breakthroughs.",
      },
      {
        property: "og:title",
        content: "Medexa Research — Where clinical rigor meets breakthrough discovery",
      },
      {
        property: "og:description",
        content:
          "Medexa Research is a leading scientific institute dedicated to translating complex biological insights into clinical breakthroughs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-ink font-montserrat">
      <Nav />
      <Hero />
      <Caregivers />
      <Guardian />
      <Pillars />
      <Publications />
      <WhoWeAre />
      <HowItWorks />
      <Waitlist />
      <Footer />
    </main>
  );
}

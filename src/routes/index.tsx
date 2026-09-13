import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/cursor";
import {
  About,
  Contact,
  FeaturedReel,
  Footer,
  Hero,
  Marquee,
  Navbar,
  Work,
} from "@/components/portfolio/sections";

const title = "Mohamed Rezwin Ashraf — Videographer & Video Editor, Dubai";
const description =
  "Cinematic videography and editing in Dubai: weddings, automotive, PR campaigns, architecture and social content by Mohamed Rezwin Ashraf.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <FeaturedReel />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}

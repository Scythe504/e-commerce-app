import { BentoGridDemo } from "@/components/hero-section/featured";
import { PromotionSlider } from "@/components/hero-section/image-slider";
import { HeroScrollDemo } from "@/components/hero-section/scroll";
import { BentoGrid } from "@/components/ui/bento-grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <PromotionSlider/>
      <HeroScrollDemo/>
      <h1 className="text-6xl text-center pb-16">Featured</h1>
      <BentoGridDemo/>
    </main>
  );
}

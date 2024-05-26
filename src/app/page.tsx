import { PromotionSlider } from "@/components/hero-section/image-slider";
import { HeroScrollDemo } from "@/components/hero-section/scroll";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <PromotionSlider/>
      <HeroScrollDemo/>
    </main>
  );
}

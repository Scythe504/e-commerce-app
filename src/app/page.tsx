import Login from "@/components/auth/login/login";
import Structure from "@/components/bento-layout/structure";
import Navbar from "@/components/header/navbar";
import { BentoGridDemo } from "@/components/hero-section/bento-grid";
import { PromotionSlider } from "@/components/hero-section/image-slider";
import { HeroScrollDemo } from "@/components/hero-section/scroll";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <PromotionSlider/>
      <HeroScrollDemo/>
      <BentoGridDemo/>
    </main>
  );
}

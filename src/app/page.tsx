import FeaturePillMarquee from "./components/FeaturePillMarquee";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { Section2 } from "./components/Section2";
import { Section3 } from "./components/Section3";
import { Section4 } from "./components/Section4";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      {/* TODO - Fix the gradient background and make it more visually appealing */}
      <section
        className=" text-slate-900"
        id = "hero"
        style={{
          background:"linear-gradient(to bottom, #020617 0%, #080c26 20%, #13183b 33%, #292f5e 48%, #454c87 57%, #7b84c9 65%, #f7f9fa 80%)"
        }}
      >
        <HeroSection />
      </section>
      <FeaturePillMarquee />
      <section className="text-slate-900"
        id = "section2"
        style={{
          background:"#f7f9fa"
        }}>
          <Section2 />
      </section>
      <section className="text-slate-900"
        id = "section3"
        style={{
          background:"#101012"
        }}>
          <Section3 />
      </section>
      <section className="text-slate-900"
        id = "section4"
        style={{
          background:"#f7f9fa"
        }}>
          <Section4 />
      </section>
      <section className="text-slate-900"
        id = "section5"
        style={{
          background:"#101012"
        }}>
          <Footer/>
      </section>
    </main>
  );
}
import Adminbar from "./components/Adminbar";
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
        id="hero"
        className="relative overflow-hidden text-slate-900"
        style={{
          background: `
            radial-gradient(circle at 18% 12%, rgba(37, 99, 235, 0.18), transparent 34%),
            radial-gradient(circle at 82% 18%, rgba(59, 130, 246, 0.12), transparent 36%),
            linear-gradient(to bottom,
              #020617 0%,
              #03091d 10%,
              #050d24 20%,
              #07112b 30%,
              #091634 40%,
              #0b1a3d 50%,
              #10234f 58%,
              #162d61 64%,
              #1d3872 69%,
              #294987 73%,
              #3b5d9e 76%,
              #6380ba 78%,
              #aebfe0 79%,
              #f7f9fa 80%,
              #f7f9fa 100%
            )
          `,
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
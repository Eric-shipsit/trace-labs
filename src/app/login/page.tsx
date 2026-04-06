import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

export default function LoginPage() {

  return (
    <main>
      <Navbar />
      {/* TODO - Fix the gradient background and make it more visually appealing */}

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
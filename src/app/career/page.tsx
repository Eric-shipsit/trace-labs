import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Postings } from "./components/Postings";

export default function CareerPage() {

  return (
    <main 
      id="career"  
      style={{
        background:"#f7f9fa"
      }}>
  
      <Navbar />
      <section className=""
        id = "career"
        style={{
          background:"#f7f9fa"
        }}>
          <Postings />
      </section>
      <section className="text-slate-900"
        style={{
          background:"#101012"
        }}>
          <Footer/>
      </section>
    </main>
  );
}
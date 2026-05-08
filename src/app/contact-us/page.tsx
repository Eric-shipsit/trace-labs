import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fa]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f7f9fa] px-6 py-24">
        {/* Soft background color accents */}
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Contact Us
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Get in touch with Trace Labs
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Have a question about Monitr, reliability tools, or working with Trace
            Labs? Send us a message and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/60">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="relative mx-auto my-6 flex max-w-2xl items-center gap-4">
          <div className="h-px flex-1 bg-blue-100" />
          <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-400 shadow-sm">
            or
          </span>
          <div className="h-px flex-1 bg-blue-100" />
        </div>

        <div className="relative mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-lg shadow-blue-100/50">
          <p className="text-sm font-medium text-slate-500">
            Prefer email?
          </p>

          <p className="mt-2 text-base text-slate-700">
            You can also reach us directly at{" "}
            <a
              href="mailto:tracelabs.contact@gmail.com"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              tracelabs.contact@gmail.com
            </a>
          </p>
        </div>
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
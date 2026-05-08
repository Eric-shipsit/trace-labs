import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

export default function RequestDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Request a Demo
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              See how Trace Labs can help your team improve reliability.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Schedule a personalized walkthrough of Monitr and learn how your
              team can monitor application health, detect issues earlier, and
              make better reliability decisions.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <p>✓ Product walkthrough tailored to your team</p>
              <p>✓ See how Monitr tracks application health</p>
              <p>✓ Ask questions about setup, usage, and pricing</p>
              <p>✓ Learn about upcoming Trace Labs products</p>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Book your demo
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and our team will reach out.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Company
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  What are you interested in?
                </label>
                <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option>Monitr</option>
                  <option>SyncNote</option>
                  <option>Both products</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Tell us about your team or what you'd like to see."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Request demo
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  );
}
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Updates
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Product Updates
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Changelogs, release notes, product improvements, and new feature
            announcements from Trace Labs will be posted here.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            No updates yet
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            We&apos;re still preparing our first changelogs. Check back soon for
            product updates and release notes.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
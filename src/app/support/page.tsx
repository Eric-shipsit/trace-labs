import Link from "next/link";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Support
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            We’re here to help.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Need help with Trace Labs products? Our support resources are still
            being built, but you can reach out to us directly for questions,
            feedback, or product assistance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Contact Support
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Help
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Get help with Monitr, dashboards, alerts, and reliability tools.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Account Support
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Questions about access, accounts, or setup can be sent through our
              contact page.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Coming Soon
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              AI-powered support and help documentation will be added in a future
              release.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
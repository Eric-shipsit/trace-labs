import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

export default function WhatWeDoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              What We Do
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              Building software that makes reliability easier to manage
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Trace Labs creates tools that help teams monitor application health,
              understand system behavior, and respond to problems before they affect
              users.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Monitr */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-blue-100/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                M
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Monitr
              </h3>

              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Application Reliability Monitoring
              </p>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Monitr helps teams track application health, monitor traffic,
                identify errors, and understand performance issues through clear,
                actionable dashboards.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Health Tracking</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    View uptime, requests, and service status in one place.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Issue Detection</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Spot errors and unusual traffic patterns before they grow.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Product */}
            <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-lg shadow-cyan-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white">
                  S
                </div>

                <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Under Development
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                SyncNote
              </h3>

              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-cyan-600">
                Meeting Notes & Scheduling
              </p>

              <p className="mt-4 text-base leading-7 text-slate-600">
                SyncNote helps teams plan meetings, organize notes, and keep schedules in one
                place so important discussions turn into clear next steps.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-100 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Meeting Notes</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Capture agendas, decisions, and action items during team meetings.
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-100 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Smart Scheduling</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Organize upcoming meetings, deadlines, and follow-ups in a shared schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
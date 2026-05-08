import Link from "next/link";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link
            href="/product"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            Monitr
          </Link>

          <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/product/dashboard" className="transition hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/product/api-health" className="transition hover:text-slate-900">
              Graphs
            </Link>
            <Link href="/product/anomalies" className="transition hover:text-slate-900">
              Anomalies
            </Link>
            <Link href="/product/alerts" className="transition hover:text-slate-900">
              Alerts
            </Link>
            <Link href="/product/reports" className="transition hover:text-slate-900">
              Reports
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              E
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">24hr Total Requests</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  1.27M
                </h2>
                <p className="mt-1 text-sm text-emerald-600">+0.03% today</p>
              </div>
            </div>

            <div className="mt-6 h-24 w-full rounded-xl bg-slate-50 p-3">
              <svg viewBox="0 0 300 80" className="h-full w-full">
                <path
                  d="M 0 55
                    C 70 55, 100 30, 150 25
                    C 200 30, 230 55, 300 55
                    L 300 80
                    L 0 80
                    Z"
                  className="fill-blue-100"
                />
                <path
                  d="M 0 55
                    C 70 55, 100 30, 150 25
                    C 200 30, 230 55, 300 55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-blue-600"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">p90 Latency</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  85ms
                </h2>
                <p className="mt-1 text-sm text-emerald-600">-1ms this week</p>
              </div>
            </div>

            <div className="mt-6 h-24 w-full rounded-xl bg-slate-50 p-3">
              <svg viewBox="0 0 300 80" className="h-full w-full">
                <polygon
                  points="0,42 30,41 60,43 90,41 120,42 150,40 180,42 210,41 240,43 270,42 300,41 300,80 0,80"
                  className="fill-emerald-100"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-emerald-600"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,42 30,41 60,43 90,41 120,42 150,40 180,42 210,41 240,43 270,42 300,41"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Error Rate</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  0.021%
                </h2>
                <p className="mt-1 text-sm text-rose-600">+0.002% this week</p>
              </div>
            </div>

            <div className="mt-6 h-24 w-full rounded-xl bg-slate-50 p-3">
              <svg viewBox="0 0 300 80" className="h-full w-full">
                <polygon
                  points="0,44 30,42 60,45 90,43 120,44 150,41 180,45 210,42 240,44 270,43 300,45 300,80 0,80"
                  className="fill-rose-100"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-rose-600"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,44 30,42 60,45 90,43 120,44 150,41 180,45 210,42 240,44 270,43 300,45"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Uptime this week</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  99.76%
                </h2>
                <p className="mt-1 text-sm text-emerald-600">25 min down this week</p>
              </div>
            </div>

            <div className="mt-6 h-24 w-full rounded-xl bg-slate-50 p-3">
              <svg viewBox="0 0 300 80" className="h-full w-full">
                <polygon
                  points="0,12 30,12 60,12 90,12 120,12 150,12 180,12 210,12 228,12 228,68 230,68 230,12 270,12 300,12 300,80 0,80"
                  className="fill-violet-100"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  className="text-violet-600"
                  points="0,12 30,12 60,12 90,12 120,12 150,12 180,12 210,12 228,12 228,68 230,68 230,12 270,12 300,12"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-8 ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">System Status</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                    API Health Overview
                  </h2>
                  <p className="mt-3 text-sm text-emerald-600">
                    All critical services are operating within normal thresholds.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <div className="grid grid-cols-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <p>Service</p>
                  <p>Successful Requests</p>
                  <p>Avg Latency</p>
                </div>

                <div className="divide-y divide-slate-200">
                  <div className="grid grid-cols-3 items-center px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <p className="font-medium text-slate-900">Auth Service</p>
                    </div>
                    <p className="text-slate-700">99.98%</p>
                    <p className="text-slate-700">42ms</p>
                  </div>

                  <div className="grid grid-cols-3 items-center px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <p className="font-medium text-slate-900">Payments API</p>
                    </div>
                    <p className="text-slate-700">99.91%</p>
                    <p className="text-slate-700">88ms</p>
                  </div>

                  <div className="grid grid-cols-3 items-center px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <p className="font-medium text-slate-900">User API</p>
                    </div>
                    <p className="text-slate-700">99.96%</p>
                    <p className="text-slate-700">51ms</p>
                  </div>

                  <div className="grid grid-cols-3 items-center px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <p className="font-medium text-slate-900">Orders Service</p>
                    </div>
                    <p className="text-slate-700">99.93%</p>
                    <p className="text-slate-700">64ms</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Reliability</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Error Rate
              </h2>
              <p className="mt-3 text-sm text-rose-600">
                Slight increase detected over the past 24 hours.
              </p>

              <div className="mt-6 h-28 rounded-xl bg-slate-50 p-3">
                <svg viewBox="0 0 300 80" className="h-full w-full">
                  <polygon
                    points="0,46 30,44 60,45 90,43 120,44 150,42 180,45 210,43 240,44 270,45 300,44 300,80 0,80"
                    className="fill-rose-100"
                  />
                  <polyline
                    points="0,46 30,44 60,45 90,43 120,44 150,42 180,45 210,43 240,44 270,45 300,44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-rose-600"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Incident Queue</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Active Alerts
              </h2>
              <p className="mt-3 text-sm text-amber-600">
                0 alerts currently require attention.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">Higher latency on /api/search</p>
                  <p className="mt-1 text-sm text-slate-600">Triggered 8 minutes ago</p>
                </div>
              </div>
            </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Detection</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Recent Anomaly
        </h2>
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Affected API</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Payments API
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Spike Detected
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-500">Why it was flagged</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              Request volume and latency rose above the expected range for this endpoint,
              exceeding the normal baseline during a short 12-minute window.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Peak RPS
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">1,842</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Latency Increase
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">+67ms</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Duration
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">12 min</p>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </section>

    </main>
  );
}
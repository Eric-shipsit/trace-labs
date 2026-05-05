import { TrafficGraph } from "./components/TrafficGraph";

export default function TrafficPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Monitoring
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Traffic Overview
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            View request volume trends throughout the day and spot unusual spikes
            in application traffic.
          </p>
        </div>

        <TrafficGraph />
      </div>
    </main>
  );
}
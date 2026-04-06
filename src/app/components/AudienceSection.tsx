const audiences = [
  {
    title: "Engineering Teams",
    description:
      "Monitor critical services, catch failures earlier, and reduce time spent reacting to unexpected issues.",
  },
  {
    title: "Product Teams",
    description:
      "Stay informed about service health and user-impacting problems without digging through complex dashboards.",
  },
  {
    title: "Startups",
    description:
      "Get lightweight monitoring visibility that helps small teams move fast while keeping production reliable.",
  },
  {
    title: "Operations & Platform Teams",
    description:
      "Track anomalies, surface alerts faster, and keep infrastructure and internal systems running smoothly.",
  },
];

export function AudienceSection() {
  return (
    <section className="w-full bg-slate-50 px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Who It’s For
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built for teams that need clearer visibility
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Trace Labs is designed for modern teams that want to detect issues
            earlier, understand service health faster, and respond with more confidence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const features = [
  "Real-time monitoring",
  "Error tracking",
  "Traffic insights",
  "Latency reports",
  "Uptime checks",
  "API health",
  "Smart alerts",
  "Performance trends",
  "Incident detection",
  "System reliability",
];

export default function FeaturePillMarquee() {
  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-slate-500">
          What Monitr helps with
        </p>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...features, ...features].map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
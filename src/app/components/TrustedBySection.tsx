const companies = [
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Netflix", logo: "/logos/netflix.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "Discord", logo: "/logos/discord.svg" },
];

export function TrustedBySection() {
  const duplicated = [...companies, ...companies];

  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by teams at
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-marquee gap-12">
            {duplicated.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex h-16 min-w-[140px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-6"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-8 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
export function Section3() {
  return (
    <section id="section3" className="px-6 py-20 md:px-10 lg:px-16 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight m:text-4xl">
            Built to help teams see issues faster
          </h2>
          <p className="mt-4 text-base leading-7 sm:text-lg">
            Alternate content and product visuals to break up the page and make
            each feature easier to scan.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {/* Row 1: text left, image right */}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5 mt-10">
            <div className="order-1 lg:order-2 lg:col-span-2">
              <h3 className="mt-3 text-2xl font-semibold">
                Understand what changed
              </h3>
              <p className="mt-4 text-sm leading-7">
                View trends clearly and investigate changes with context so your
                team can move from detection to understanding faster.
              </p>
            </div>
            <div className="order-2 lg:order-2 lg:col-span-3">
              <div className="relative h-[280px] w-full overflow-hidden rounded-3xl bg-white md:h-[360px]">
                <Image
                  src="/image1.png"
                  alt="Analytics report preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Row 2: image left, text right */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4 mt-20">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div className="relative h-[280px] w-full overflow-hidden rounded-3xl bg-white md:h-[360px]">
                <Image
                  src="/image9.png"
                  alt="Analytics report preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-2">
              <h3 className="mt-3 text-2xl font-semibold">
                Understand what changed
              </h3>
              <p className="mt-4 text-sm leading-7">
                View trends clearly and investigate changes with context so your
                team can move from detection to understanding faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
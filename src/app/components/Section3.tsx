import Image from "next/image";
export function Section3() {
  return (
    <section id="section3" className="px-6 py-20 md:px-10 lg:px-16 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-lg font-semibold uppercase tracking-[0.3em]">
            Trace Labs
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {/* Row 1: text left, image right */}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5 mt-10">
            <div className="order-1 lg:order-2 lg:col-span-2">
              <h3 className="mt-3 text-2xl font-semibold">
                Find Problems Faster
              </h3>
              <p className="mt-4 text-sm leading-7">
                Generate clear reports that highlight performance issues, reliability gaps, and areas where your team can improve.              </p>
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
                Spend More Time Building
              </h3>
              <p className="mt-4 text-sm leading-7">
               Reduce time spent searching for problems so your engineers can focus on developing, improving, and shipping software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
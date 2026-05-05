import Image from "next/image";

export function Section2() {
  return (
    <section id="section2" className="bg-f7f9fa px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Monitr
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Application health tracker
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Keep track of your application's health, performance, and reliability.
          </p>
        </div>

        {/* Two boxes */}
        <section className="mx-auto max-w-7xl px-6 py-16">          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Container 1 */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid h-full grid-cols-1 md:grid-cols-[42%_58%]">
                {/* Image side */}
                <div className="relative min-h-[320px] bg-slate-50 md:min-h-full">
                  <Image
                    src="/image3.png"
                    alt="Dashboard preview"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Info side */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    API Monitoring
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Track request traffic, latency, uptime, and error rates across your application. Monitr gives engineering teams a clear view of API health before small issues become major outages.
                  </p>
                </div>
              </div>
            </div>

            {/* Container 2 */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid h-full grid-cols-1 md:grid-cols-[42%_58%]">
                {/* Image side */}
                <div className="relative min-h-[320px] bg-slate-50 md:min-h-full">
                  <Image
                    src="/image5.png"
                    alt="Incident preview"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Info side */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    Monthly Reports
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">Generate clean monthly summaries of application performance, incidents, and reliability trends. Teams can quickly review what changed, what improved, and what needs attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Container 1 */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid h-full grid-cols-1 md:grid-cols-[42%_58%]">
                {/* Image side */}
                <div className="relative min-h-[320px] bg-slate-50 md:min-h-full">
                  <Image
                    src="/image4.png"
                    alt="Dashboard preview"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Info side */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    Fast Issue Detection
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Detect unusual spikes, failures, and slowdowns as they happen. Monitr surfaces likely causes and suggested fixes so teams can respond faster.
                  </p>
                </div>
              </div>
            </div>

            {/* Container 2 */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid h-full grid-cols-1 md:grid-cols-[42%_58%]">
                {/* Image side */}
                <div className="relative min-h-[320px] bg-slate-50 md:min-h-full">
                  <Image
                    src="/image8.png"
                    alt="Incident preview"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Info side */}
                <div className="flex flex-col justify-center p-6 md:p-8">

                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    Mobile Alerts
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
Connect your application to mobile paging so critical issues reach the right people quickly. Engineers can stay informed about production problems even when they are away from their dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </section>

      </div>
    </section>
  )
}
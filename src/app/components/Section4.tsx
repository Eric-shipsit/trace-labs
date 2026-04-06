import { AudienceSection } from "./AudienceSection"
export function Section4() {
  return (
    <section >
      <AudienceSection/>
      <div className="w-full px-6 py-20 md:px-10 lg:px-16 ">
        <div className="mx-auto max-w-6xl">
          <div className=" px-8 py-14 text-center sm:px-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Get Started
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              See how Trace Labs can help your team catch issues faster
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black sm:text-lg">
              Get a closer look at the platform, explore the workflow, and see how
              Trace Labs fits into your team’s monitoring process.
            </p>

            <div className="mt-8 flex justify-center">
              <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-100">
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </div>1
    </section>
  );
}
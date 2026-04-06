export function HeroSection() {
  return (
    <section className="w-full px-6 py-25 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
        {/* Left container */}
        <div className="flex flex-col justify-center">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Keep your services running.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-md">
            Easy-to-use monitoring and alerting for your critical services, so you can
            focus on building and improving your product.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15">
              Explore Product
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
        {/* Right container */}
        <div className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-3xl pt-20">
            <img
              src="./computer.png"
              alt="Hero preview"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export function Section2() {
  return (
    <section id="section2" className="bg-f7f9fa px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Section Label
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A simple header for your next section
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Add a short sentence here explaining what this section is about.
          </p>
        </div>

        {/* Two boxes */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="flex h-80 items-center justify-center bg-slate-100 text-slate-400">
              Image 1 goes here
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-900">Box One Title</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a short description for the first box.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="flex h-80 items-center justify-center bg-slate-100 text-slate-400">
              Image 2 goes here
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-900">Box Two Title</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a short description for the second box.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-10 w-10 rounded-xl bg-blue-50" />
              <h3 className="text-lg font-semibold text-slate-900">Feature One</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a short description for the first feature here.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-10 w-10 rounded-xl bg-blue-50" />
              <h3 className="text-lg font-semibold text-slate-900">Feature Two</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a short description for the second feature here.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-10 w-10 rounded-xl bg-blue-50" />
              <h3 className="text-lg font-semibold text-slate-900">Feature Three</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add a short description for the third feature here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
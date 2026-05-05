import { createJobPosting } from "./actions";

export default function NewJobPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Create Job Posting
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Fill out the form below to publish a new position.
        </p>

        <form action={createJobPosting} className="mt-8 flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder="Frontend Engineer"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder="Describe the role..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder={`3+ years of experience\nStrong React knowledge\nExperience with TypeScript`}
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter one requirement per line.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder={`Build product features\nCollaborate with design\nWrite maintainable code`}
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter one responsibility per line.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Preferences
            </label>
            <textarea
              name="preferences"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder={`Startup experience\nExperience with AWS\nInterest in AI tools`}
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter one preference per line.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Job Type
              </label>
              <select
                name="type"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              >
                <option value="FULL">Full-time</option>
                <option value="PART">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Internship</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              >
                <option value="ENTRY">Entry</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                 Role
              </label>
              <select
                name="role"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              >
                <option value="ENGINEERING">Engineering</option>
                <option value="DESIGN">Design</option>
                <option value="PRODUCT">Product</option>
                <option value="DATA">Data</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                name="location"
                type="text"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                placeholder="San Francisco, CA / Remote"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="open"
              name="open"
              type="checkbox"
              defaultChecked
              className="h-4 w-4"
            />
            <label htmlFor="open" className="text-sm text-slate-700">
              Position is open
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
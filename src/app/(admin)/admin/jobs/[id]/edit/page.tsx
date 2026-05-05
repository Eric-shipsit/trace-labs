import { prisma } from "@/src/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../auth";
import { updateJobPosting, deleteJobPosting } from "./actions";
import { DeleteJobButton } from "./DeleteJobButton";

type EditJobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.admin) {
    redirect("/");
  }

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Edit Job</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900">
              {job.title}
            </h1>
          </div>
        </div>

        <form action={updateJobPosting} className="mt-8 flex flex-col gap-6">
          <input type="hidden" name="id" value={job.id} />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>
            <input
              name="title"
              defaultValue={job.title}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={job.description}
              rows={6}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              name="location"
              defaultValue={job.location}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Job Type
              </label>
              <select
                name="type"
                defaultValue={job.type}
                required
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
                defaultValue={job.experienceLevel}
                required
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="ENTRY">Entry</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              name="role"
              defaultValue={job.role}
              required
              className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="ENGINEERING">Engineering</option>
              <option value="DESIGN">Design</option>
              <option value="PRODUCT">Product</option>
              <option value="DATA">Data</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="open"
              name="open"
              type="checkbox"
              defaultChecked={job.open}
              className="h-4 w-4"
            />
            <label htmlFor="open" className="text-sm text-slate-700">
              Position is open
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <a
              href="/admin"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div>
              <h2 className="text-sm font-semibold text-red-800">Danger Zone</h2>
              <p className="mt-1 text-sm text-red-700">
                Deleting this job will permanently remove it.
              </p>
            </div>
            <form action={deleteJobPosting}>
              <input type="hidden" name="id" value={job.id} />
              <DeleteJobButton />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../auth";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { JobManagement } from "./components/JobManagement";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.admin) {
    redirect("/");
  }

  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalJobs = jobs.length;
  const openRoles = jobs.filter((job) => job.open).length;
  const applicantsCount = await prisma.application.count();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <TitleNavbar />
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Admin
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Manage job postings, review applicants, and keep your careers
                page up to date.
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Signed in as{" "}
                <span className="font-medium text-slate-700">
                  {session.user.email}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/career"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                View Careers Page
              </Link>

              <Link
                href="/admin/jobs/new"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                + Create Job Posting
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Jobs</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {totalJobs}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Total job postings in the system
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Applicants</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {applicantsCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Total submitted applications
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Open Roles</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {openRoles}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Roles currently accepting applicants
            </p>
          </div>
        </section>

        <section className="grid gap-6">
          <JobManagement jobs={jobs} />
        </section>
      </div>
    </main>
  );
}
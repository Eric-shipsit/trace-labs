import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../auth";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { JobManagement } from "./components/JobManagement";
import Navbar from "../../components/Navbar";

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
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 mt-15">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Admin
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Signed in as{" "}
                <span className="font-medium text-slate-700">
                  {session.user.email}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/admin/documents"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  Manage Documents
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  View, delete, and update uploaded files.
                </p>
              </Link>

              <Link
                href="/admin/jobs/new"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  Post Job
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Create a new job posting.
                </p>
              </Link>
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
                <p className="text-sm font-semibold text-slate-500">
                  More Tools Coming Soon
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Add analytics, chatbot settings, or user tools here later.
                </p>
              </div>
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
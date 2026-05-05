"use client";

import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Jobs = Awaited<ReturnType<typeof prisma.job.findMany>>;

function formatJobType(type: string) {
  switch (type) {
    case "FULL":
      return "Full-time";
    case "PART":
      return "Part-time";
    case "CONTRACT":
      return "Contract";
    case "INTERN":
      return "Internship";
    default:
      return type;
  }
}

function formatExperienceLevel(level: string) {
  switch (level) {
    case "ENTRY":
      return "Entry";
    case "MID":
      return "Mid";
    case "SENIOR":
      return "Senior";
    default:
      return level;
  }
}

function formatRole(role: string) {
  switch (role) {
    case "ENGINEERING":
      return "Engineering";
    case "DESIGN":
      return "Design";
    case "PRODUCT":
      return "Product";
    case "DATA":
      return "Data";
    case "HR":
      return "HR";
    default:
      return role;
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function JobManagement({ jobs }: { jobs: Jobs }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [experienceFilter, setExperienceFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const matchesSearch =
        normalizedSearch === "" ||
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.location.toLowerCase().includes(normalizedSearch) ||
        job.role.toLowerCase().includes(normalizedSearch) ||
        job.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "OPEN" && job.open) ||
        (statusFilter === "CLOSED" && !job.open);

      const matchesRole = roleFilter === "ALL" || job.role === roleFilter;
      const matchesType = typeFilter === "ALL" || job.type === typeFilter;
      const matchesExperience =
        experienceFilter === "ALL" ||
        job.experienceLevel === experienceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRole &&
        matchesType &&
        matchesExperience
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "OLDEST":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "TITLE_ASC":
          return a.title.localeCompare(b.title);
        case "TITLE_DESC":
          return b.title.localeCompare(a.title);
        case "OPEN_FIRST":
          return Number(b.open) - Number(a.open);
        case "NEWEST":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [
    jobs,
    search,
    statusFilter,
    roleFilter,
    typeFilter,
    experienceFilter,
    sortBy,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter, typeFilter, experienceFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const startCount = filteredJobs.length === 0 ? 0 : (currentPage - 1) * jobsPerPage + 1;
  const endCount = Math.min(currentPage * jobsPerPage, filteredJobs.length);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Job Management
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search, filter, and manage all job postings.
            </p>
          </div>

          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            + New Job
          </Link>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, location, role..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="ALL">All</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="ALL">All</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="DESIGN">Design</option>
              <option value="PRODUCT">Product</option>
              <option value="DATA">Data</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="ALL">All</option>
              <option value="FULL">Full-time</option>
              <option value="PART">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Internship</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Experience
            </label>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="ALL">All</option>
              <option value="ENTRY">Entry</option>
              <option value="MID">Mid</option>
              <option value="SENIOR">Senior</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center text-sm text-slate-500">
            Showing{" "}
            <span className="mx-1 font-semibold text-slate-900">
              {filteredJobs.length === 0 ? 0 : startCount}
            </span>
            -
            <span className="mx-1 font-semibold text-slate-900">
              {endCount}
            </span>
            of{" "}
            <span className="mx-1 font-semibold text-slate-900">
              {filteredJobs.length}
            </span>
            filtered jobs
          </div>

          <div className="sm:justify-self-end">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:min-w-[220px]"
            >
              <option value="NEWEST">Newest first</option>
              <option value="OLDEST">Oldest first</option>
              <option value="TITLE_ASC">Title A–Z</option>
              <option value="TITLE_DESC">Title Z–A</option>
              <option value="OPEN_FIRST">Open roles first</option>
            </select>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <h3 className="text-base font-semibold text-slate-900">
            No matching jobs found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Title
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Experience
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Posted
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="border-b border-slate-100 px-4 py-4 align-top">
                      <div className="min-w-55">
                        <p className="font-medium text-slate-900">{job.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {job.description}
                        </p>
                      </div>
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          job.open
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.open ? "Open" : "Closed"}
                      </span>
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-sm text-slate-700">
                      {formatRole(job.role)}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-sm text-slate-700">
                      {formatJobType(job.type)}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-sm text-slate-700">
                      {formatExperienceLevel(job.experienceLevel)}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-sm text-slate-700">
                      <div className="min-w-35">{job.location}</div>
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-sm text-slate-500">
                      {formatDate(job.createdAt)}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/jobs/${job.id}/view`}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                        </Link>

                        <Link
                          href={`/admin/jobs/${job.id}/edit`}
                          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-900">{currentPage}</span> of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Career = {
  id: number;
  title: string;
  location: string;
  department: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedAt: string;
  summary?: string;
};

export function Postings() {
  const careers: Career[] = [
    {
      id: 1,
      title: "Software Engineer",
      location: "Remote",
      department: "Engineering",
      type: "Full-time",
      postedAt: "2026-04-05",
      summary:
        "Build product features, improve platform reliability, and work closely with design and product teams.",

    },
    {
      id: 2,
      title: "Product Manager",
      location: "San Francisco",
      department: "Product",
      type: "Full-time",
      postedAt: "2026-04-04",
    },
    {
      id: 3,
      title: "Data Scientist",
      location: "New York",
      department: "Data",
      type: "Full-time",
      postedAt: "2026-04-03",
    },
    {
      id: 4,
      title: "Frontend Engineer",
      location: "Remote",
      department: "Engineering",
      type: "Contract",
      postedAt: "2026-04-02",
    },
    {
      id: 5,
      title: "Backend Engineer",
      location: "Seattle",
      department: "Engineering",
      type: "Full-time",
      postedAt: "2026-04-01",
    },
    {
      id: 6,
      title: "Designer",
      location: "Los Angeles",
      department: "Design",
      type: "Full-time",
      postedAt: "2026-03-30",
    },
  ];

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const locations = ["All", ...new Set(careers.map((job) => job.location))];
  const departments = ["All", ...new Set(careers.map((job) => job.department))];
  const types = ["All", ...new Set(careers.map((job) => job.type))];

  const filteredCareers = useMemo(() => {
    return careers
      .filter((job) => {
        const query = search.toLowerCase();

        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query);

        const matchesLocation =
          locationFilter === "All" || job.location === locationFilter;

        const matchesDepartment =
          departmentFilter === "All" || job.department === departmentFilter;

        const matchesType = typeFilter === "All" || job.type === typeFilter;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesDepartment &&
          matchesType
        );
      })
      .sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
  }, [search, locationFilter, departmentFilter, typeFilter]);

  const totalPages = Math.ceil(filteredCareers.length / jobsPerPage);

  const paginatedCareers = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return filteredCareers.slice(startIndex, endIndex);
  }, [filteredCareers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, locationFilter, departmentFilter, typeFilter]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <section className="w-full px-6 py-16 md:px-10 lg:px-16">
  <div className="mx-auto max-w-6xl">
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Careers
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        Open Positions
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Left filter sidebar */}
      <aside className="h-fit border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Filter Jobs</h3>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Right side job list */}
      <div>
        <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">
            {filteredCareers.length} job
            {filteredCareers.length === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="">
          {paginatedCareers.length > 0 ? (
            paginatedCareers.map((job) => (
              <div
                key={job.id}
                className="border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      <Link
                        href={`/career/${job.id}`}
                        className="text-slate-900 transition hover:text-slate-700 hover:underline"
                      >
                        {job.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
                      Posted {job.postedAt}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {job.location} • {job.department} • {job.type}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {job.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
              No jobs match your search or filters.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-4 py-2 text-sm ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 text-slate-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
}
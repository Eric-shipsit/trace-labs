import React from "react";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Find your next opportunity
        </h1>
        <p className="max-w-2xl text-gray-600">
          Trace Labs is a simple job board project built with Next.js, Prisma,
          and Neon. Browse open roles and explore the platform.
        </p>
      </div>

      <div className="flex gap-4">
        <a
          href="/jobs"
          className="rounded-md bg-black px-5 py-3 text-white transition hover:opacity-90"
        >
          View Jobs
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border px-5 py-3 transition hover:bg-gray-50"
        >
          GitHub
        </a>
      </div>

      <div className="grid gap-4 pt-6 md:grid-cols-3">
        <div className="rounded-lg border p-5">
          <h2 className="font-semibold">Real Database</h2>
          <p className="mt-2 text-sm text-gray-600">
            Jobs are stored in Neon and accessed with Prisma.
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="font-semibold">Simple UI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Clean and readable layout for browsing listings.
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="font-semibold">Built with Next.js</h2>
          <p className="mt-2 text-sm text-gray-600">
            App Router structure with room for admin and public pages.
          </p>
        </div>
      </div>
    </section>
  );
}
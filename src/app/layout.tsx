import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Trace Labs",
  description: "A modern job board built with Next.js, Prisma, and Neon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold">
              Trace Labs
            </a>

            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/jobs" className="hover:underline">
                Jobs
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
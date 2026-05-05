"use client";

import Link from "next/link";
export default function Navbar() {
  
  return (
    <nav className={`left-0 top-0 z-50 w-full`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile navbar */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <Link href="/" className="text-lg font-semibold">
            Trace Labs
          </Link>
        </div>

        <div className="mx-auto hidden max-w-350 md:grid md:grid-cols-[25%_50%_25%] md:items-center md:py-4">
          <div className="flex justify-start">
            <Link href="/" className="whitespace-nowrap text-xl font-semibold">
              Trace Labs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
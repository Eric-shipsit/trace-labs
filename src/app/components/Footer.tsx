import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#101012] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Trace Labs</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              Modern monitoring and alerting tools to help teams catch issues
              faster and keep services running smoothly.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Product
            </h4>
            <div className="mt-4 flex flex-col space-y-3 text-sm text-slate-400">
              <Link href="/features" className="transition hover:text-white">
                Features
              </Link>
              <Link href="/demo" className="transition hover:text-white">
                Request Demo
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Company
            </h4>
            <div className="mt-4 flex flex-col space-y-3 text-sm text-slate-400">
              <Link href="/career" className="transition hover:text-white">
                Careers
              </Link>
              <Link href="/who-we-are" className="transition hover:text-white">
                Who We Are
              </Link>
              <Link href="/contact-us" className="transition hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Resources
            </h4>
            <div className="mt-4 flex flex-col space-y-3 text-sm text-slate-400">
              <Link href="/blog" className="transition hover:text-white">
                Blog
              </Link>
              <Link href="/updates" className="transition hover:text-white">
                Product Updates
              </Link>
              <Link href="/support" className="transition hover:text-white">
                Support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Trace Labs. All rights reserved.</p>
            {/* <div className="flex gap-6">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="/security" className="transition hover:text-white">
                Security
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
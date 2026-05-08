"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen">

      {/* Mission Section */}
      <section className="relative overflow-hidden bg-slate-950 px-6 pb-24 lg:px-8">
        <img
          src="/bg1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="relative z-20">
          <Navbar className="text-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              Who We Are
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Building tools that help teams understand and improve reliability.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-200">
              Trace Labs creates software that helps teams monitor application health,
              detect issues early, and make informed decisions with clear, actionable
              data. Our mission is to make reliability easier to understand, manage,
              and improve for modern software teams.
            </p>
          </div>
        </div>
      </section>
      {/* Leadership Section */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Leadership
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Meet the team behind Trace Labs
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Trace Labs is led by people focused on building practical, reliable,
              and easy-to-use tools for software teams.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {/* CEO */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="aspect-[11/14] overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src="/ceo.png"
                  alt="CEO of Trace Labs"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-semibold text-slate-900">Omar Rahman</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Chief Executive Officer
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Omar leads Trace Labs’ company vision, product strategy, and long-term growth.
                  With a background in software systems and startup operations, he focuses on
                  building practical reliability tools that help engineering teams detect issues
                  faster and keep their applications running smoothly.
                </p>
              </div>
            </div>

            {/* VP */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="aspect-[11/14] overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src="/vp.png"
                  alt="VP of Trace Labs"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-semibold text-slate-900">Ryan Chen</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Vice President
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Ryan oversees Trace Labs’ engineering direction, platform architecture, and
                  product development process. He works closely with the team to design reliable,
                  scalable systems for Monitr, ensuring the product remains fast, useful, and
                  easy for developers to adopt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-slate-900"
        style={{
          background:"#101012"
        }}>
          <Footer/>
      </section>
    </main>
  );
}
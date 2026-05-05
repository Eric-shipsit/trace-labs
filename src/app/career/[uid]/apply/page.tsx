import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Navbar from "@/src/app/components/Navbar";
import { Footer } from "@/src/app/components/Footer";
import { ApplicationPage } from "@/src/app/career/components/ApplicationPage";

type ApplyPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { uid } = await params;

  const job = await prisma.job.findFirst({
    where: {
      id: uid,
      open: true,
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      experienceLevel: true,
      type: true,
      role: true,
      responsibilities: true,
      requirements: true,
      preferences: true,
      open: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main style={{ background: "#f7f9fa" }}>
      <Navbar />

      <section className="px-6 py-12 md:px-10 lg:px-16">
        <ApplicationPage job={job} />
      </section>

      <section className="text-slate-900" style={{ background: "#101012" }}>
        <Footer />
      </section>
    </main>
  );
}
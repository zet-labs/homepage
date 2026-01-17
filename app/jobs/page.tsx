import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FooterSkeleton } from "../components/Skeletons";
import JobsPageClient from "./JobsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = t("meta.jobs.title");
  const description = t("meta.jobs.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/jobs",
      type: "website",
      siteName: t("meta.siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function JobsPage() {
  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden bg-[rgb(var(--color-background-start))] flex flex-col">
      <Navigation />
      <JobsPageClient />
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}

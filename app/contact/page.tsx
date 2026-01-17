import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FooterSkeleton } from "../components/Skeletons";
import ContactForm from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = t("meta.contact.title");
  const description = t("meta.contact.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/contact",
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

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden bg-[rgb(var(--color-background-start))] flex flex-col">
      <Navigation />

      <main className="relative z-[4] flex flex-col items-center px-6 max-md:px-4 max-[480px]:px-3 pt-28 pb-20 flex-1">
        <section className="w-full max-w-[980px]">
          <div className="text-center mb-10">
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.1] tracking-[-0.04em] font-[family-name:var(--font-geist-sans)]">
              {t("title")}
            </h1>
            <p className="text-[rgb(var(--color-foreground-soft)/0.85)] text-[clamp(1rem,2.2vw,1.2rem)] max-w-[720px] mx-auto mt-4">
              {t("subtitle")}
            </p>
          </div>

          <ContactForm />

          <div className="mt-6 text-center text-xs text-[rgb(var(--color-foreground-muted)/0.7)]">
            {t("responseTime")}
          </div>
        </section>
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}

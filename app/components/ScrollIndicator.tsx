"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("scrollIndicator");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollDown}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer transition-opacity duration-500 ${visible ? "opacity-70 hover:opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <span className="md:hidden inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-foreground)/0.25)] bg-[rgb(var(--color-foreground)/0.06)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--color-foreground)/0.75)]">
        {t("explore")}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 animate-[scroll-bounce_1.5s_ease-in-out_infinite]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
      <div className="max-md:hidden flex flex-col items-center gap-2">
        <span className="text-[rgb(var(--color-foreground)/0.6)] text-[10px] tracking-[0.2em] uppercase font-medium">
          {t("scroll")}
        </span>
        <div className="w-5 h-8 rounded-full border border-[rgb(var(--color-foreground)/0.4)] flex justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-[rgb(var(--color-foreground)/0.6)] animate-[scroll-bounce_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </button>
  );
}

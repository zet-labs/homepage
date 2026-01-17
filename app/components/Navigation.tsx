"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { key: "services", href: "#services" },
  { key: "models", href: "#models" },
  { key: "contact", href: "/contact" },
  { key: "jobs", href: "/jobs" },
];

export default function Navigation() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuLabel = menuOpen ? t("nav.closeMenu") : t("nav.openMenu");

  const scrollToId = (id: string) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 72;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();

    if (pathname !== "/") {
      router.push(`/${href}`);
      setMenuOpen(false);
      return;
    }

    scrollToId(href.replace("#", ""));
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => setMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[10] transition-all duration-300 border-b ${
        scrolled
          ? "bg-[rgb(var(--color-background-start)/0.45)] backdrop-blur-2xl backdrop-saturate-200 border-[rgb(var(--color-foreground)/0.08)] shadow-[0_12px_40px_rgb(0_0_0/0.25)] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-foreground)/0.2)] to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-70" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-b-2xl bg-[radial-gradient(circle_at_top,rgb(var(--color-foreground)/0.08),transparent_55%)] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="max-w-[1200px] mx-auto px-6 max-md:px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-[rgb(var(--color-foreground))] font-semibold text-lg tracking-tight font-[family-name:var(--font-geist-sans)] flex items-center gap-2"
          prefetch
        >
          <span className="relative inline-flex w-5 h-5 items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[rgb(var(--color-foreground)/0.7)]">
              <polygon
                points="12 2.5 20.5 7.5 20.5 16.5 12 21.5 3.5 16.5 3.5 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <polygon
                points="12 5.5 18 9 18 15 12 18.5 6 15 6 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <rect
                x="19.4"
                y="9.4"
                width="2"
                height="5.2"
                rx="1"
                fill="rgb(var(--color-background-start))"
              />
            </svg>
          </span>
          {t("brandName")}
        </Link>

        <div className="flex items-center gap-6 max-md:gap-3">
          <div className="flex items-center gap-6 max-md:hidden">
            {navItems.map(({ key, href }) =>
              href.startsWith("#") ? (
                <a
                  key={key}
                  href={href}
                  onClick={(event) => handleAnchorClick(event, href)}
                  className="text-[rgb(var(--color-foreground-muted))] hover:text-[rgb(var(--color-foreground))] text-sm transition-colors duration-200"
                >
                  {t(`nav.${key}`)}
                </a>
              ) : (
                <Link
                  key={key}
                  href={href}
                  prefetch
                  onClick={() => setMenuOpen(false)}
                  className="text-[rgb(var(--color-foreground-muted))] hover:text-[rgb(var(--color-foreground))] text-sm transition-colors duration-200"
                >
                  {t(`nav.${key}`)}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-2 max-md:gap-1">
            <a
              href="#waitlist"
              onClick={(event) => {
                event.preventDefault();
                if (pathname !== "/") {
                  router.push("/#waitlist");
                  setMenuOpen(false);
                  return;
                }
                scrollToId("waitlist");
                setTimeout(() => window.dispatchEvent(new Event("open-waitlist")), 250);
                setMenuOpen(false);
              }}
              className="inline-flex items-center justify-center text-sm font-medium px-4 h-8 rounded-full bg-[rgb(var(--color-accent-indigo))] !text-white hover:bg-[rgb(var(--color-accent-purple))] transition-colors duration-200 max-md:text-xs max-md:px-3 max-md:h-7"
              style={{ color: "white" }}
            >
              {t("joinWaitlist")}
            </a>
            <div className="flex items-center gap-1">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              aria-label={menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="hidden max-md:inline-flex items-center justify-center w-8 h-8 rounded-full border border-[rgb(var(--color-foreground)/0.18)] text-[rgb(var(--color-foreground))] hover:border-[rgb(var(--color-foreground)/0.35)] hover:bg-[rgb(var(--color-foreground)/0.06)] transition-colors"
            >
              <span className="sr-only">{menuLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-3 border-t border-[rgb(var(--color-foreground)/0.06)] bg-[rgb(var(--color-background-start)/0.5)] backdrop-blur-2xl shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
          <div className="flex flex-col gap-3">
            {navItems.map(({ key, href }) =>
              href.startsWith("#") ? (
                <a
                  key={key}
                  href={href}
                  onClick={(event) => {
                    handleAnchorClick(event, href);
                  }}
                  className="text-[rgb(var(--color-foreground))] text-sm font-medium px-3 py-2 rounded-xl bg-[rgb(var(--color-surface)/0.3)] border border-[rgb(var(--color-foreground)/0.08)] hover:border-[rgb(var(--color-foreground)/0.2)] transition-colors"
                >
                  {t(`nav.${key}`)}
                </a>
              ) : (
                <Link
                  key={key}
                  href={href}
                  prefetch
                  onClick={() => setMenuOpen(false)}
                  className="text-[rgb(var(--color-foreground))] text-sm font-medium px-3 py-2 rounded-xl bg-[rgb(var(--color-surface)/0.3)] border border-[rgb(var(--color-foreground)/0.08)] hover:border-[rgb(var(--color-foreground)/0.2)] transition-colors"
                >
                  {t(`nav.${key}`)}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

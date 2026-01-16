"use client";

import { useEffect, useState } from "react";

export default function ScrollRevealHandler() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hash = window.location.hash;
    if (!hash) return;

    const timeoutId = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }

      if (hash === "#waitlist") {
        window.dispatchEvent(new Event("open-waitlist"));
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.location.hash) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    if (prefersReducedMotion) {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      for (const el of elements) {
        el.classList.add("revealed");
      }
      return;
    }

    let observer: IntersectionObserver | null = null;

    const timeoutId = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      const elements = document.querySelectorAll(".reveal-on-scroll");
      for (const el of elements) {
        observer.observe(el);
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [hydrated]);

  return null;
}

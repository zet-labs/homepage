"use client";

import { useEffect } from "react";

export default function ScrollRevealHandler() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hash = window.location.hash;
    let hashTimeout: ReturnType<typeof setTimeout> | null = null;

    if (hash) {
      hashTimeout = setTimeout(() => {
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
    } else {
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
      return () => {
        if (hashTimeout) clearTimeout(hashTimeout);
      };
    }

    let observer: IntersectionObserver | null = null;
    const revealTimeout = setTimeout(() => {
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
      if (hashTimeout) clearTimeout(hashTimeout);
      clearTimeout(revealTimeout);
      observer?.disconnect();
    };
  }, []);

  return null;
}

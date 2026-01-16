"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

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
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-500 ${visible ? "opacity-70 hover:opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <span className="text-[rgb(var(--color-foreground)/0.6)] text-[10px] tracking-[0.2em] uppercase font-medium">
        Scroll
      </span>
      <div className="w-5 h-8 rounded-full border border-[rgb(var(--color-foreground)/0.4)] flex justify-center pt-1.5">
        <div className="w-1 h-1.5 rounded-full bg-[rgb(var(--color-foreground)/0.6)] animate-[scroll-bounce_1.5s_ease-in-out_infinite]" />
      </div>
    </button>
  );
}

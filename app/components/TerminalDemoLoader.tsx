"use client";

import dynamic from "next/dynamic";

const TerminalDemo = dynamic(() => import("./TerminalDemo"), {
  loading: () => {
    const containerClasses =
      "w-full max-w-[700px] mx-auto mt-10 max-lg:max-w-[640px] max-md:mt-6 max-md:max-w-[84%] max-[480px]:max-w-[90%]";
    const shellClasses =
      "terminal-shell rounded-2xl overflow-hidden border border-[rgb(var(--color-foreground)/0.12)] bg-[rgb(var(--color-surface)/0.45)] backdrop-blur-3xl shadow-[0_20px_70px_rgb(0_0_0/0.35),inset_0_1px_0_rgb(255_255_255/0.08)] animate-pulse";
    const headerClasses =
      "terminal-header flex items-center gap-2 px-4 py-3 border-b border-[rgb(var(--color-foreground)/0.08)] bg-[linear-gradient(90deg,rgb(var(--color-surface)/0.72),rgb(var(--color-surface)/0.6))]";
    const bodyClasses =
      "terminal-body relative border-t border-[rgb(var(--color-foreground)/0.06)] p-5 h-[280px] max-md:p-3.5 max-md:h-[220px] max-[480px]:h-[200px]";

    return (
      <div className={containerClasses}>
        <div className={shellClasses}>
          <div className={headerClasses}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
              <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
              <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
            </div>
            <span className="text-[rgb(var(--color-foreground-muted)/0.35)] text-[0.78rem] font-mono tracking-[0.04em] ml-2">
              zet
            </span>
          </div>
          <div
            className={bodyClasses}
            style={{
              backgroundImage: "var(--terminal-bg-image)",
              backgroundSize: "var(--terminal-bg-size)",
              backgroundRepeat: "var(--terminal-bg-repeat)",
            }}
          />
        </div>
      </div>
    );
  },
  ssr: false,
});

export default function TerminalDemoLoader() {
  return <TerminalDemo />;
}

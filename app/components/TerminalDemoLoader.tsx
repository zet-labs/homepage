"use client";

import dynamic from "next/dynamic";

const TerminalDemo = dynamic(() => import("./TerminalDemo"), {
  loading: () => (
    <div className="w-full max-w-[820px] mx-auto mt-10 max-lg:max-w-[740px] max-md:mt-8 max-md:max-w-[91%]">
      <div className="rounded-2xl overflow-hidden border border-[rgb(var(--color-foreground)/0.1)] bg-[rgb(var(--color-surface)/0.35)] backdrop-blur-2xl shadow-2xl shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] animate-pulse">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgb(var(--color-foreground)/0.05)] bg-[rgb(var(--color-surface)/0.22)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
            <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
            <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-foreground)/0.1)]" />
          </div>
          <span className="text-[rgb(var(--color-foreground-muted)/0.2)] text-sm font-mono ml-2">
            zet
          </span>
        </div>
        <div className="p-5 h-[290px] max-md:p-4 max-md:h-[250px]" />
      </div>
    </div>
  ),
  ssr: false,
});

export default function TerminalDemoLoader() {
  return <TerminalDemo />;
}

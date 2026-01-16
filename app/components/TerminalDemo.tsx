"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const SCENARIOS = ["docs", "code", "data", "email", "supply", "finance"] as const;

function MacControls() {
  return (
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

function WindowsControls() {
  return (
    <div className="flex gap-2 ml-auto">
      <div className="w-3 h-3 flex items-center justify-center text-[rgb(var(--color-foreground-muted)/0.4)] hover:text-[rgb(var(--color-foreground-muted)/0.7)]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 5h8" />
        </svg>
      </div>
      <div className="w-3 h-3 flex items-center justify-center text-[rgb(var(--color-foreground-muted)/0.4)] hover:text-[rgb(var(--color-foreground-muted)/0.7)]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="1" y="1" width="8" height="8" />
        </svg>
      </div>
      <div className="w-3 h-3 flex items-center justify-center text-[rgb(var(--color-foreground-muted)/0.4)] hover:text-[rgb(var(--color-foreground-muted)/0.7)]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </div>
    </div>
  );
}

export default function TerminalDemo() {
  const t = useTranslations();
  const [stage, setStage] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const scenario = SCENARIOS[scenarioIndex];
  const results = useMemo(
    () => [
      t(`demo.${scenario}.result1`),
      t(`demo.${scenario}.result2`),
      t(`demo.${scenario}.result3`),
    ],
    [scenario, t],
  );

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    const isMacOS = platform.includes("mac") || userAgent.includes("mac");
    setIsMac(isMacOS);
  }, []);

  const runScenario = useCallback(() => {
    setStage(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const promptDelay = 600;
    const thinkingDelay = 1500;
    const resultStart = 2500;
    const resultGap = 700;

    timers.push(setTimeout(() => setStage(1), promptDelay));
    timers.push(setTimeout(() => setStage(2), thinkingDelay));
    results.forEach((_, index) => {
      timers.push(setTimeout(() => setStage(3 + index), resultStart + index * resultGap));
    });
    return timers;
  }, [results]);

  useEffect(() => {
    const timers = runScenario();

    const cycleInterval = setInterval(
      () => {
        setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
      },
      2500 + results.length * 700 + 1500,
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cycleInterval);
    };
  }, [runScenario, results.length]);

  useEffect(() => {
    if (scenarioIndex > 0) {
      const timers = runScenario();
      return () => timers.forEach(clearTimeout);
    }
  }, [scenarioIndex, runScenario]);

  return (
    <div className="w-full max-w-[820px] mx-auto mt-10 max-lg:max-w-[740px] max-md:mt-8 max-md:max-w-[91%]">
      <div className="rounded-2xl overflow-hidden border border-[rgb(var(--color-foreground)/0.1)] bg-[rgb(var(--color-surface)/0.35)] backdrop-blur-2xl shadow-2xl shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgb(var(--color-foreground)/0.05)] bg-[rgb(var(--color-surface)/0.22)]">
          {isMac ? <MacControls /> : <span className="flex-1" />}
          <span
            className={`text-[rgb(var(--color-foreground-muted)/0.4)] text-sm font-mono ${isMac ? "ml-2" : "flex-1 text-center"}`}
          >
            {t("demo.terminalTitle")}
          </span>
          {isMac ? null : <WindowsControls />}
        </div>

        <div className="terminal-fade p-5 font-mono text-[clamp(0.7rem,1.6vw,0.9rem)] space-y-3 h-[290px] max-md:p-4 max-md:h-[250px] overflow-hidden text-left">
          <div className="flex items-start gap-2">
            <span className="text-[rgb(var(--color-accent-indigo))] shrink-0">
              {t("demo.promptSymbol")}
            </span>
            <span
              className={`text-[rgb(var(--color-foreground)/0.9)] ${stage === 0 ? "typing-cursor" : ""}`}
            >
              {stage >= 1 ? t(`demo.${scenario}.prompt`) : ""}
            </span>
          </div>

          <div
            className={`flex items-start gap-2 transition-opacity duration-300 ${stage >= 2 ? "opacity-100" : "opacity-0"}`}
          >
            <span className="text-[rgb(var(--color-accent-purple))] shrink-0">
              {t("demo.thinkingSymbol")}
            </span>
            <span className="text-[rgb(var(--color-foreground-muted)/0.6)] italic">
              {t(`demo.${scenario}.thinking`)}
            </span>
          </div>

          {results.map((result, index) => (
            <div
              key={`${scenario}-result-${index}`}
              className={`flex items-start gap-2 transition-opacity duration-300 ${stage >= 3 + index ? "opacity-100" : "opacity-0"}`}
            >
              <span className="text-[rgb(var(--color-accent-blue))] shrink-0">
                {index === 0 ? t("demo.resultPrimarySymbol") : t("demo.resultSecondarySymbol")}
              </span>
              <span
                className={
                  index === results.length - 1
                    ? "text-emerald-400"
                    : "text-[rgb(var(--color-foreground)/0.85)]"
                }
              >
                {result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

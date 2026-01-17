"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/cn";

const SCENARIOS = ["docs", "code", "data", "email", "supply", "finance"] as const;
const PROMPT_DELAY = 600;
const THINKING_DELAY = 1500;
const RESULT_START = 2500;
const RESULT_GAP = 700;
const SCENARIO_PAUSE = 1500;

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
  const scenarioDuration = useMemo(
    () => RESULT_START + results.length * RESULT_GAP + SCENARIO_PAUSE,
    [results.length],
  );

  const containerClasses =
    "w-full max-w-[700px] mx-auto mt-10 max-lg:max-w-[640px] max-md:mt-6 max-md:max-w-[84%] max-[480px]:max-w-[90%]";
  const shellClasses =
    "terminal-shell rounded-2xl overflow-hidden border border-[rgb(var(--color-foreground)/0.12)] bg-[rgb(var(--color-surface)/0.45)] backdrop-blur-3xl shadow-[0_20px_70px_rgb(0_0_0/0.35),inset_0_1px_0_rgb(255_255_255/0.08)]";
  const headerClasses =
    "terminal-header flex items-center gap-2 px-4 py-3 border-b border-[rgb(var(--color-foreground)/0.08)] bg-[linear-gradient(90deg,rgb(var(--color-surface)/0.72),rgb(var(--color-surface)/0.6))]";
  const headerTitleClasses = cn(
    "text-[rgb(var(--color-foreground-muted)/0.55)] text-[0.78rem] font-mono tracking-[0.04em]",
    isMac ? "ml-2" : "flex-1 text-center",
  );
  const bodyClasses =
    "terminal-body terminal-fade relative border-t border-[rgb(var(--color-foreground)/0.06)] p-5 font-mono text-[clamp(0.66rem,1.4vw,0.85rem)] leading-[1.65] space-y-3 max-[480px]:space-y-2.5 h-[280px] max-md:p-3.5 max-md:h-[220px] max-[480px]:h-[200px] overflow-hidden text-left";

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    const isMacOS = platform.includes("mac") || userAgent.includes("mac");
    setIsMac(isMacOS);
  }, []);

  const runScenario = useCallback(() => {
    setStage(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setStage(1), PROMPT_DELAY));
    timers.push(setTimeout(() => setStage(2), THINKING_DELAY));
    results.forEach((_, index) => {
      timers.push(setTimeout(() => setStage(3 + index), RESULT_START + index * RESULT_GAP));
    });
    return timers;
  }, [results]);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, scenarioDuration);

    return () => {
      clearInterval(cycleInterval);
    };
  }, [scenarioDuration]);

  useEffect(() => {
    const timers = runScenario();
    return () => timers.forEach(clearTimeout);
  }, [scenarioIndex, runScenario]);

  return (
    <div className={containerClasses}>
      <div className={shellClasses}>
        <div className={headerClasses}>
          {isMac ? <MacControls /> : <span className="flex-1" />}
          <span className={headerTitleClasses}>{t("demo.terminalTitle")}</span>
          {isMac ? null : <WindowsControls />}
        </div>

        <div
          className={bodyClasses}
          style={{
            fontFamily:
              'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            backgroundImage: "var(--terminal-bg-image)",
            backgroundSize: "var(--terminal-bg-size)",
            backgroundRepeat: "var(--terminal-bg-repeat)",
          }}
        >
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

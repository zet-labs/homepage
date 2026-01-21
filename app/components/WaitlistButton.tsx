"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useTurnstile } from "../../lib/useTurnstile";

type State = "button" | "input" | "submitted" | "error";

type WaitlistButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  withGlowEffect?: boolean;
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const TURNSTILE_RENDER_OPTIONS = {
  size: "compact",
  appearance: "interaction-only",
  execution: "execute",
} as const;

export default function WaitlistButton({
  variant = "primary",
  size = "lg",
  withGlowEffect = true,
}: WaitlistButtonProps) {
  const t = useTranslations();
  const locale = useLocale();
  const language = locale === "cs" ? "cs" : "en";
  const [state, setState] = useState<State>("button");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const resetTurnstileRef = useRef<() => void>(() => {});
  const formDataRef = useRef<{
    email: string;
    language: "cs" | "en";
    honeypot: string;
    timestamp: number;
  } | null>(null);
  const timestampRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    const input = inputRef.current;
    if (!input) return;
    try {
      input.focus({ preventScroll: true });
    } catch {
      input.focus();
    }
  };

  useEffect(() => {
    if (state === "input" && timestampRef.current === 0) {
      timestampRef.current = Date.now();
    }
  }, [state]);

  const submitForm = useCallback(async (token: string) => {
    const data = formDataRef.current;
    if (!data) return;

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: token,
        }),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      setState("submitted");
    } catch {
      setState("error");
    } finally {
      setSubmitting(false);
      formDataRef.current = null;
      resetTurnstileRef.current();
    }
  }, []);

  const {
    containerRef: turnstileRef,
    failed: turnstileFailed,
    execute: executeTurnstile,
    reset: resetTurnstile,
  } = useTurnstile({
    siteKey: TURNSTILE_SITE_KEY,
    enabled: state === "input",
    renderOptions: TURNSTILE_RENDER_OPTIONS,
    onSuccess: submitForm,
    onError: () => {
      setState("error");
      setSubmitting(false);
      formDataRef.current = null;
    },
  });

  useEffect(() => {
    resetTurnstileRef.current = resetTurnstile;
  }, [resetTurnstile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (turnstileFailed) {
      setState("error");
      return;
    }

    setSubmitting(true);
    formDataRef.current = {
      email,
      language,
      honeypot,
      timestamp: timestampRef.current,
    };

    void executeTurnstile().then((executed) => {
      if (!executed) {
        setSubmitting(false);
        formDataRef.current = null;
        setState("error");
      }
    });
  };

  useEffect(() => {
    if (state === "submitted" || state === "error") {
      const timer = setTimeout(() => {
        setState("button");
        setEmail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  useEffect(() => {
    if (state === "input") {
      focusInput();
    }
  }, [state]);

  useEffect(() => {
    const handleOpen = () => {
      setState("input");
      setTimeout(() => focusInput(), 0);
    };

    window.addEventListener("open-waitlist", handleOpen);
    return () => window.removeEventListener("open-waitlist", handleOpen);
  }, []);

  const messageClass =
    "text-sm font-light text-[rgb(var(--color-foreground-soft)/0.75)] tracking-[0.02em] animate-[fade-in-up_0.6s_ease-out] text-center";

  return (
    <div className="min-h-[5.5rem] flex items-center justify-center">
      {state === "submitted" && <div className={messageClass}>{t("thankYou")}</div>}

      {state === "error" && <div className={messageClass}>{t("error")}</div>}

      {state === "input" && (
        <form
          className="flex gap-3 items-center animate-[fade-in-up_0.4s_ease-out] max-md:flex-col max-md:gap-2"
          onSubmit={handleSubmit}
        >
          <div ref={turnstileRef} className="absolute -left-[9999px] top-0 h-0 w-0" />
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            required
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="max-md:w-full"
            disabled={submitting || !email.trim() || turnstileFailed}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-[rgb(var(--color-foreground)/0.35)] border-t-transparent" />
                {t("submitting")}
              </span>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      )}

      {state === "button" && (
        <Button
          size={size}
          variant={variant}
          withGlowEffect={withGlowEffect}
          onClick={() => setState("input")}
        >
          {t("joinWaitlist")}
        </Button>
      )}
    </div>
  );
}

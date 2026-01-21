"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
        },
      ) => string;
      execute: (container: string | HTMLElement, options?: object) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type FormState = "idle" | "submitting" | "success" | "error";

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, setState] = useState<FormState>("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState(t("reasons.default"));
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const submittingRef = useRef(false);
  const timestampRef = useRef(0);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileFailedRef = useRef(false);
  const formDataRef = useRef<{
    name: string;
    email: string;
    company: string;
    reason: string;
    message: string;
    honeypot: string;
    timestamp: number;
  } | null>(null);
  const reasonOptions = t.raw("reasons.options") as string[];

  useEffect(() => {
    if (timestampRef.current === 0) {
      timestampRef.current = Date.now();
    }
  }, []);

  const submitForm = useCallback(
    async (token: string) => {
      const data = formDataRef.current;
      if (!data) return;

      try {
        const response = await fetch("/api/contact", {
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

        setName("");
        setEmail("");
        setCompany("");
        setReason(t("reasons.default"));
        setMessage("");
        setHoneypot("");
        timestampRef.current = Date.now();
        setState("success");
      } catch {
        setState("error");
      } finally {
        submittingRef.current = false;
        formDataRef.current = null;
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      }
    },
    [t],
  );

  const initTurnstile = useCallback(() => {
    if (
      !window.turnstile ||
      !turnstileRef.current ||
      turnstileWidgetId.current ||
      turnstileFailedRef.current
    ) {
      return;
    }

    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      size: "normal",
      appearance: "interaction-only",
      execution: "execute",
      callback: (token: string) => {
        submitForm(token);
      },
      "error-callback": () => {
        setState("error");
        submittingRef.current = false;
        formDataRef.current = null;
        turnstileFailedRef.current = true;
        setTurnstileReady(false);
        setTurnstileFailed(true);
        if (turnstileWidgetId.current) {
          window.turnstile?.remove(turnstileWidgetId.current);
          turnstileWidgetId.current = null;
        }
      },
      "expired-callback": () => {
        if (turnstileWidgetId.current) {
          window.turnstile?.reset(turnstileWidgetId.current);
        }
      },
    });
    setTurnstileReady(true);

    if (submittingRef.current && formDataRef.current) {
      window.turnstile.execute(turnstileWidgetId.current);
    }
  }, [submitForm]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    if (window.turnstile) {
      initTurnstile();
      return;
    }

    window.onTurnstileLoad = initTurnstile;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
      setTurnstileReady(false);
      setTurnstileFailed(false);
      delete window.onTurnstileLoad;
    };
  }, [initTurnstile]);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const isValid =
    trimmedName.length >= 2 && isValidEmail(trimmedEmail) && trimmedMessage.length >= 10;
  const emailInvalid = Boolean(validationMessage) && !isValidEmail(trimmedEmail);

  const getValidationMessage = () => {
    if (trimmedName.length < 2) return t("validationName");
    if (!isValidEmail(trimmedEmail)) return t("validationEmail");
    if (trimmedMessage.length < 10) return t("validationMessage");
    return t("validationRequired");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "submitting" || submittingRef.current) return;

    if (!isValid) {
      setValidationMessage(getValidationMessage());
      return;
    }

    if (turnstileFailedRef.current) {
      setState("error");
      return;
    }

    setValidationMessage(null);
    setTurnstileFailed(false);
    submittingRef.current = true;
    setState("submitting");

    formDataRef.current = {
      name,
      email,
      company,
      reason,
      message,
      honeypot,
      timestamp: timestampRef.current,
    };

    if (!turnstileWidgetId.current) {
      initTurnstile();
      return;
    }

    window.turnstile?.execute(turnstileWidgetId.current);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-3xl border border-[rgb(var(--color-foreground)/0.08)] bg-[rgb(var(--color-surface)/0.25)] backdrop-blur-2xl p-8 max-md:p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo))] to-transparent opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.25),transparent_70%)] blur-3xl" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
            {t("nameLabel")}
          </label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("namePlaceholder")}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
            {t("emailLabel")}
          </label>
          <Input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setValidationMessage(null);
            }}
            placeholder={t("emailPlaceholder")}
            required
            className={
              emailInvalid
                ? "border-rose-500/60 focus:border-rose-500/70 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.2)]"
                : ""
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
            {t("companyLabel")}
          </label>
          <Input
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              setValidationMessage(null);
            }}
            placeholder={t("companyPlaceholder")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
            {t("reasonLabel")}
          </label>
          <select
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              setValidationMessage(null);
            }}
            className="!px-6 !py-4 text-base font-normal font-[inherit] text-[rgb(var(--color-foreground))] bg-[rgb(var(--color-surface)/0.8)] border border-[rgb(var(--color-foreground-soft)/0.3)] rounded-xl outline-none backdrop-blur-[20px] transition-all duration-300 shadow-[0_4px_20px_rgb(var(--color-accent-indigo)/0.15)] focus:border-[rgb(var(--color-foreground-soft)/0.6)] max-md:w-full"
          >
            {reasonOptions.map((option) => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
          {t("messageLabel")}
        </label>
        <Textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setValidationMessage(null);
          }}
          placeholder={t("messagePlaceholder")}
          rows={6}
          required
        />
      </div>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div ref={turnstileRef} className="mt-4 flex justify-center empty:hidden" />

      <div className="mt-8 flex flex-col md:flex-row items-center md:justify-between gap-4 border-t border-[rgb(var(--color-foreground)/0.08)] px-4 py-5 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))] rounded-2xl">
        <p className="text-xs text-[rgb(var(--color-foreground-muted)/0.7)]">
          {t("privacyNote")}{" "}
          <Link
            href="/privacy"
            prefetch
            className="text-[rgb(var(--color-accent-indigo))] hover:opacity-80"
          >
            {t("privacyLink")}
          </Link>
        </p>
        <div className="flex flex-col items-center md:items-end gap-2">
          <Button
            type="submit"
            size="md"
            withGlowEffect
            disabled={state === "submitting" || turnstileFailed}
          >
            {state === "submitting" ? t("submitting") : t("submit")}
          </Button>
          {state === "submitting" && !turnstileReady && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.7)]">
              {t("verificationLoading")}
            </span>
          )}
        </div>
      </div>

      {validationMessage && (
        <p className="mt-4 text-sm rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
          {validationMessage}
        </p>
      )}
      {state === "success" && (
        <p className="mt-4 text-sm rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200">
          {t("success")}
        </p>
      )}
      {state === "error" && (
        <p className="mt-4 text-sm rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
          {turnstileFailed ? t("verificationError") : t("error")}
        </p>
      )}
    </form>
  );
}

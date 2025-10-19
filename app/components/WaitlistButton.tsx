"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type State = "button" | "input" | "submitted" | "error";

export default function WaitlistButton() {
  const { t } = useTranslation();
  const [state, setState] = useState<State>("button");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const timestampRef = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          honeypot,
          timestamp: timestampRef.current,
        }),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      setState("submitted");
    } catch {
      setState("error");
    }
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
            autoFocus
            required
          />
          <Button type="submit" variant="secondary" size="md" className="max-md:w-full">
            {t("submit")}
          </Button>
        </form>
      )}

      {state === "button" && (
        <Button size="lg" withGlowEffect onClick={() => setState("input")}>
          {t("joinWaitlist")}
        </Button>
      )}
    </div>
  );
}

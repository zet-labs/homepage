"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function WaitlistButton() {
  const { t } = useTranslation();
  const [state, setState] = useState<"button" | "input" | "submitted">("button");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const timestampRef = useRef<number>(Date.now());

  const handleButtonClick = () => {
    setState("input");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          honeypot, // Should be empty
          timestamp: timestampRef.current, // When component mounted
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.error);
        // You might want to show an error message to the user
        return;
      }

      setState("submitted");
    } catch (error) {
      console.error("Failed to submit email:", error);
      // You might want to show an error message to the user
    }
  };

  useEffect(() => {
    if (state === "submitted") {
      const timer = setTimeout(() => {
        setState("button");
        setEmail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="min-h-[5.5rem] flex items-center justify-center">
      {state === "submitted" && (
        <div className="text-sm font-light text-[rgb(var(--color-foreground-soft)/0.75)] tracking-[0.02em] animate-[fade-in-up_0.6s_ease-out] text-center">
          {t("thankYou")}
        </div>
      )}

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
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
            }}
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
        <Button size="lg" withGlowEffect onClick={handleButtonClick}>
          {t("joinWaitlist")}
        </Button>
      )}
    </div>
  );
}

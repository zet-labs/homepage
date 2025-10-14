"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function WaitlistButton() {
  const { t } = useTranslation();
  const [state, setState] = useState<"button" | "input" | "submitted">("button");
  const [email, setEmail] = useState("");

  const handleButtonClick = () => {
    setState("input");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setState("submitted");
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

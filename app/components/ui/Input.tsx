import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
}

export function Input({ variant = "default", className = "", ...props }: InputProps) {
  const baseStyles =
    "!px-6 !py-4 text-base font-normal font-[inherit] text-[rgb(var(--color-foreground))] bg-[rgb(var(--color-overlay)/0.05)] border border-[rgb(var(--color-foreground-soft)/0.3)] rounded-xl outline-none backdrop-blur-[20px] transition-all duration-300 min-w-[280px] shadow-[0_4px_20px_rgb(var(--color-accent-indigo)/0.15)] placeholder:text-[rgb(var(--color-foreground-muted)/0.5)] focus:border-[rgb(var(--color-foreground-soft)/0.6)] focus:shadow-[0_0_0_3px_rgb(var(--color-accent-indigo)/0.1)] max-md:min-w-full max-md:w-full max-[480px]:!px-5 max-[480px]:!py-[0.875rem] max-[480px]:text-[0.9rem]";

  return <input className={`${baseStyles} ${className}`} {...props} />;
}

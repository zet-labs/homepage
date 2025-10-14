import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "text-[rgb(var(--color-foreground-muted)/0.85)] bg-transparent border-transparent",
  success:
    "text-[rgb(var(--color-accent-indigo)/0.85)] bg-[rgb(var(--color-accent-indigo)/0.08)] border-[rgb(var(--color-accent-indigo)/0.2)]",
  info: "text-[rgb(var(--color-accent-blue)/0.85)] bg-[rgb(var(--color-accent-blue)/0.08)] border-[rgb(var(--color-accent-blue)/0.2)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[0.7rem] px-5 py-[0.65rem] max-[480px]:text-[0.7rem] max-[480px]:px-5 max-[480px]:py-[0.65rem]",
  md: "text-xs px-6 py-3 max-[480px]:text-[0.7rem] max-[480px]:px-5 max-[480px]:py-[0.65rem]",
};

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const baseStyles =
    "font-medium leading-[1.4] tracking-[0.15em] uppercase max-w-fit mx-auto my-0 rounded-xl border backdrop-blur-[10px] whitespace-nowrap animate-[fade-in-up_0.6s_ease-out] max-[480px]:whitespace-normal max-[480px]:max-w-[90%]";

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}

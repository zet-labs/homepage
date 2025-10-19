import type { ReactNode } from "react";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  size?: BadgeSize;
  className?: string;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[0.7rem] px-5 py-[0.65rem]",
  md: "text-xs px-6 py-3 md:text-xs max-md:text-[0.75rem] max-[480px]:text-[0.72rem] max-[480px]:px-5 max-[480px]:py-[0.7rem]",
};

export function Badge({ children, size = "md", className = "" }: BadgeProps) {
  return (
    <div
      className={`font-medium leading-[1.4] tracking-[0.15em] uppercase max-w-fit mx-auto rounded-xl border border-transparent backdrop-blur-[10px] whitespace-nowrap animate-[fade-in-up_0.6s_ease-out] max-[480px]:whitespace-normal max-[480px]:max-w-[90%] text-[rgb(var(--color-foreground-muted)/0.85)] ${sizeStyles[size]} ${className}`}
    >
      {children}
    </div>
  );
}

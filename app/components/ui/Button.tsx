import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withGlowEffect?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "shadow-[0_10px_40px_rgb(var(--color-accent-indigo)/0.35),0_0_60px_rgb(var(--color-accent-purple)/0.18),inset_0_1px_0_rgb(var(--color-spotlight-1)/0.15),inset_0_-1px_0_rgb(0_0_0/0.2)] hover:shadow-[0_15px_60px_rgb(var(--color-accent-indigo)/0.45),0_0_80px_rgb(var(--color-accent-purple)/0.28),inset_0_1px_0_rgb(var(--color-spotlight-1)/0.25),inset_0_-1px_0_rgb(0_0_0/0.2)]",
  secondary:
    "shadow-[0_8px_24px_rgb(var(--color-accent-indigo)/0.3),0_0_40px_rgb(var(--color-accent-purple)/0.15)] hover:shadow-[0_12px_32px_rgb(var(--color-accent-indigo)/0.4),0_0_60px_rgb(var(--color-accent-purple)/0.2)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "!px-6 !py-[0.875rem] text-[0.875rem]",
  md: "!px-8 !py-4 text-[0.95rem] max-[480px]:!px-6 max-[480px]:!py-[0.875rem]",
  lg: "!px-16 !py-[1.4rem] text-xl max-md:!px-10 max-md:!py-4 max-md:text-base max-[480px]:!px-8 max-[480px]:!py-[0.875rem] max-[480px]:text-[0.95rem]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  withGlowEffect = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center font-semibold text-[rgb(var(--color-foreground))] bg-[linear-gradient(135deg,rgb(var(--color-accent-indigo)/0.3),rgb(var(--color-accent-purple)/0.3))] hover:bg-[linear-gradient(135deg,rgb(var(--color-accent-indigo)/0.4),rgb(var(--color-accent-purple)/0.4))] border border-[rgb(var(--color-foreground-soft)/0.35)] hover:border-[rgb(var(--color-foreground-soft)/0.5)] rounded-xl cursor-pointer backdrop-blur-[20px] transition-all duration-300 whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0 ${withGlowEffect ? "rounded-[20px] overflow-hidden duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[30px] animate-[fade-in-up_1s_ease-out_0.3s_both,pulse-glow_3s_ease-in-out_infinite] hover:-translate-y-[3px] hover:scale-[1.02]" : ""} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {withGlowEffect && (
        <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-[linear-gradient(90deg,transparent,rgb(var(--color-spotlight-1)/0.2),transparent)] transition-[left] duration-500 group-hover:left-full" />
      )}
      <span className="relative z-[1] tracking-[0.02em]">{children}</span>
    </button>
  );
}

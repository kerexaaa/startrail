// src/components/ui/Button.tsx
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "ghost";
  size?: "icon" | "default";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Button({
  variant = "glass",
  size = "icon",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center rounded cursor-pointer outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    glass:
      "glassmorphism button-hologram-hover border-white active:bg-white/20",
    ghost:
      "text-white/50 hover:text-white hover:bg-white/10 active:bg-white/20",
  };

  const sizeClasses = {
    icon: "p-3",
    default: "px-4 py-2 font-medium",
  };

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}

      {children}
    </button>
  );
}

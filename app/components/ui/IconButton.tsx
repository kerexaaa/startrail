import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export default function IconButton({ icon, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "glassmorphism p-3 button-hologram-hover border-white rounded cursor-pointer active:bg-white/20 outline-none",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

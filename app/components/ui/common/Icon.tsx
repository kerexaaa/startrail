import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { twMerge } from "tailwind-merge";

interface IconProps {
  src: string | StaticImport;
  alt: string;
  size?: number;
  className?: string;
}

export default function Icon({
  src,
  alt,
  size = 24,
  className = "",
}: IconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={twMerge(`select-none pointer-events-none ${className}`)}
    />
  );
}

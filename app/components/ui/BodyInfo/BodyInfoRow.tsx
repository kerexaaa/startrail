export default function BodyInfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-2 pt-2">
      <span className="text-white/50 text-xs lg:text-sm uppercase tracking-wider">
        {label}
      </span>
      <span className="font-mono text-base lg:text-lg  text-right text-white/90">
        {children}
      </span>
    </div>
  );
}

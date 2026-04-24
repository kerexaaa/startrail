export default function BodyInfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2 pt-2">
      <span className="text-white/50">{label}</span>
      <span className="font-mono text-right">{children}</span>
    </div>
  );
}

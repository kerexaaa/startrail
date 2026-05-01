const Keybind = ({
  keys,
  label,
  color = "text-white",
}: {
  keys: string;
  label: string;
  color?: string;
}) => (
  <div className="text-sm text-white/80 flex items-center">
    {keys && (
      <span
        className={`font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs text-center ${color}`}
      >
        {keys}
      </span>
    )}
    {label}
  </div>
);

export default Keybind;
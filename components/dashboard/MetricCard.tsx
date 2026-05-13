interface MetricCardProps {
  label: string;
  value: number;
  highlight?: "danger" | "success" | "default";
}

const highlightStyles = {
  danger: "text-red-500",
  success: "text-emerald-500",
  default: "text-slate-800",
};

export function MetricCard({
  label,
  value,
  highlight = "default",
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl px-7 py-5 shadow-sm border border-slate-100 flex flex-col gap-1 min-w-[140px]">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
        {label}
      </span>
      <span className={`text-4xl font-black tabular-nums ${highlightStyles[highlight]}`}>
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}
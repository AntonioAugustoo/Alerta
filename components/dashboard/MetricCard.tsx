interface MetricCardProps {
  label: string;
  value: number;
  highlight?: "danger" | "success" | "warning" | "default";
}

const highlightStyles: Record<string, string> = {
  danger: "#EF4444",
  success: "#10B981",
  warning: "#FBBF24",
  default: "var(--text-primary)",
};

export function MetricCard({
  label,
  value,
  highlight = "default",
}: MetricCardProps) {
  return (
    <div
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      className="rounded-2xl px-7 py-5 shadow-sm border flex flex-col gap-1 min-w-[140px]"
    >
      <span
        style={{ color: "var(--text-muted)" }}
        className="text-[10px] font-semibold uppercase tracking-[0.15em]"
      >
        {label}
      </span>
      <span
        style={{ color: highlightStyles[highlight] }}
        className="text-4xl font-black tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

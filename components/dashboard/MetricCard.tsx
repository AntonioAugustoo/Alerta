interface MetricCardProps {
  label: string;
  value: number;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  color?: string; // Optional color class name
}

export default function KpiCard({ title, value, subtext, color }: KpiCardProps) {
  const valueColor = color ? color : 'text-azure-600';
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
        {title}
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  );
}
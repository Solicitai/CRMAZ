export default function KpiCard({
  title, value, subtext, color
}: { title: string; value: string | number; subtext?: string; color?: string }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <div className="text-xs uppercase tracking-wide text-gray-500">{title}</div>
      <div className={`text-2xl font-extrabold ${color || 'text-azure-700'}`}>{value}</div>
      {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
    </div>
  );
}

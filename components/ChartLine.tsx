import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartLine({
  title, labels, datasets
}: { title?: string; labels: string[]; datasets: { label: string; data: number[] }[] }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      {title && <div className="font-semibold mb-2">{title}</div>}
      <Line
        data={{
          labels,
          datasets: datasets.map((d, i) => ({
            label: d.label,
            data: d.data,
            borderColor: ['#0ea5e9', '#7dd3fc', '#38bdf8', '#bae6fd'][i % 4],
            backgroundColor: 'rgba(14,165,233,0.1)',
            tension: 0.3,
          })),
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } },
        }}
      />
    </div>
  );
}

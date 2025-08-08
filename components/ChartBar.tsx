import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartBarProps {
  title?: string;
  labels: string[];
  datasets: { label: string; data: number[] }[];
  stacked?: boolean;
}

export default function ChartBar({ title, labels, datasets, stacked = false }: ChartBarProps) {
  const colors = ['#0ea5e9', '#f97316', '#06b6d4', '#f59e0b'];
  const data = {
    labels,
    datasets: datasets.map((ds, idx) => ({
      ...ds,
      backgroundColor: colors[idx % colors.length] + 'aa',
      borderRadius: 4,
    })),
  };
  const options = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: true, labels: { color: '#0f172a', font: { size: 12 } } },
      title: { display: !!title, text: title, color: '#0f172a', font: { size: 14, weight: 'bold' } },
    },
    scales: {
      x: { stacked, ticks: { color: '#4b5563', font: { size: 10 } }, grid: { color: '#e5e7eb' } },
      y: { stacked, beginAtZero: true, ticks: { color: '#4b5563', font: { size: 10 } }, grid: { color: '#e5e7eb' } },
    },
  };
  return <Bar data={data} options={options} />;
}
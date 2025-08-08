import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartLineProps {
  title?: string;
  labels: string[];
  datasets: { label: string; data: number[] }[];
  yLabel?: string;
  secondary?: boolean;
}

export default function ChartLine({ title, labels, datasets, yLabel, secondary = false }: ChartLineProps) {
  // Colors for azure theme and accent
  const colors = ['#0ea5e9', '#f97316', '#06b6d4', '#f59e0b'];
  const data = {
    labels,
    datasets: datasets.map((ds, idx) => ({
      ...ds,
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length] + '33',
      tension: 0.3,
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
      x: { ticks: { color: '#4b5563', font: { size: 10 } }, grid: { color: '#e5e7eb' } },
      y: { ticks: { color: '#4b5563', font: { size: 10 } }, title: { display: !!yLabel, text: yLabel, color: '#4b5563' }, grid: { color: '#e5e7eb' } },
    },
  };
  return <Line data={data} options={options} />;
}
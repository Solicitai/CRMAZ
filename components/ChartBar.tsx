import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartBar({ title, labels, datasets }:{ title?:string; labels:string[]; datasets:{label:string; data:number[]}[] }){
  return (
    <div className="card p-4">
      {title && <div className="font-semibold mb-2">{title}</div>}
      <Bar data={{
          labels,
          datasets: datasets.map((d,i)=>({
            label:d.label,
            data:d.data,
            backgroundColor:['#4f8bff','#ff7a59','#7aa9ff','#c9ddff'][i%4]
          }))
        }}
        options={{responsive:true,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}}/>
    </div>
  );
}

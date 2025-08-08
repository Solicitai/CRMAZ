import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartLine({ title, labels, datasets }:{ title?:string; labels:string[]; datasets:{label:string; data:number[]}[] }){
  return (
    <div className="card p-4">
      {title && <div className="font-semibold mb-2">{title}</div>}
      <Line data={{
          labels,
          datasets: datasets.map((d,i)=>({
            label:d.label,
            data:d.data,
            borderColor:['#4f8bff','#7aa9ff','#a4c6ff','#c9ddff'][i%4],
            backgroundColor:'rgba(79,139,255,0.12)',
            tension:.35
          }))
        }}
        options={{responsive:true,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}}/>
    </div>
  );
}

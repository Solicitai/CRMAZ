import Head from 'next/head';
import Layout from '@/components/Layout';
import ChartBar from '@/components/ChartBar';
import { autos, funnel, lastDays } from '@/lib/mock';

export default function Results() {
  const labels = lastDays;
  const datasets30 = autos.map((a)=>({ label:a.name, data: labels.map(()=> Math.floor(a.revenue30d/labels.length)) }));

  return (
    <>
      <Head><title>CRM Recompra — Resultados</title></Head>
      <Layout>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ChartBar title="Resultados (30d) — Receita por automação" labels={labels} datasets={datasets30} />
          </div>
          <div>
            <ChartBar title="Funil por canal" labels={['Enviados','Entregues','Cliques','Conversões']}
              datasets={funnel.map(f => ({ label: f.label, data: [f.sent, f.delivered, f.clicks, f.conversions] }))} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-0 overflow-hidden mt-6">
          <div className="p-3 font-semibold">Relatório</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-azure-50">
                <th className="p-3">Automação</th><th>Enviados</th><th>Entregues</th><th>Cliques</th><th>Conversões</th><th>Receita</th><th>ROI</th>
              </tr>
            </thead>
            <tbody>
              {autos.map(a=>(
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.name}</td>
                  <td>{Math.floor(400+Math.random()*2400)}</td>
                  <td>{Math.floor(380+Math.random()*2300)}</td>
                  <td>{Math.floor(120+Math.random()*820)}</td>
                  <td>{Math.floor(20+Math.random()*160)}</td>
                  <td>{a.revenue30d.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                  <td>{a.roi.toFixed(1)}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}

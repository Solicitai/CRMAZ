import Head from 'next/head';
import Layout from '@/components/Layout';
import ChartBar from '@/components/ChartBar';
import { lastDays } from '@/lib/mock';

export default function Results(){
  const labels = lastDays;
  const datasets = [
    { label:'Winback', data: labels.map(()=>Math.floor(200+Math.random()*400))},
    { label:'Carrinho', data: labels.map(()=>Math.floor(100+Math.random()*250))},
    { label:'Reposição', data: labels.map(()=>Math.floor(80+Math.random()*200))},
  ];
  return (
    <>
      <Head><title>Resultados • CRM</title></Head>
      <Layout>
        <div className="grid md:grid-cols-2 gap-4">
          <ChartBar title="Receita por automação (30d)" labels={labels} datasets={datasets} />
          <ChartBar title="Cliques por automação (30d)" labels={labels} datasets={datasets.map(d=>({...d, data:d.data.map(n=>Math.floor(n/3))}))} />
        </div>
      </Layout>
    </>
  );
}

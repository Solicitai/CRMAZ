import Head from 'next/head';
import Layout from '@/components/Layout';
import KpiCard from '@/components/KpiCard';
import ChartLine from '@/components/ChartLine';

export default function Home() {
  const labels = Array.from({ length: 14 }, (_, i) => `D-${13 - i}`);
  const datasets = [
    { label: 'Receita', data: labels.map(() => Math.floor(2000 + Math.random() * 8000)) },
  ];

  return (
    <>
      <Head><title>CRM Recompra — Início</title></Head>
      <Layout>
        <div className="grid grid-cols-3 gap-4">
          <KpiCard title="Automações ativas" value={3} />
          <KpiCard title="Receita (30d)" value="R$ 37.800" />
          <KpiCard title="ROI médio (30d)" value="4,2×" />
        </div>

        <div className="mt-6">
          <ChartLine title="Receita diária (14d)" labels={labels} datasets={datasets} />
        </div>
      </Layout>
    </>
  );
}

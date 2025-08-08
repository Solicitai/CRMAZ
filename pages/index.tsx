import Head from 'next/head';
import Layout from '@/components/Layout';
import KpiCard from '@/components/KpiCard';
import ChartLine from '@/components/ChartLine';
import { kpi, lastDays, seriesReceita } from '@/lib/mock';

export default function Home() {
  return (
    <>
      <Head><title>CRM Recompra — Início</title></Head>
      <Layout>
        <div className="grid grid-cols-3 gap-4">
          <KpiCard title="Automações ativas" value={kpi.activeAutomations} />
          <KpiCard title="Receita (30d)" value={kpi.revenue30d.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} />
          <KpiCard title="ROI médio (30d)" value={`${kpi.roiAvg30d}×`} />
        </div>
        <div className="mt-6">
          <ChartLine title="Receita diária (14d)" labels={lastDays} datasets={seriesReceita} />
        </div>
      </Layout>
    </>
  );
}

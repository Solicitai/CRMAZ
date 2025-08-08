import Head from 'next/head';
import Layout from '@/components/Layout';
import ChartLine from '@/components/ChartLine';
import { kpi, lastDays, seriesReceita } from '@/lib/mock';

export default function Home(){
  return (
    <>
      <Head><title>Indicadores • CRM</title></Head>
      <Layout>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-sm text-slate">Automações ativas</div>
            <div className="text-3xl font-extrabold text-azure-800">{kpi.activeAutomations}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate">Receita (30d)</div>
            <div className="text-3xl font-extrabold text-azure-800">{kpi.revenue30d.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-slate">ROI médio (30d)</div>
            <div className="text-3xl font-extrabold text-azure-800">{kpi.roiAvg30d}×</div>
          </div>
        </div>
        <div className="mt-6">
          <ChartLine title="Receita diária (30d)" labels={lastDays} datasets={seriesReceita} />
        </div>
      </Layout>
    </>
  );
}

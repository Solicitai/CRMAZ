import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Audiences(){
  return (
    <>
      <Head><title>Audiências • CRM</title></Head>
      <Layout>
        <div className="card p-4">
          <div className="font-semibold">Audiências (mock)</div>
          <div className="text-slate mt-2">Defina públicos com linguagem simples; o back-end resolve a segmentação.</div>
        </div>
      </Layout>
    </>
  );
}

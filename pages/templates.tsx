import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Templates(){
  return (
    <>
      <Head><title>Mensagens • CRM</title></Head>
      <Layout>
        <div className="card p-4">
          <div className="font-semibold">Modelos de mensagem (mock)</div>
          <div className="text-slate mt-2">Em produção, esta tela lista e permite editar templates de WhatsApp/E‑mail.</div>
        </div>
      </Layout>
    </>
  );
}

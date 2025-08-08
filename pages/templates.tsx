import Head from 'next/head';
import Layout from '@/components/Layout';
import { waTpl, emTpl } from '@/lib/mock';

export default function Templates() {
  return (
    <>
      <Head><title>CRM Recompra — Mensagens</title></Head>
      <Layout>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Mensagens</h2>
            <div className="text-sm text-gray-600">Modelos prontos para WhatsApp e E-mail</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-0 overflow-hidden">
            <div className="p-3 font-semibold">WhatsApp</div>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 bg-azure-50"><th className="p-3">Nome</th><th>Corpo</th><th>CTA</th><th className="p-3">Ações</th></tr></thead>
              <tbody>
                {waTpl.map(t=>(
                  <tr key={t.id} className="border-t">
                    <td className="p-3">{t.name}</td>
                    <td className="text-gray-600">{t.body}</td>
                    <td>{t.cta}</td>
                    <td className="p-3"><a href="/automations" className="text-azure-700 underline">Usar no Builder</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-0 overflow-hidden">
            <div className="p-3 font-semibold">E-mail</div>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 bg-azure-50"><th className="p-3">Nome</th><th>Assunto</th><th>Preheader</th><th className="p-3">Ações</th></tr></thead>
            <tbody>
              {emTpl.map(t=>(
                <tr key={t.id} className="border-t">
                  <td className="p-3">{t.name}</td>
                  <td>{t.subj}</td>
                  <td className="text-gray-600">{t.pre}</td>
                  <td className="p-3"><a href="/automations" className="text-azure-700 underline">Usar no Builder</a></td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}

import Head from 'next/head';
import Layout from '@/components/Layout';
import { audiences as baseAud } from '@/lib/mock';
import { useState } from 'react';

export default function Audiences() {
  const [list, setList] = useState(baseAud);
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState('Nova audiência');
  const [type, setType] = useState<'Automática diária'|'Fixa (snapshot)'>('Automática diária');
  const [desc, setDesc] = useState('Clientes que estão há 60 a 120 dias sem comprar e aceitam WhatsApp.');

  const save = () => {
    const n = { id:'aud'+(list.length+1), name, type, desc, size: Math.floor(300+Math.random()*3000), updated: 'Agora' } as any;
    setList([...list, n]);
    setShowNew(false);
  };

  return (
    <>
      <Head><title>CRM Recompra — Audiências</title></Head>
      <Layout>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Audiências</h2>
            <div className="text-sm text-gray-600">Escolha pela descrição — o back-end cria/atualiza a lista.</div>
          </div>
          <button className="px-3 py-2 rounded text-white" style={{background:'linear-gradient(90deg,#0ea5e9,#ff7a59)'}} onClick={()=>setShowNew(true)}>+ Nova audiência</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-azure-50">
                <th className="p-3">Nome</th><th>Descrição</th><th>Tipo</th><th>Tamanho est.</th><th>Atualização</th><th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a:any)=>(
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.name}</td>
                  <td className="text-gray-600">{a.desc}</td>
                  <td>{a.type}</td>
                  <td>{a.size}</td>
                  <td>{a.updated}</td>
                  <td className="p-3"><a href="/automations" className="text-azure-700 underline">Usar no Builder</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showNew && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-4">
            <div className="font-semibold mb-2">Nova audiência</div>
            <div className="grid grid-cols-2 gap-3">
              <input className="p-2 border rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" />
              <select className="p-2 border rounded" value={type} onChange={e=>setType(e.target.value as any)}>
                <option>Automática diária</option><option>Fixa (snapshot)</option>
              </select>
            </div>
            <textarea className="mt-3 w-full p-2 border rounded" rows={3} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição em palavras" />
            <div className="flex gap-2 justify-end mt-3">
              <button className="px-3 py-2 rounded border" onClick={()=>setShowNew(false)}>Cancelar</button>
              <button className="px-3 py-2 rounded text-white" style={{background:'linear-gradient(90deg,#0ea5e9,#ff7a59)'}} onClick={save}>Salvar</button>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

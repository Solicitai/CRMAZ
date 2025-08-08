import Head from 'next/head';
import Layout from '@/components/Layout';
import { carts } from '@/lib/mock';
import { useMemo, useState } from 'react';

export default function Carts(){
  const [q,setQ] = useState('');
  const [src,setSrc] = useState<'Todos'|'Shopify'|'Yampi'>('Todos');
  const [status,setStatus] = useState<'Todos'|'abandonado'|'recuperado'>('Todos');

  const rows = useMemo(()=>carts.filter(c => 
    (src==='Todos' || c.source===src) &&
    (status==='Todos' || c.status===status) &&
    (q==='' || c.id.includes(q) || c.customer.toLowerCase().includes(q.toLowerCase()) || c.email.includes(q))
  ),[q,src,status]);

  const recovered = rows.filter(r=>r.status==='recuperado').length;
  const totalValue = rows.reduce((s,r)=>s+r.value,0);

  return (
    <>
      <Head><title>Carrinhos • CRM</title></Head>
      <Layout>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="card p-4"><div className="text-sm text-slate">Carrinhos</div><div className="text-3xl font-extrabold text-azure-800">{rows.length}</div></div>
          <div className="card p-4"><div className="text-sm text-slate">Recuperados</div><div className="text-3xl font-extrabold text-azure-800">{recovered}</div></div>
          <div className="card p-4"><div className="text-sm text-slate">Valor potencial</div><div className="text-3xl font-extrabold text-azure-800">{totalValue.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div></div>
        </div>

        <div className="card p-4">
          <div className="flex flex-wrap gap-3">
            <input className="input max-w-xs" placeholder="Buscar por ID, cliente ou e-mail" value={q} onChange={e=>setQ(e.target.value)} />
            <select className="select" value={src} onChange={e=>setSrc(e.target.value as any)}>
              <option>Todos</option><option>Shopify</option><option>Yampi</option>
            </select>
            <select className="select" value={status} onChange={e=>setStatus(e.target.value as any)}>
              <option>Todos</option><option value="abandonado">Abandonado</option><option value="recuperado">Recuperado</option>
            </select>
          </div>

          <div className="overflow-auto mt-4">
            <table className="table">
              <thead>
                <tr><th>ID</th><th>Início</th><th>Cliente</th><th>E-mail</th><th>Itens</th><th>Valor</th><th>Status</th><th>Origem</th></tr>
              </thead>
              <tbody>
                {rows.map(c=>(
                  <tr key={c.id}>
                    <td className="font-mono">{c.id}</td>
                    <td>{c.started}</td>
                    <td>{c.customer}</td>
                    <td className="text-slate">{c.email}</td>
                    <td>{c.items}</td>
                    <td>{c.value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                    <td><span className={`badge ${c.status==='recuperado'?'badge-green':'badge-amber'}`}>{c.status}</span></td>
                    <td>{c.source}</td>
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

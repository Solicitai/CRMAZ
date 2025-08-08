import Head from 'next/head';
import Layout from '@/components/Layout';
import { orders } from '@/lib/mock';
import { useMemo, useState } from 'react';

export default function Orders(){
  const [q,setQ] = useState('');
  const [src,setSrc] = useState<'Todos'|'Shopify'|'Yampi'>('Todos');
  const [status,setStatus] = useState<'Todos'|'pago'|'pendente'|'cancelado'>('Todos');

  const rows = useMemo(()=>orders.filter(o => 
    (src==='Todos' || o.source===src) &&
    (status==='Todos' || o.status===status) &&
    (q==='' || o.id.includes(q) || o.customer.toLowerCase().includes(q.toLowerCase()) || o.email.includes(q))
  ),[q,src,status]);

  return (
    <>
      <Head><title>Pedidos • CRM</title></Head>
      <Layout>
        <div className="card p-4">
          <div className="flex flex-wrap gap-3">
            <input className="input max-w-xs" placeholder="Buscar por ID, cliente ou e-mail" value={q} onChange={e=>setQ(e.target.value)} />
            <select className="select" value={src} onChange={e=>setSrc(e.target.value as any)}>
              <option>Todos</option><option>Shopify</option><option>Yampi</option>
            </select>
            <select className="select" value={status} onChange={e=>setStatus(e.target.value as any)}>
              <option>Todos</option><option value="pago">Pago</option><option value="pendente">Pendente</option><option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="overflow-auto mt-4">
            <table className="table">
              <thead>
                <tr><th>ID</th><th>Data</th><th>Cliente</th><th>E-mail</th><th>Total</th><th>Status</th><th>Origem</th></tr>
              </thead>
              <tbody>
                {rows.map(o=>(
                  <tr key={o.id}>
                    <td className="font-mono">{o.id}</td>
                    <td>{o.date}</td>
                    <td>{o.customer}</td>
                    <td className="text-slate">{o.email}</td>
                    <td>{o.total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                    <td><span className={`badge ${o.status==='pago'?'badge-green':o.status==='pendente'?'badge-amber':'badge-red'}`}>{o.status}</span></td>
                    <td>{o.source}</td>
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

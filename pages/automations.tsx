import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Automations(){
  const [step,setStep] = useState(1);
  const [goal,setGoal] = useState('winback');
  const [name,setName] = useState('Winback 60/90/120');
  const [audType,setAudType] = useState('risk');
  const [audRefresh,setAudRefresh] = useState('Atualizada automaticamente todos os dias');
  const [waText,setWaText] = useState('Oi {{first_name}}! Sentimos sua falta 😄 Volte com {{coupon}} válido por 72h.');
  const [waLink,setWaLink] = useState('https://sualoja.com/oferta');
  const [emSubj,setEmSubj] = useState('Temos um presente pra você, {{first_name}} 🎁');
  const [emPre,setEmPre] = useState('Cupom {{coupon}} ativo por 72h');
  const [emBody,setEmBody] = useState('<p>Oi {{first_name}}, sentimos sua falta!</p>');
  const [emLink,setEmLink] = useState('https://sualoja.com/oferta');
  const [touches,setTouches] = useState('3 toques');

  const next=()=>setStep(s=>Math.min(5,s+1));
  const prev=()=>setStep(s=>Math.max(1,s-1));
  const publish=()=>{ alert('Automação publicada (mock)!'); setStep(1); };

  return (
    <>
      <Head><title>Automações • CRM</title></Head>
      <Layout>
        <div className="flex items-center gap-2 mb-4">
          {['1. Objetivo','2. Público','3. Mensagens','4. Agenda','5. Revisar'].map((s,i)=>(
            <div key={s} className={`px-3 py-1 rounded-full border ${step===i+1?'bg-azure-50 border-azure-200 text-azure-800':'bg-white border-gray-200 text-slate'}`}>{s}</div>
          ))}
        </div>

        {step===1 && (
          <div className="card p-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Objetivo</label>
              <select value={goal} onChange={e=>setGoal(e.target.value)} className="select mt-1">
                <option value="winback">Winback (60/90/120 dias)</option>
                <option value="restock">Reposição (ciclo)</option>
                <option value="cart">Carrinho abandonado</option>
                <option value="post">Pós-compra</option>
              </select>
              <label className="text-sm font-semibold mt-3">Nome da automação</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="input mt-1" />
              <label className="text-sm font-semibold mt-3">Toques (para carrinho)</label>
              <select value={touches} onChange={e=>setTouches(e.target.value)} className="select mt-1">
                <option>1 toque</option><option>2 toques</option><option>3 toques</option>
              </select>
            </div>
            <div>
              <div className="text-sm font-semibold">Como funciona</div>
              <div className="mt-1 p-3 rounded-xl border bg-azure-50 text-azure-900">
                {goal==='winback' && 'Todos os dias buscamos quem completou 60/90/120 dias sem comprar e disparamos WA/E-mail com oferta.'}
                {goal==='restock' && 'Clientes no período de reposição (categoria de ciclo).'} 
                {goal==='cart' && 'Após abandono de carrinho, enviamos 1–3 toques sequenciais para recuperar a venda.'}
                {goal==='post' && 'Mensagens pós-compra (agradecimento, NPS e cross-sell).'} 
              </div>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="card p-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Público (sem SQL)</label>
              <select value={audType} onChange={e=>setAudType(e.target.value)} className="select mt-1">
                <option value="risk">Em risco (60–120d)</option>
                <option value="one">Comprou 1x</option>
                <option value="vip">VIP top 10%</option>
                <option value="restock">Reposição por categoria</option>
                <option value="cart">Carrinho 24h</option>
              </select>
              <label className="text-sm font-semibold mt-3">Atualização da lista</label>
              <select value={audRefresh} onChange={e=>setAudRefresh(e.target.value)} className="select mt-1">
                <option>Atualizada automaticamente todos os dias</option>
                <option>Fixa (snapshot hoje)</option>
              </select>
            </div>
            <div>
              <div className="text-sm font-semibold">Estimativa</div>
              <div className="mt-1 p-3 rounded-xl border">
                Público estimado: {Math.floor(900+Math.random()*2000).toLocaleString('pt-BR')}<br/>
                Tipo: {audRefresh}<br/>
                Descrição: {audType}
              </div>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="card p-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">WhatsApp — texto</label>
              <textarea value={waText} onChange={e=>setWaText(e.target.value)} className="input h-28" />
              <div className="text-xs text-slate mt-1">{'Use variáveis: {{first_name}}, {{coupon}}'}</div>
              <label className="text-sm font-semibold mt-3">Link (CTA)</label>
              <input value={waLink} onChange={e=>setWaLink(e.target.value)} className="input" />
            </div>
            <div>
              <label className="text-sm font-semibold">E-mail — assunto</label>
              <input value={emSubj} onChange={e=>setEmSubj(e.target.value)} className="input" />
              <label className="text-sm font-semibold mt-3">Preheader</label>
              <input value={emPre} onChange={e=>setEmPre(e.target.value)} className="input" />
              <label className="text-sm font-semibold mt-3">Corpo (HTML simples)</label>
              <textarea value={emBody} onChange={e=>setEmBody(e.target.value)} className="input h-28" />
              <label className="text-sm font-semibold mt-3">Link (CTA)</label>
              <input value={emLink} onChange={e=>setEmLink(e.target.value)} className="input" />
            </div>
          </div>
        )}

        {step===4 && (
          <div className="card p-4">
            <div className="text-sm font-semibold">Regras de envio</div>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              <select className="select"><option>Qualquer horário</option><option>Horário comercial</option></select>
              <select className="select"><option>Máx. 2 msg/semana por canal</option><option>Máx. 1 por semana</option></select>
              <select className="select"><option>Consentimento WA obrigatório</option><option>Permitir e-mail sem opt-in</option></select>
            </div>
          </div>
        )}

        {step===5 && (
          <div className="card p-4">
            <div className="font-semibold">Revisão</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm bg-azure-50 border border-azure-200 rounded-xl p-3">
{`Nome: ${name}
Público: ${audType} • ${audRefresh}
Canais: WhatsApp + Email
WA: ${waText.slice(0,120)}... • Link: ${waLink}
Email: ${emSubj} / ${emPre} • Link: ${emLink}
Toques: ${touches}`}
            </pre>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          {step>1 && <button className="btn btn-ghost" onClick={prev}>Voltar</button>}
          {step<5 && <button className="btn btn-primary" onClick={next}>Continuar</button>}
          {step===5 && <button className="btn btn-primary" onClick={publish}>Publicar</button>}
        </div>
      </Layout>
    </>
  );
}

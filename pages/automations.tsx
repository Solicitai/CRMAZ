import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

const triggers = [
  { id: 'winback', label: 'Winback (60/90/120 dias)', explain: 'Todos os dias, encontramos clientes que completam 60, 90 ou 120 dias sem comprar e enviamos WhatsApp/E-mail com oferta.' },
  { id: 'restock', label: 'Reposição (categoria com ciclo)', explain: 'Quem comprou uma categoria com ciclo (ex.: protetor) e está no período de reposição.' },
  { id: 'cart', label: 'Carrinho abandonado (1–3 toques)', explain: 'Após abandono de carrinho, 1 a 3 toques para recuperar a compra.' },
  { id: 'post', label: 'Pós-compra (D+X)', explain: 'Após a compra, mensagens de agradecimento/NPS/cross-sell.' },
];

const audOptions = [
  { id: 'risk', label: 'Em risco (60–120d sem comprar)' },
  { id: 'one', label: 'Comprou apenas 1 vez' },
  { id: 'vip', label: 'VIP (top 10% LTV)' },
  { id: 'restock', label: 'Reposição por categoria' },
  { id: 'cart', label: 'Carrinho abandonado (24h)' },
];

export default function Automations() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('winback');
  const [name, setName] = useState('Winback 60/90/120');
  const [active, setActive] = useState('Sim');
  const [evalFreq, setEvalFreq] = useState('Diária');
  const [audType, setAudType] = useState('risk');
  const [audRefresh, setAudRefresh] = useState('Atualizada automaticamente todos os dias');
  const [exclude, setExclude] = useState('');
  const [waText, setWaText] = useState('Oi {{first_name}}! Sentimos sua falta 😄 Volte com {{coupon}} válido por 72h.');
  const [waLink, setWaLink] = useState('https://sualoja.com/oferta');
  const [emSubj, setEmSubj] = useState('Temos um presente pra você, {{first_name}} 🎁');
  const [emPre, setEmPre] = useState('Cupom {{coupon}} ativo por 72h');
  const [emBody, setEmBody] = useState('<p>Oi {{first_name}}, sentimos sua falta!</p>');
  const [emLink, setEmLink] = useState('https://sualoja.com/oferta');
  const [windowSend, setWindowSend] = useState('Qualquer horário');
  const [cap, setCap] = useState('Máx. 2 mensagens/semana por canal');
  const [touches, setTouches] = useState('3 toques');
  const [ppl, setPpl] = useState(1200);
  const [aov, setAov] = useState(180);
  const [conv, setConv] = useState(7);
  const [cpc, setCpc] = useState(0.06);

  const revenue = Math.round(ppl * (conv / 100) * aov);
  const cost = Math.round(ppl * cpc * (goal === 'cart' ? (touches.startsWith('1') ? 1 : touches.startsWith('2') ? 2 : 3) : 1));
  const roi = (revenue / Math.max(1, cost)).toFixed(1) + '×';
  const explain = triggers.find(t => t.id === goal)?.explain || '';

  const next = () => setStep(s => Math.min(5, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));
  const publish = () => { alert('Automação publicada (mock). O back-end cuidará do público e do envio.'); setStep(1); };

  return (
    <>
      <Head><title>CRM Recompra — Automações</title></Head>
      <Layout>
        <div className="flex items-center gap-2 mb-4">
          {['1. Objetivo','2. Público','3. Mensagens','4. Agenda','5. Revisar'].map((s,i)=>(
            <div key={s} className={`px-3 py-1 rounded-full border ${step===i+1?'bg-azure-50 border-azure-200 text-azure-800':'bg-white border-gray-200 text-gray-700'}`}>{s}</div>
          ))}
        </div>

        {step===1 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Objetivo</label>
              <select value={goal} onChange={e=>setGoal(e.target.value)} className="mt-1 w-full p-2 border rounded-md focus:border-azure-400 focus:ring-azure-400">
                {triggers.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <label className="block text-sm font-semibold mt-4">Nome da automação</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full p-2 border rounded-md focus:border-azure-400 focus:ring-azure-400" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold">Ativar ao publicar?</label>
                  <select value={active} onChange={e=>setActive(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                    <option>Sim</option><option>Não</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold">Frequência de verificação</label>
                  <select value={evalFreq} onChange={e=>setEvalFreq(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                    <option>Diária</option><option>De hora em hora</option><option>Semanal</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold">Como funciona</label>
              <div className="mt-1 p-3 border rounded-md bg-azure-50 border-azure-200 text-azure-900 text-sm">{explain}</div>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Público (sem SQL)</label>
              <select value={audType} onChange={e=>setAudType(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                {audOptions.map(a=><option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
              <label className="block text-sm font-semibold mt-4">Atualização da lista</label>
              <select value={audRefresh} onChange={e=>setAudRefresh(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                <option>Atualizada automaticamente todos os dias</option>
                <option>Fixa (snapshot hoje)</option>
              </select>
              <label className="block text-sm font-semibold mt-4">Excluir (opcional)</label>
              <input value={exclude} onChange={e=>setExclude(e.target.value)} placeholder="Ex.: quem comprou nos últimos 7 dias" className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-semibold">Estimativa do público</label>
              <div className="mt-1 p-3 border rounded-md bg-white text-sm">
                Público: {Math.floor(800 + Math.random()*2400).toLocaleString('pt-BR')} pessoas<br />
                Tipo: {audRefresh}<br />
                Descrição: {audOptions.find(a=>a.id===audType)?.label}{exclude ? ` • Exclui: ${exclude}`:''}
              </div>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">WhatsApp — texto</label>
              <textarea value={waText} onChange={e=>setWaText(e.target.value)} className="mt-1 w-full p-2 border rounded-md h-24 focus:border-azure-400 focus:ring-azure-400" />
              <div className="text-xs text-gray-500 mt-1">{'Use variáveis: {{first_name}}, {{coupon}}'}</div>
              <label className="block text-sm font-semibold mt-3">Link (CTA)</label>
              <input value={waLink} onChange={e=>setWaLink(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
              <div className="mt-2 text-sm"><span className="font-semibold">Prévia:</span>{' '} {waText} {' '}— Link: {waLink}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold">E-mail — assunto</label>
              <input value={emSubj} onChange={e=>setEmSubj(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
              <label className="block text-sm font-semibold mt-3">Preheader</label>
              <input value={emPre} onChange={e=>setEmPre(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
              <label className="block text-sm font-semibold mt-3">Corpo (HTML simples)</label>
              <textarea value={emBody} onChange={e=>setEmBody(e.target.value)} className="mt-1 w-full p-2 border rounded-md h-24" />
              <label className="block text-sm font-semibold mt-3">Link (CTA)</label>
              <input value={emLink} onChange={e=>setEmLink(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
              <div className="mt-2 text-sm"><span className="font-semibold">Prévia:</span>{' '} Assunto: {emSubj} • Preheader: {emPre} — Link: {emLink}</div>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Janela de envio</label>
              <select value={windowSend} onChange={e=>setWindowSend(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                <option>Qualquer horário</option><option>Somente horário comercial</option>
              </select>
              <label className="block text-sm font-semibold mt-3">Frequência por pessoa</label>
              <select value={cap} onChange={e=>setCap(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                <option>Máx. 2 mensagens/semana por canal</option><option>Máx. 1 por semana</option>
              </select>
              <label className="block text-sm font-semibold mt-3">Toques (ex.: carrinho)</label>
              <select value={touches} onChange={e=>setTouches(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                <option>1 toques</option><option>2 toques</option><option>3 toques</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Estimativa</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <input type="number" value={ppl} onChange={e=>setPpl(+e.target.value)} className="p-2 border rounded-md" placeholder="Tamanho do público" />
                <input type="number" value={aov} onChange={e=>setAov(+e.target.value)} className="p-2 border rounded-md" placeholder="Ticket médio" />
                <input type="number" value={conv} onChange={e=>setConv(+e.target.value)} className="p-2 border rounded-md" placeholder="Conversão (%)" />
                <input type="number" step="0.01" value={cpc} onChange={e=>setCpc(+e.target.value)} className="p-2 border rounded-md" placeholder="Custo/envio" />
              </div>
              <div className="mt-3 text-sm">
                <span className="px-2 py-1 rounded-full border mr-2">Receita: {revenue.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                <span className="px-2 py-1 rounded-full border mr-2">Custo: {cost.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                <span className="px-2 py-1 rounded-full border">ROI: {roi}</span>
              </div>
            </div>
          </div>
        )}

        {step===5 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="font-semibold mb-2">Resumo</div>
            <pre className="text-sm bg-azure-50 border border-azure-200 rounded p-3 whitespace-pre-wrap">
{`Nome: ${name}
Objetivo: ${triggers.find(t=>t.id===goal)?.label}
Público: ${audOptions.find(a=>a.id===audType)?.label} • ${audRefresh}
Exclusões: ${exclude || 'nenhuma'}
Canais: WhatsApp + E-mail
WhatsApp: ${waText.slice(0,120)}...
E-mail: Assunto "${emSubj}" • Preheader "${emPre}"
Agenda: ${windowSend} • ${cap} • ${touches}
Estimativa: Receita ${revenue.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} • Custo ${cost.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} • ROI ${roi}`}
            </pre>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          {step>1 && <button onClick={prev} className="px-4 py-2 rounded border">Voltar</button>}
          {step<5 && <button onClick={next} className="px-4 py-2 rounded text-white" style={{background: 'linear-gradient(90deg, #0ea5e9, #ff7a59)'}}>Continuar</button>}
          {step===5 && <button onClick={publish} className="px-4 py-2 rounded text-white" style={{background: 'linear-gradient(90deg, #0ea5e9, #ff7a59)'}}>Publicar</button>}
        </div>
      </Layout>
    </>
  );
}

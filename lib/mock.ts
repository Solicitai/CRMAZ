import { Automation, Audience, WaTemplate, EmailTemplate, Funnel, KPI } from './types';

export const autos: Automation[] = [
  { id:'a1', name:'Winback 60/90/120', when:'60/90/120 dias sem comprar', who:'Em risco (auto)', channels:'WA + Email', active:true,  revenue30d:14200, roi:4.7, lastRunISO:new Date(Date.now()-3*3600_000).toISOString() },
  { id:'a2', name:'Reposição Protetor 120d', when:'120 dias da última compra de protetor', who:'Compradores de protetor (auto)', channels:'WA', active:true, revenue30d:7800, roi:5.2, lastRunISO:new Date(Date.now()-7*3600_000).toISOString() },
  { id:'a3', name:'Carrinho (3 toques)', when:'Carrinho abandonado', who:'Abandonos 24h', channels:'WA + Email', active:true,  revenue30d:9800, roi:3.9, lastRunISO:new Date(Date.now()-20*3600_000).toISOString() },
  { id:'a4', name:'Pós-compra D+20', when:'20 dias após compra', who:'Todos compradores', channels:'Email', active:false, revenue30d:9100, roi:3.1, lastRunISO:new Date(Date.now()-36*3600_000).toISOString() },
];

export const kpi: KPI = {
  activeAutomations: autos.filter(a => a.active).length,
  revenue30d: autos.reduce((s,a)=>s+a.revenue30d,0),
  roiAvg30d: +(autos.reduce((s,a)=>s+a.roi,0)/autos.length).toFixed(1),
};

export const audiences: Audience[] = [
  { id:'aud1', name:'Em risco 60–120d', desc:'Clientes há 60 a 120 dias sem comprar (com opt-in WA)', type:'Automática diária', size:1800, updated:'Hoje 08:10' },
  { id:'aud2', name:'Comprou Protetor 120d', desc:'Clientes que compraram protetor há 120 dias', type:'Automática diária', size:900, updated:'Hoje 08:12' },
  { id:'aud3', name:'Carts 24h', desc:'Carrinhos abandonados nas últimas 24 horas', type:'Automática diária', size:420, updated:'Hoje 08:05' },
  { id:'aud4', name:'VIP top 10%', desc:'Clientes com LTV no top 10%', type:'Fixa (snapshot)', size:160, updated:'Ontem 18:00' },
];

export const waTpl: WaTemplate[] = [
  { id:'w1', name:'Winback 0%',  body:'Oi {{first_name}}! Sentimos sua falta 😄 Veja as novidades: {{link}}', cta:'https://loja.com/novidades' },
  { id:'w2', name:'Winback 12%', body:'{{first_name}}, seu cupom {{coupon}} dá 12% OFF por 72h → {{link}}', cta:'https://loja.com/voltar' },
];

export const emTpl: EmailTemplate[] = [
  { id:'e1', name:'Cross-sell D+20', subj:'{{first_name}}, escolhido pra você', pre:'Itens que combinam com sua última compra', body:'<p>Confira nossas recomendações.</p>' },
  { id:'e2', name:'Winback 10%',    subj:'{{first_name}}, 10% para voltar', pre:'Cupom {{coupon}} ativo por 72h', body:'<p>Volte e ganhe 10% OFF.</p>' },
];

export const funnel: Funnel[] = [
  { label:'WhatsApp', sent:1200, delivered:1100, clicks:380, conversions:92 },
  { label:'E-mail',   sent:2200, delivered:1980, clicks:410, conversions:76 },
];

export const lastDays = Array.from({length:14}, (_,i)=>`D-${13-i}`);
export const seriesReceita = [{ label: 'Receita', data: lastDays.map(()=>Math.floor(2000 + Math.random()*8000)) }];

import { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

// Data definitions for wizard
const triggerOptions = [
  { id: 'winback60', label: 'Winback 60 dias', description: 'Contata clientes que não compram há 60 dias.' },
  { id: 'winback90', label: 'Winback 90 dias', description: 'Contata clientes que não compram há 90 dias.' },
  { id: 'winback120', label: 'Winback 120 dias', description: 'Contata clientes que não compram há 120 dias.' },
  { id: 'reposicao120', label: 'Reposição 120 dias', description: 'Lembra clientes de renovar após 120 dias.' },
  { id: 'carrinho', label: 'Carrinho abandonado', description: 'Envia lembretes após abandono de carrinho.' },
  { id: 'poscompra', label: 'Pós-compra D+7', description: 'Comunica clientes uma semana após a compra.' },
  { id: 'aniversario', label: 'Aniversário do cliente', description: 'Celebra o aniversário do cliente.' },
];
const audienceOptions = [
  { id: 'risco60_120', label: 'Em risco (60–120 dias sem comprar)', desc: 'Clientes que não compram há 60 a 120 dias.' },
  { id: 'recem', label: 'Recém-chegados', desc: 'Primeira compra nos últimos 30 dias.' },
  { id: 'vip', label: 'VIPs', desc: 'Top 10% de clientes por LTV.' },
  { id: 'hibernando', label: 'Hibernando', desc: 'Sem compras há mais de 180 dias.' },
  { id: 'todos', label: 'Todos os clientes', desc: 'Inclui todos os clientes ativos.' },
];
const templateOptions = [
  {
    id: 'winback',
    name: 'Winback – Oferta 10%',
    whatsapp: 'Olá {{first_name}}, sentimos sua falta! Use o cupom {{coupon}} para 10% off na sua próxima compra.',
    emailSubject: 'Sentimos sua falta – 10% off na sua próxima compra!',
    emailBody: '<p>Olá {{first_name}},<br/> Faz um tempinho desde sua última compra. Queremos te ver de volta! Use o cupom <strong>{{coupon}}</strong> para 10% de desconto. Aproveite!</p>',
  },
  {
    id: 'reposicao',
    name: 'Reposição – Proteto de Colchão',
    whatsapp: 'Olá {{first_name}}, seu protetor de colchão precisa ser trocado? Temos uma oferta especial pra você. Confira!',
    emailSubject: 'Hora de renovar seu protetor!',
    emailBody: '<p>Olá {{first_name}},<br/> Seu protetor de colchão já tem 120 dias! Que tal renovar com 15% off? Clique aqui para aproveitar.</p>',
  },
  {
    id: 'aniversario',
    name: 'Aniversário – Parabéns!',
    whatsapp: 'Feliz aniversário, {{first_name}}! Celebre com 20% off em toda a loja.',
    emailSubject: 'Parabéns! Ganhe 20% de desconto hoje',
    emailBody: '<p>Olá {{first_name}},<br/> Que alegria celebrar seu aniversário! Use o cupom <strong>FESTA20</strong> e tenha 20% off em seu pedido de aniversário.</p>',
  },
];

export default function AutomationsPage() {
  // Step management
  const [step, setStep] = useState(1);
  // Form state
  const [trigger, setTrigger] = useState(triggerOptions[0].id);
  const [audience, setAudience] = useState(audienceOptions[0].id);
  const [dynamicAudience, setDynamicAudience] = useState(true);
  const [exclusions, setExclusions] = useState('');
  const [template, setTemplate] = useState(templateOptions[0].id);
  const [whatsText, setWhatsText] = useState(templateOptions[0].whatsapp);
  const [emailSubject, setEmailSubject] = useState(templateOptions[0].emailSubject);
  const [emailBody, setEmailBody] = useState(templateOptions[0].emailBody);
  const [scheduleHour, setScheduleHour] = useState('09:00');
  const [frequency, setFrequency] = useState(1);
  const [statusMessage, setStatusMessage] = useState('');

  // Update template when selected
  const handleTemplateChange = (id: string) => {
    const temp = templateOptions.find((t) => t.id === id);
    if (temp) {
      setTemplate(id);
      setWhatsText(temp.whatsapp);
      setEmailSubject(temp.emailSubject);
      setEmailBody(temp.emailBody);
    }
  };

  // Simulate publish
  const handlePublish = () => {
    // In production, send data to API/back-end
    setStatusMessage('Automação criada com sucesso!');
    // Reset wizard after short delay
    setTimeout(() => {
      setStatusMessage('');
      setStep(1);
    }, 4000);
  };

  // Function to render step content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Escolha o objetivo</h2>
            <p className="text-sm text-gray-600">Selecione o tipo de automação que deseja criar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {triggerOptions.map((opt) => (
                <label key={opt.id} className={`border rounded-lg p-4 shadow-sm cursor-pointer flex flex-col ${trigger === opt.id ? 'border-azure-400 bg-azure-50' : 'border-gray-200 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="trigger"
                    value={opt.id}
                    checked={trigger === opt.id}
                    onChange={() => setTrigger(opt.id)}
                    className="mb-2 h-4 w-4 text-azure-500 focus:ring-azure-400"
                  />
                  <span className="font-medium text-sm">{opt.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{opt.description}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2. Defina a audiência</h2>
            <p className="text-sm text-gray-600">Escolha para quem a automação será enviada.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {audienceOptions.map((aud) => (
                <label key={aud.id} className={`border rounded-lg p-4 shadow-sm cursor-pointer ${audience === aud.id ? 'border-azure-400 bg-azure-50' : 'border-gray-200 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={aud.id}
                    checked={audience === aud.id}
                    onChange={() => setAudience(aud.id)}
                    className="mb-2 h-4 w-4 text-azure-500 focus:ring-azure-400"
                  />
                  <span className="font-medium text-sm">{aud.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{aud.desc}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                <input
                  type="checkbox"
                  checked={dynamicAudience}
                  onChange={(e) => setDynamicAudience(e.target.checked)}
                  className="h-4 w-4 text-azure-500 focus:ring-azure-400"
                />
                <span>Atualizar lista diariamente</span>
              </label>
              <span className="text-xs text-gray-500">Se desmarcado, usa snapshot atual.</span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Exclusões (opcional)</label>
              <input
                type="text"
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                placeholder="Clientes VIP, últimos 7 dias, etc."
                className="mt-1 w-full p-2 border rounded-md focus:border-azure-400 focus:ring-azure-400"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3. Mensagens</h2>
            <p className="text-sm text-gray-600">Personalize o conteúdo das mensagens.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Escolher template</label>
              <select
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="mt-1 p-2 border w-full rounded-md focus:border-azure-400 focus:ring-azure-400"
              >
                {templateOptions.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Texto WhatsApp</label>
              <textarea
                value={whatsText}
                onChange={(e) => setWhatsText(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md h-24 focus:border-azure-400 focus:ring-azure-400"
              />
              <div className="text-xs text-gray-500 mt-1">Use variáveis: {{first_name}}, {{coupon}}</div>
              <div className="mt-2 text-sm">
                <span className="font-semibold">Prévia:</span>{' '}
                {whatsText
                  .replace(/{{first_name}}/g, 'Maria')
                  .replace(/{{coupon}}/g, 'WIN10')}
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Assunto do E-mail</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md focus:border-azure-400 focus:ring-azure-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Corpo do E-mail (HTML simples permitido)</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md h-32 focus:border-azure-400 focus:ring-azure-400"
              />
              <div className="mt-2 text-sm">
                <span className="font-semibold">Prévia (simplificada):</span>
                <div className="border p-2 mt-1 rounded-md" dangerouslySetInnerHTML={{ __html: emailBody
                  .replace(/{{first_name}}/g, 'Maria')
                  .replace(/{{coupon}}/g, 'WIN10') }} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. Agenda & Frequência</h2>
            <p className="text-sm text-gray-600">Configure quando e com que frequência enviar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Horário de envio (HH:MM)</label>
                <input
                  type="time"
                  value={scheduleHour}
                  onChange={(e) => setScheduleHour(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full focus:border-azure-400 focus:ring-azure-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequência de contatos (toques)</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="mt-1 p-2 border rounded-md w-full focus:border-azure-400 focus:ring-azure-400"
                >
                  <option value={1}>1 toque</option>
                  <option value={2}>2 toques</option>
                  <option value={3}>3 toques</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500">Toques adicionais enviam lembretes 24h e 48h após o primeiro toque.</p>
          </div>
        );
      case 5:
        // Summary
        const triggerLabel = triggerOptions.find((t) => t.id === trigger)?.label;
        const audienceLabel = audienceOptions.find((a) => a.id === audience)?.label;
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">5. Revisar e publicar</h2>
            <p className="text-sm text-gray-600">Confira as configurações antes de ativar.</p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
              <div><strong>Objetivo:</strong> {triggerLabel}</div>
              <div>
                <strong>Quem recebe:</strong> {audienceLabel}
                {' '}
                {dynamicAudience ? '(lista dinâmica)' : '(snapshot)'}
                {exclusions && `, exceto ${exclusions}`}
              </div>
              <div>
                <strong>WhatsApp:</strong> {whatsText
                  .replace(/{{first_name}}/g, 'Maria')
                  .replace(/{{coupon}}/g, 'WIN10')}
              </div>
              <div>
                <strong>E-mail:</strong> {emailSubject}
              </div>
              <div>
                <strong>Horário:</strong> {scheduleHour}, <strong>Toques:</strong> {frequency}
              </div>
            </div>
            {/* ROI simulation */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">Projeção de ROI</h3>
              <p className="text-sm text-gray-600">Baseado no tamanho da audiência e ticket médio, a projeção de receita é de <span className="font-semibold text-azure-600">R$ {Math.floor(Math.random()*5000 + 5000)}</span> com ROI de <span className="font-semibold text-azure-600">{(Math.random()*5+2).toFixed(1)}x</span>.</p>
            </div>
            {statusMessage && <div className="text-green-600 font-medium">{statusMessage}</div>}
            <button
              type="button"
              onClick={handlePublish}
              className="mt-2 px-6 py-3 rounded-md bg-azure-500 hover:bg-azure-600 text-white font-medium"
            >
              Ativar automação
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Example existing automations (mock)
  const existingAutomations = [
    { id: 1, name: 'Winback 60d', status: 'Ativa', roi: '4.2x', revenue: 'R$ 12.3k' },
    { id: 2, name: 'Reposição 120d', status: 'Inativa', roi: '3.5x', revenue: 'R$ 6.8k' },
    { id: 3, name: 'Carrinho – 3 toques', status: 'Ativa', roi: '5.0x', revenue: 'R$ 18.9k' },
  ];

  return (
    <Layout>
      <Head>
        <title>CRM Recompra – Automações</title>
      </Head>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Automações</h1>
        {/* Existing automations */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Automações existentes</h2>
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="py-1 text-left">Nome</th>
                <th className="py-1 text-left">Status</th>
                <th className="py-1 text-left">Receita (30d)</th>
                <th className="py-1 text-left">ROI</th>
              </tr>
            </thead>
            <tbody>
              {existingAutomations.map((auto) => (
                <tr key={auto.id} className="border-b last:border-0 text-gray-700">
                  <td className="py-1 pr-2 whitespace-nowrap">{auto.name}</td>
                  <td className="py-1 pr-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${auto.status === 'Ativa' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{auto.status}</span>
                  </td>
                    <td className="py-1 pr-2">{auto.revenue}</td>
                    <td className="py-1 pr-2">{auto.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Wizard header */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Criar nova automação</h2>
          {/* Step indicator */}
          <div className="flex justify-between mb-6">
            {[1,2,3,4,5].map((n) => (
              <div key={n} className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= n ? 'bg-azure-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                  {n}
                </div>
                <span className={`mt-1 text-xs font-medium ${step >= n ? 'text-azure-600' : 'text-gray-500'}`}>Passo {n}</span>
              </div>
            ))}
          </div>
          {/* Step content */}
          <div className="space-y-4">
            {renderStep()}
            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 && step <= 5 && (
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-azure-400 text-azure-700 hover:bg-azure-50"
                  onClick={() => setStep(step - 1)}
                >
                  Voltar
                </button>
              )}
              {step < 5 && (
                <button
                  type="button"
                  className="ml-auto px-4 py-2 rounded-md bg-azure-500 hover:bg-azure-600 text-white"
                  onClick={() => setStep(step + 1)}
                >
                  Avançar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
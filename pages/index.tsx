import Layout from '@/components/Layout';
import KpiCard from '@/components/KpiCard';
import ChartLine from '@/components/ChartLine';
import ChartBar from '@/components/ChartBar';
import Head from 'next/head';

export default function Home() {
  // Mock data for demonstration; in production these would be fetched from API/Supabase
  const kpis = {
    ordersToday: 82,
    revenueToday: 12543.2,
    ticketToday: 152.3,
    crr30: 22,
    crr60: 33,
    crr90: 41,
    ltv: 560,
    timeSecondPurchase: 35,
  };
  // Generate labels for last 30 days
  const labels30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 29 + i);
    return d.toLocaleDateString('pt-BR');
  });
  // Random data for orders & revenue
  const ordersData = labels30.map(() => Math.floor(Math.random() * 100) + 20);
  const revenueData = ordersData.map((o) => o * (Math.random() * 150 + 80));
  const newCustomers = labels30.map(() => Math.floor(Math.random() * 30) + 5);
  // Segments distribution
  const segments = [
    { name: 'Campeões', count: 220, color: 'bg-azure-500 text-white' },
    { name: 'Fiéis', count: 360, color: 'bg-azure-400 text-white' },
    { name: 'Em ascensão', count: 260, color: 'bg-azure-300 text-gray-800' },
    { name: 'Em risco', count: 320, color: 'bg-amber-300 text-gray-800' },
    { name: 'Hibernando', count: 480, color: 'bg-gray-300 text-gray-800' },
    { name: 'Recém-chegados', count: 300, color: 'bg-emerald-300 text-gray-800' },
  ];
  // Heatmap values (5x5 for R x F) with simple shading logic
  const heatmap = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 10000)));
  // Top products (10)
  const topProducts = [
    { name: 'Protetor de Colchão Queen Impermeável', revenue: 5600, qty: 45 },
    { name: 'Lençol King Premium 400 fios', revenue: 4500, qty: 32 },
    { name: 'Travesseiro Ortopédico FreshGel', revenue: 4200, qty: 28 },
    { name: 'Protetor de Colchão Casal Impermeável', revenue: 3700, qty: 22 },
    { name: 'Lençol Queen Algodão Egípcio', revenue: 3100, qty: 18 },
    { name: 'Protetor Solteiro UltraFit', revenue: 2900, qty: 16 },
    { name: 'Capa de Travesseiro Impermeável', revenue: 2700, qty: 19 },
    { name: 'Jogo de Lençóis Microfibra King', revenue: 2300, qty: 14 },
    { name: 'Protetor King Respirável', revenue: 1900, qty: 11 },
    { name: 'Lençol Solteiro Algodão 200 fios', revenue: 1500, qty: 9 },
  ];
  // Campaigns data
  const campaigns = [
    { name: 'Winback 60d — WhatsApp 1', channel: 'WhatsApp', sent: 1200, delivered: 1120, clicks: 380, conv: 92, revenue: 14200, roi: '4.7x' },
    { name: 'Pós-compra D+20 Cross-sell', channel: 'Email', sent: 2200, delivered: 1980, clicks: 410, conv: 76, revenue: 9100, roi: '3.1x' },
    { name: 'Reposição Protetor 120d', channel: 'WhatsApp', sent: 860, delivered: 820, clicks: 240, conv: 58, revenue: 7800, roi: '5.2x' },
    { name: 'VIP Mimo Anual', channel: 'Email', sent: 400, delivered: 392, clicks: 210, conv: 64, revenue: 11500, roi: '8.3x' },
  ];
  // Format number to currency
  const fmtMoney = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <Layout>
      <Head>
        <title>CRM Recompra – Visão Geral</title>
      </Head>
      <div className="space-y-6">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Pedidos hoje" value={kpis.ordersToday} />
          <KpiCard title="Receita hoje" value={fmtMoney(kpis.revenueToday)} />
          <KpiCard title="Ticket médio" value={fmtMoney(kpis.ticketToday)} />
          <KpiCard title="CRR 30/60/90" value={`${kpis.crr30}% / ${kpis.crr60}% / ${kpis.crr90}%`} subtext="30d / 60d / 90d" />
          <KpiCard title="LTV médio" value={fmtMoney(kpis.ltv)} />
          <KpiCard title="Tempo 2ª compra" value={`${kpis.timeSecondPurchase} dias`} />
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <ChartLine
              title="Pedidos e Receita – últimos 30 dias"
              labels={labels30}
              datasets={[
                { label: 'Pedidos', data: ordersData },
                { label: 'Receita', data: revenueData },
              ]}
              yLabel="Pedidos / Receita"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <ChartBar
              title="Novos clientes por dia – últimos 30 dias"
              labels={labels30}
              datasets={[{ label: 'Novos clientes', data: newCustomers }]}
            />
          </div>
        </div>
        {/* Segments & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Segments cards */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Segmentos (RFM)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {segments.map((seg) => (
                <div key={seg.name} className={`rounded-md p-3 ${seg.color} shadow text-center`}>
                  <div className="text-xs font-semibold uppercase tracking-wide">{seg.name}</div>
                  <div className="text-lg font-bold">{seg.count}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Heatmap */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Heatmap RFM</h2>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-1"></th>
                  {['F5','F4','F3','F2','F1'].map((f) => (
                    <th key={f} className="p-1 text-center font-medium">{f}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmap.map((row, rIdx) => {
                  const rLabel = 5 - rIdx;
                  return (
                    <tr key={rIdx}>
                      <th className="p-1 text-center font-medium">{'R' + rLabel}</th>
                      {row.map((val, cIdx) => {
                        // Determine shading: scale 0-10000 to opacity 0.1-0.8
                        const opacity = 0.1 + 0.7 * (val / 10000);
                        return (
                          <td
                            key={cIdx}
                            className="p-1 text-center rounded-md"
                            style={{ backgroundColor: `rgba(14,165,233,${opacity})` }}
                          >
                            {fmtMoney(val)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Products & Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Top produtos (últimos 30 dias)</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-1">Produto</th>
                  <th className="py-1">Receita</th>
                  <th className="py-1">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b last:border-0 text-gray-700">
                    <td className="py-1 pr-2 whitespace-nowrap">{p.name}</td>
                    <td className="py-1 pr-2">{fmtMoney(p.revenue)}</td>
                    <td className="py-1 pr-2">{p.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Campanhas (últimos 30 dias)</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-1">Nome</th>
                  <th className="py-1">Canal</th>
                  <th className="py-1">Enviados</th>
                  <th className="py-1">Entregues</th>
                  <th className="py-1">Cliques</th>
                  <th className="py-1">Conversões</th>
                  <th className="py-1">Receita</th>
                  <th className="py-1">ROI</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} className="border-b last:border-0 text-gray-700">
                    <td className="py-1 pr-1 whitespace-nowrap">{c.name}</td>
                    <td className="py-1 pr-1">{c.channel}</td>
                    <td className="py-1 pr-1">{c.sent}</td>
                    <td className="py-1 pr-1">{c.delivered}</td>
                    <td className="py-1 pr-1">{c.clicks}</td>
                    <td className="py-1 pr-1">{c.conv}</td>
                    <td className="py-1 pr-1">{fmtMoney(c.revenue)}</td>
                    <td className="py-1 pr-1">{c.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

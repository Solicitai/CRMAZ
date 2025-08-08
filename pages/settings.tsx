import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Settings() {
  const [brand, setBrand] = useState('#2b9df4');
  const [accent, setAccent] = useState('#ff7a59');

  return (
    <>
      <Head><title>CRM Recompra — Configurações</title></Head>
      <Layout>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="font-semibold">Branding</div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <label className="text-sm">Cor principal <input type="color" className="ml-2" value={brand} onChange={e=>setBrand(e.target.value)} /></label>
              <label className="text-sm">Cor de CTA <input type="color" className="ml-2" value={accent} onChange={e=>setAccent(e.target.value)} /></label>
            </div>
            <div className="text-xs text-gray-600 mt-2">Ajuste as cores e veja a UI se adaptar (mock visual).</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="font-semibold">Prévia</div>
            <div className="flex items-center gap-3 mt-3">
              <button className="px-3 py-2 rounded text-white" style={{background:`linear-gradient(90deg, ${brand}, ${accent})`}}>Botão primário</button>
              <button className="px-3 py-2 rounded border">Botão secundário</button>
              <span className="text-xs px-2 py-1 rounded-full border" style={{borderColor:brand,color:brand}}>Tag</span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

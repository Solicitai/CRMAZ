import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const item = (href: string, label: string) => (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md border transition
        ${router.pathname === href ? 'bg-azure-50 border-azure-200 text-azure-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-azure-50'}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-azure-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-azure-500 to-azure-300 shadow" />
            <div className="font-extrabold text-azure-800">CRM Recompra</div>
          </div>
          <div className="text-sm text-azure-700">Tema Azure • Marketing-friendly</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-12 gap-6 py-6">
        <aside className="col-span-3">
          <nav className="space-y-2">
            {item('/', 'Início')}
            {item('/automations', 'Automações')}
            {item('/audiences', 'Audiências')}
            {item('/templates', 'Mensagens')}
            {item('/results', 'Resultados')}
            {item('/settings', 'Configurações')}
          </nav>
        </aside>
        <main className="col-span-9">{children}</main>
      </div>
    </div>
  );
}

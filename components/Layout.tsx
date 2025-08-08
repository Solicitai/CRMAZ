import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const NavItem = ({href,label}:{href:string;label:string}) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition
      ${active ? 'bg-white border-azure-200 text-azure-800 shadow-soft' : 'bg-transparent border-transparent text-slate hover:bg-white hover:border-gray-200'}`}>
      <span>{label}</span>
    </Link>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-2 border-r bg-azure-50/50">
        <div className="h-16 flex items-center px-4 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-azure-500 to-azure-300 shadow-soft" />
          <div className="font-extrabold text-azure-800">CRM Recompra</div>
        </div>
        <nav className="px-3 space-y-2">
          <NavItem href="/" label="Indicadores" />
          <NavItem href="/automations" label="Automações" />
          <NavItem href="/audiences" label="Audiências" />
          <NavItem href="/templates" label="Mensagens" />
          <NavItem href="/orders" label="Pedidos" />
          <NavItem href="/carts" label="Carrinhos" />
          <NavItem href="/results" label="Resultados" />
          <NavItem href="/settings" label="Configurações" />
        </nav>
        <div className="px-4 py-6 text-xs text-slate mt-auto hidden md:block">
          © {new Date().getFullYear()} • v1.2
        </div>
      </aside>
      <main className="col-span-10">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
          <div className="text-slate">Modo produção • mock data</div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost">Exportar</button>
            <button className="btn btn-primary">Nova automação</button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

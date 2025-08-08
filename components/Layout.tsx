import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

const NavItem = ({href,label,onClick}:{href:string;label:string;onClick?:()=>void}) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition
      ${active ? 'bg-white border-azure-200 text-azure-800 shadow-soft' : 'bg-transparent border-transparent text-slate hover:bg-white hover:border-gray-200'}`}
    >
      <span>{label}</span>
    </Link>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar desktop */}
      <aside className="hidden md:block md:col-span-2 border-r bg-azure-50/50">
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

      {/* Sidebar mobile (drawer) */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={()=>setOpen(false)}
        />
        <aside className={`absolute left-0 top-0 h-full w-72 bg-azure-50/80 backdrop-blur border-r p-4 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-12 flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-azure-500 to-azure-300 shadow-soft" />
            <div className="font-extrabold text-azure-800">CRM Recompra</div>
          </div>
          <nav className="space-y-2">
            <NavItem href="/" label="Indicadores" onClick={()=>setOpen(false)} />
            <NavItem href="/automations" label="Automações" onClick={()=>setOpen(false)} />
            <NavItem href="/audiences" label="Audiências" onClick={()=>setOpen(false)} />
            <NavItem href="/templates" label="Mensagens" onClick={()=>setOpen(false)} />
            <NavItem href="/orders" label="Pedidos" onClick={()=>setOpen(false)} />
            <NavItem href="/carts" label="Carrinhos" onClick={()=>setOpen(false)} />
            <NavItem href="/results" label="Resultados" onClick={()=>setOpen(false)} />
            <NavItem href="/settings" label="Configurações" onClick={()=>setOpen(false)} />
          </nav>
        </aside>
      </div>

      {/* Main */}
      <main className="col-span-12 md:col-span-10">
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-white">
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200"
            onClick={()=>setOpen(true)}
            aria-label="Abrir menu"
          >
            {/* ícone hamburguer */}
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="#334155" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="text-slate text-sm">Modo produção • mock data</div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost hidden sm:inline-flex">Exportar</button>
            <button className="btn btn-primary">Nova automação</button>
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}

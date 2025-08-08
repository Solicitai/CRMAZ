import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

// Simple layout with top bar and side navigation. Highlights active page.
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const navItems = [
    { href: '/', label: 'Visão Geral' },
    { href: '/automations', label: 'Automações' }
    // Add more items as needed
  ];
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-azure-500 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">CRM Recompra</h1>
          <span className="text-sm font-medium">Demo</span>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-60 bg-azure-100 border-r border-azure-200 py-6 px-4 hidden md:block">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={`block px-3 py-2 rounded-lg font-medium hover:bg-azure-200 transition ${
                      router.pathname === item.href ? 'bg-azure-200 text-azure-900' : 'text-azure-700'
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
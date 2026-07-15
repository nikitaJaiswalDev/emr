'use client';

import { RoleProvider } from '@/lib/role-context';
import { Sidebar } from '@/components/sidebar';
import { RoleSwitcher } from '@/components/role-switcher';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-6">
            <div className="flex items-center gap-2">
              <span className="text-body-sm font-semibold text-text-primary">Moonaria</span>
            </div>
            <RoleSwitcher />
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </RoleProvider>
  );
}

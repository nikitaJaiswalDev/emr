'use client';

import * as React from 'react';
import {
  organizations,
  users,
  patients,
  type Role,
  type Organization,
  type User,
} from '@/lib/mockData';

interface RoleContextValue {
  role: Role;
  roleLabel: string;
  user: User | null;
  organization: Organization;
  setRole: (role: Role) => void;
}

const RoleContext = React.createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = React.useState<Role>('org-owner');
  const user = React.useMemo(() => users.find((u) => u.role === role) ?? null, [role]);
  const organization = organizations[0];
  const roleLabel = user?.title ?? role;

  return (
    <RoleContext.Provider value={{ role, roleLabel, user, organization, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}

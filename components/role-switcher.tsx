'use client';

import { useRole } from '@/lib/role-context';
import { ROLE_ORDER, ROLE_LABELS, type Role } from '@/lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <div className="flex items-center gap-2">
      <span className="text-caption text-text-muted">Viewing as</span>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ROLE_ORDER.map((r) => (
            <SelectItem key={r} value={r}>
              {ROLE_LABELS[r]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

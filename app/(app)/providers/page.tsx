'use client';

import { users } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Stethoscope } from 'lucide-react';

export default function ProvidersPage() {
  const providers = users.filter((u) => u.role === 'provider');
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <Stethoscope className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">Providers</h1>
          <p className="text-body text-text-secondary">{providers.length} providers on staff</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Provider</TableHead><TableHead>Title</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {providers.map((p) => (
                <TableRow key={p.id}>
                  <TableCell><div className="flex items-center gap-2.5"><Avatar className="h-8 w-8"><AvatarFallback className="bg-brand-primary/15 text-caption font-semibold text-brand-primary">{p.initials}</AvatarFallback></Avatar><span className="text-body-sm font-medium text-text-primary">{p.name}</span></div></TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{p.title}</span></TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{p.email}</span></TableCell>
                  <TableCell><Badge variant="outline" className="border-success/30 bg-success/10 text-caption font-semibold text-success">Active</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, DollarSign, TrendingUp, Receipt } from 'lucide-react';

export default function FinancialsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <BarChart3 className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">Financials</h1>
          <p className="text-body text-text-secondary">Organization-wide financial overview</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4 text-brand-primary" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Monthly Revenue</span></div><p className="text-h3 font-semibold text-text-primary">$142,300</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-brand-primary" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Collections Rate</span></div><p className="text-h3 font-semibold text-text-primary">87%</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><Receipt className="h-4 w-4 text-brand-primary" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Outstanding A/R</span></div><p className="text-h3 font-semibold text-text-primary">$28,450</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><BarChart3 className="h-4 w-4 text-brand-primary" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Avg Cost/Visit</span></div><p className="text-h3 font-semibold text-text-primary">$112</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-h4 text-text-primary">Revenue by Month</CardTitle><CardDescription className="text-body-sm text-text-muted">Last 6 months</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[['Feb 2026', '$118,200'], ['Mar 2026', '$124,500'], ['Apr 2026', '$131,800'], ['May 2026', '$138,900'], ['Jun 2026', '$140,200'], ['Jul 2026', '$142,300']].map(([month, rev]) => (
              <div key={month} className="flex items-center justify-between rounded-md border border-border bg-surface-sunken px-4 py-2.5">
                <span className="text-body-sm font-medium text-text-primary">{month}</span>
                <span className="text-body-sm text-text-secondary">{rev}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

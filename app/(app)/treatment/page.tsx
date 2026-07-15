'use client';

import * as React from 'react';
import { ClipboardPenLine, ChevronDown, ChevronRight, Target, Calendar, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/lib/role-context';
import { treatmentPlans, type TreatmentPlan, type TreatmentGoal } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GOAL_STATUS: Record<string, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'border-border bg-surface-sunken text-text-muted' },
  'in-progress': { label: 'In Progress', className: 'border-info/30 bg-info/10 text-info' },
  'met': { label: 'Met', className: 'border-success/30 bg-success/10 text-success' },
  'partially-met': { label: 'Partially Met', className: 'border-warning/40 bg-warning/10 text-warning' },
};

export default function TreatmentPage() {
  const { user, role } = useRole();
  const [expandedPlan, setExpandedPlan] = React.useState<string | null>(null);

  const plans = role === 'provider' && user
    ? treatmentPlans.filter((p) => p.providerId === user.id)
    : treatmentPlans;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <ClipboardPenLine className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">Treatment Plans</h1>
          <p className="text-body text-text-secondary">Active treatment plans with diagnosis, goals, and progress tracking</p>
        </div>
      </div>

      <div className="space-y-3">
        {plans.length === 0 && (
          <Card><CardContent className="py-8 text-center"><p className="text-body-sm text-text-muted">No treatment plans found.</p></CardContent></Card>
        )}
        {plans.map((plan) => {
          const isExpanded = expandedPlan === plan.id;
          const goalsMet = plan.goals.filter((g) => g.status === 'met').length;
          const goalsInProgress = plan.goals.filter((g) => g.status === 'in-progress').length;
          const totalGoals = plan.goals.length;
          const pct = Math.round((goalsMet / totalGoals) * 100);

          return (
            <Card key={plan.id}>
              <CardHeader className="pb-3">
                <button className="flex w-full items-center justify-between text-left" onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm font-semibold text-text-primary">{plan.patientName}</span>
                      <Badge variant="outline" className={cn('text-caption font-semibold', plan.status === 'active' ? 'border-success/30 bg-success/10 text-success' : 'border-border bg-surface-sunken text-text-muted')}>{plan.status}</Badge>
                    </div>
                    <p className="text-caption text-text-muted">{plan.diagnosis} · {plan.modality} · {plan.frequency}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-sunken">
                        <div className="h-full rounded-full bg-brand-primary" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-caption text-text-muted">{goalsMet}/{totalGoals} goals met</span>
                    </div>
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-text-muted" /> : <ChevronRight className="h-4 w-4 text-text-muted" />}
                  </div>
                </button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  {/* Diagnosis */}
                  <div className="mb-4 rounded-lg border border-border bg-surface-sunken p-3">
                    <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-text-muted">Diagnosis</p>
                    <p className="text-body-sm font-medium text-text-primary">{plan.diagnosis}</p>
                    <p className="text-body-sm text-text-secondary">{plan.diagnosisDescription}</p>
                  </div>

                  {/* Plan details */}
                  <div className="mb-4 grid gap-4 sm:grid-cols-3">
                    <DetailRow icon={Calendar} label="Start Date" value={plan.startDate} />
                    <DetailRow icon={Calendar} label="Review Date" value={plan.reviewDate} />
                    <DetailRow icon={User} label="Provider" value={plan.providerName} />
                  </div>

                  {/* Goals */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-brand-primary" />
                      <span className="text-caption font-semibold uppercase tracking-wide text-text-muted">Treatment Goals ({totalGoals})</span>
                    </div>
                    <div className="space-y-2">
                      {plan.goals.map((goal) => {
                        const status = GOAL_STATUS[goal.status] ?? GOAL_STATUS['in-progress'];
                        return (
                          <div key={goal.id} className="rounded-lg border border-border bg-surface-sunken p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-body-sm font-medium text-text-primary">{goal.description}</p>
                                <p className="mt-1 text-caption text-text-muted">{goal.progress}</p>
                                <p className="mt-0.5 text-caption text-text-muted">Target: {goal.targetDate}</p>
                              </div>
                              <Badge variant="outline" className={cn('text-caption font-semibold whitespace-nowrap', status.className)}>{status.label}</Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-text-muted" />
      <div>
        <p className="text-caption text-text-muted">{label}</p>
        <p className="text-body-sm text-text-primary">{value}</p>
      </div>
    </div>
  );
}

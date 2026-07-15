'use client';

import { useRole } from '@/lib/role-context';
import { patients, clinicalNotes, tasks, prescriptions } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, FileText, ListTodo, Pill } from 'lucide-react';

export default function DashboardPage() {
  const { role, user, organization } = useRole();
  const activePatients = patients.filter((p) => p.status === 'active').length;
  const draftNotes = clinicalNotes.filter((n) => n.status === 'draft').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const activeRx = prescriptions.filter((p) => p.status === 'active').length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-h1 font-bold text-text-primary">Dashboard</h1>
        <p className="text-body text-text-secondary">Welcome back, {user?.name ?? 'User'}. Here's what's happening in {organization.shortName}.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-primary" />
              <span className="text-caption font-medium uppercase tracking-wide text-text-muted">Active Patients</span>
            </div>
            <p className="text-h3 font-semibold text-text-primary">{activePatients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-primary" />
              <span className="text-caption font-medium uppercase tracking-wide text-text-muted">Draft Notes</span>
            </div>
            <p className="text-h3 font-semibold text-text-primary">{draftNotes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-brand-primary" />
              <span className="text-caption font-medium uppercase tracking-wide text-text-muted">Pending Tasks</span>
            </div>
            <p className="text-h3 font-semibold text-text-primary">{pendingTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Pill className="h-4 w-4 text-brand-primary" />
              <span className="text-caption font-medium uppercase tracking-wide text-text-muted">Active Rx</span>
            </div>
            <p className="text-h3 font-semibold text-text-primary">{activeRx}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-h4 text-text-primary">Recent Activity</CardTitle>
          <CardDescription className="text-body-sm text-text-muted">Latest clinical notes across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {clinicalNotes.slice(0, 5).map((note) => (
              <div key={note.id} className="flex items-center justify-between rounded-md border border-border bg-surface-sunken px-4 py-2.5">
                <div>
                  <span className="text-body-sm font-medium text-text-primary">{note.patientName}</span>
                  <span className="text-caption text-text-muted"> · {note.sessionType} · {note.sessionDate}</span>
                </div>
                <span className="text-caption text-text-muted">{note.providerName}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

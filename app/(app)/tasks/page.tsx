'use client';

import * as React from 'react';
import { ListTodo, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, User, FileText, ShieldCheck, Receipt, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/lib/role-context';
import { tasks as initialTasks, type Task } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

const PRIORITY_BADGE: Record<string, string> = {
  high: 'border-danger/30 bg-danger/10 text-danger',
  medium: 'border-warning/40 bg-warning/10 text-warning',
  low: 'border-info/30 bg-info/10 text-info',
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  clinical: FileText,
  administrative: ListTodo,
  billing: Receipt,
  compliance: ShieldCheck,
  supervision: GraduationCap,
};

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

export default function TasksPage() {
  const { user, role } = useRole();
  const [taskList, setTaskList] = React.useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = React.useState('pending');

  const myTasks = role === 'provider' && user
    ? taskList.filter((t) => t.assignedTo === user.id)
    : taskList;

  const filtered = statusFilter === 'all'
    ? myTasks
    : myTasks.filter((t) => t.status === statusFilter);

  const completeTask = (id: string) => {
    setTaskList((prev) => prev.map((t) => t.id === id ? { ...t, status: 'completed' } : t));
  };

  const pendingCount = myTasks.filter((t) => t.status === 'pending').length;
  const overdueCount = myTasks.filter((t) => t.status === 'pending' && isOverdue(t.dueDate)).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <ListTodo className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">Tasks</h1>
          <p className="text-body text-text-secondary">{pendingCount} pending · {overdueCount} overdue</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><Clock className="h-4 w-4 text-warning" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Pending</span></div><p className="text-h3 font-semibold text-text-primary">{pendingCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-danger" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Overdue</span></div><p className="text-h3 font-semibold text-text-primary">{overdueCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="mb-2 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /><span className="text-caption font-medium uppercase tracking-wide text-text-muted">Completed</span></div><p className="text-h3 font-semibold text-text-primary">{myTasks.filter((t) => t.status === 'completed').length}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-body-sm text-text-muted">Filter:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h4 text-text-primary">Task List</CardTitle>
          <CardDescription className="text-body-sm text-text-muted">Clinical, administrative, and compliance tasks</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="py-8 text-center text-body-sm text-text-muted">No tasks found.</TableCell></TableRow>
              )}
              {filtered.map((task) => {
                const CatIcon = CATEGORY_ICONS[task.category] ?? ListTodo;
                const overdue = task.status === 'pending' && isOverdue(task.dueDate);
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-sunken">
                          <CatIcon className="h-4 w-4 text-text-secondary" />
                        </div>
                        <div>
                          <span className="text-body-sm font-medium text-text-primary">{task.title}</span>
                          <p className="text-caption text-text-muted">{task.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><span className="text-body-sm text-text-secondary capitalize">{task.category}</span></TableCell>
                    <TableCell><span className="text-body-sm text-text-secondary">{task.patientName ?? '—'}</span></TableCell>
                    <TableCell><span className="text-body-sm text-text-secondary">{task.assignedToName}</span></TableCell>
                    <TableCell>
                      <span className={cn('text-caption', overdue ? 'text-danger font-semibold' : 'text-text-muted')}>
                        {task.dueDate}{overdue ? ' · Overdue' : ''}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn('text-caption font-semibold capitalize', PRIORITY_BADGE[task.priority] ?? 'border-border bg-surface-sunken text-text-muted')}>{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      {task.status === 'pending' ? (
                        <Badge variant="outline" className="border-warning/40 bg-warning/10 text-caption font-semibold text-warning"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
                      ) : (
                        <Badge variant="outline" className="border-success/30 bg-success/10 text-caption font-semibold text-success"><CheckCircle2 className="mr-1 h-3 w-3" />Done</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {task.status === 'pending' && (
                        <Button size="sm" variant="outline" onClick={() => completeTask(task.id)} className="gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />Complete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

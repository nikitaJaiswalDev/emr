'use client';

import * as React from 'react';
import { FileText, ChevronDown, ChevronRight, FileSignature, Clock, Video, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/lib/role-context';
import { clinicalNotes, patients, type ClinicalNote } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUS_BADGE: Record<string, string> = {
  draft: 'border-warning/40 bg-warning/10 text-warning',
  signed: 'border-success/30 bg-success/10 text-success',
  'co-signed': 'border-info/30 bg-info/10 text-info',
  amended: 'border-danger/30 bg-danger/10 text-danger',
};

function getInitials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }

export default function NotesPage() {
  const { user, role } = useRole();
  const [patientFilter, setPatientFilter] = React.useState('all');
  const [expandedNote, setExpandedNote] = React.useState<string | null>(null);

  const providerNotes = role === 'provider' && user
    ? clinicalNotes.filter((n) => n.providerId === user.id)
    : clinicalNotes;

  const filteredNotes = patientFilter === 'all'
    ? providerNotes
    : providerNotes.filter((n) => n.patientId === patientFilter);

  const patientOptions = patients.filter((p) => providerNotes.some((n) => n.patientId === p.id));

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <FileText className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">Clinical Notes</h1>
          <p className="text-body text-text-secondary">SOAP notes and session transcripts per patient visit</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-body-sm text-text-muted">Filter by patient:</span>
        <Select value={patientFilter} onValueChange={setPatientFilter}>
          <SelectTrigger className="h-9 w-[220px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All patients</SelectItem>
            {patientOptions.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {filteredNotes.length === 0 && (
          <Card><CardContent className="py-8 text-center"><p className="text-body-sm text-text-muted">No clinical notes found.</p></CardContent></Card>
        )}
        {filteredNotes.map((note) => {
          const isExpanded = expandedNote === note.id;
          return (
            <Card key={note.id}>
              <CardHeader className="pb-3">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-brand-primary/15 text-caption font-semibold text-brand-primary">{getInitials(note.patientName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-body-sm font-semibold text-text-primary">{note.patientName}</span>
                        <Badge variant="outline" className={cn('text-caption font-semibold', STATUS_BADGE[note.status] ?? 'border-border bg-surface-sunken text-text-muted')}>
                          {note.status === 'draft' && <Clock className="mr-1 h-3 w-3" />}
                          {note.status === 'signed' && <FileSignature className="mr-1 h-3 w-3" />}
                          {note.status}
                        </Badge>
                      </div>
                      <p className="text-caption text-text-muted">
                        {note.sessionType} · {note.sessionDate} · {note.providerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border bg-surface-sunken text-caption text-text-muted">
                      {note.modality === 'telehealth' ? <><Video className="mr-1 h-3 w-3" />Telehealth</> : <><MapPin className="mr-1 h-3 w-3" />In-Person</>}
                    </Badge>
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-text-muted" /> : <ChevronRight className="h-4 w-4 text-text-muted" />}
                  </div>
                </button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  {/* SOAP sections */}
                  <div className="space-y-3">
                    <SoapSection label="S — Subjective" content={note.soap.subjective} />
                    <SoapSection label="O — Objective" content={note.soap.objective} />
                    <SoapSection label="A — Assessment" content={note.soap.assessment} />
                    <SoapSection label="P — Plan" content={note.soap.plan} />
                  </div>

                  {/* Transcript */}
                  {note.transcript && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-text-secondary" />
                        <span className="text-caption font-semibold uppercase tracking-wide text-text-muted">Session Transcript</span>
                      </div>
                      <div className="rounded-lg border border-border bg-surface-sunken p-4">
                        <pre className="whitespace-pre-wrap text-body-sm text-text-secondary leading-relaxed">{note.transcript}</pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SoapSection({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-sunken p-3">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-text-muted">{label}</p>
      <p className="text-body-sm text-text-primary leading-relaxed">{content}</p>
    </div>
  );
}

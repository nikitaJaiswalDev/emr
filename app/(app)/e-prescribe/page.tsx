'use client';

import * as React from 'react';
import { Pill, Plus, Send, FileText, Clock, CircleCheck as CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/lib/role-context';
import { prescriptions, patients, users, type Prescription } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

const STATUS_BADGE: Record<string, string> = {
  active: 'border-success/30 bg-success/10 text-success',
  pending: 'border-warning/40 bg-warning/10 text-warning',
  expired: 'border-border bg-surface-sunken text-text-muted',
  discontinued: 'border-danger/30 bg-danger/10 text-danger',
};

const MEDICATION_CATALOG = [
  { name: 'Sertraline', strengths: ['25 mg', '50 mg', '100 mg'], forms: ['tablet'], ndc: '00677-1114-01' },
  { name: 'Escitalopram', strengths: ['5 mg', '10 mg', '20 mg'], forms: ['tablet'], ndc: '50458-0590-30' },
  { name: 'Bupropion XL', strengths: ['150 mg', '300 mg'], forms: ['tablet, extended release'], ndc: '00310-0101-30' },
  { name: 'Prazosin', strengths: ['1 mg', '2 mg', '5 mg'], forms: ['capsule'], ndc: '00093-7170-01' },
  { name: 'Fluoxetine', strengths: ['10 mg', '20 mg', '40 mg'], forms: ['capsule'], ndc: '54868-4198-00' },
  { name: 'Venlafaxine XR', strengths: ['37.5 mg', '75 mg', '150 mg'], forms: ['capsule, extended release'], ndc: '00781-5411-31' },
  { name: 'Lamotrigine', strengths: ['25 mg', '100 mg', '200 mg'], forms: ['tablet'], ndc: '00781-1040-31' },
  { name: 'Aripiprazole', strengths: ['2 mg', '5 mg', '10 mg', '15 mg'], forms: ['tablet'], ndc: '65773-0101-01' },
];

const PHARMACIES = [
  'Walgreens #4821, 1200 Broadway, Oakland, CA',
  'CVS #3301, 2150 Shattuck Ave, Berkeley, CA',
  'Walgreens #5102, 800 SW Broadway, Portland, OR',
  'Rite Aid #1178, 330 Fruitvale Ave, Oakland, CA',
];

export default function EPrescribePage() {
  const { user, role } = useRole();
  const [showNewRx, setShowNewRx] = React.useState(false);
  const [rxList, setRxList] = React.useState<Prescription[]>(prescriptions);

  const canPrescribe = role === 'provider' && user?.id === 'user-004';

  const providerRx = canPrescribe
    ? rxList.filter((r) => r.providerId === user?.id)
    : rxList;

  const handleNewRx = (rx: Prescription) => {
    setRxList((prev) => [rx, ...prev]);
    setShowNewRx(false);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
            <Pill className="h-6 w-6 text-brand-primary" />
          </div>
          <div>
            <h1 className="text-h1 font-bold text-text-primary">e-Prescribe</h1>
            <p className="text-body text-text-secondary">Manage prescriptions and send to pharmacy electronically</p>
          </div>
        </div>
        {canPrescribe && (
          <Button onClick={() => setShowNewRx(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Prescription
          </Button>
        )}
      </div>

      {!canPrescribe && (
        <div className="flex items-start gap-2.5 rounded-md border border-info/30 bg-info/5 p-3 text-body-sm text-text-secondary">
          <Pill className="mt-0.5 h-4 w-4 shrink-0 text-info" />
          <p>Only prescribing providers (psychiatrists) can create new prescriptions. You have view-only access.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-h4 text-text-primary">Prescriptions</CardTitle>
          <CardDescription className="text-body-sm text-text-muted">{providerRx.length} prescriptions on file</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Sig</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Refills</TableHead>
                <TableHead>Pharmacy</TableHead>
                <TableHead>Prescribed</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerRx.map((rx) => (
                <TableRow key={rx.id}>
                  <TableCell>
                    <div>
                      <span className="text-body-sm font-medium text-text-primary">{rx.medication}</span>
                      <p className="text-caption text-text-muted">{rx.strength} · {rx.form}</p>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{rx.patientName}</span></TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{rx.sig}</span></TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{rx.quantity}</span></TableCell>
                  <TableCell><span className="text-body-sm text-text-secondary">{rx.refills}</span></TableCell>
                  <TableCell><span className="text-caption text-text-muted">{rx.pharmacy}</span></TableCell>
                  <TableCell><span className="text-caption text-text-muted">{rx.prescribedDate}</span></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('text-caption font-semibold', STATUS_BADGE[rx.status] ?? 'border-border bg-surface-sunken text-text-muted')}>
                      {rx.status === 'active' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {rx.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {rx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showNewRx && (
        <NewRxDialog onClose={() => setShowNewRx(false)} onSubmit={handleNewRx} providerId={user?.id ?? ''} providerName={user?.name ?? ''} />
      )}
    </div>
  );
}

function NewRxDialog({ onClose, onSubmit, providerId, providerName }: { onClose: () => void; onSubmit: (rx: Prescription) => void; providerId: string; providerName: string; }) {
  const [patientId, setPatientId] = React.useState('');
  const [medName, setMedName] = React.useState('');
  const [strength, setStrength] = React.useState('');
  const [form, setForm] = React.useState('');
  const [sig, setSig] = React.useState('');
  const [quantity, setQuantity] = React.useState('30');
  const [refills, setRefills] = React.useState('3');
  const [pharmacy, setPharmacy] = React.useState(PHARMACIES[0]);
  const [notes, setNotes] = React.useState('');

  const selectedMed = MEDICATION_CATALOG.find((m) => m.name === medName);
  const selectedPatient = patients.find((p) => p.id === patientId);

  const handleSubmit = () => {
    if (!patientId || !medName || !strength || !sig) return;
    const rx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId,
      patientName: selectedPatient?.name ?? '',
      providerId,
      providerName,
      medication: medName,
      strength,
      form: form || selectedMed?.forms[0] || '',
      sig,
      quantity: parseInt(quantity) || 30,
      refills: parseInt(refills) || 0,
      pharmacy,
      status: 'pending',
      prescribedDate: new Date().toISOString().slice(0, 10),
      ndc: selectedMed?.ndc ?? '',
      notes: notes || undefined,
    };
    onSubmit(rx);
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-h4 text-text-primary">
            <Pill className="h-5 w-5 text-brand-primary" />
            New Prescription
          </DialogTitle>
          <DialogDescription className="text-body-sm text-text-muted">Create and send an e-prescription to the patient's pharmacy</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-body-sm text-text-primary">Patient *</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
              <SelectContent>
                {patients.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-body-sm text-text-primary">Medication *</Label>
            <Select value={medName} onValueChange={(v) => { setMedName(v); setStrength(''); setForm(''); }}>
              <SelectTrigger><SelectValue placeholder="Select medication" /></SelectTrigger>
              <SelectContent>
                {MEDICATION_CATALOG.map((m) => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {selectedMed && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-body-sm text-text-primary">Strength *</Label>
                <Select value={strength} onValueChange={setStrength}>
                  <SelectTrigger><SelectValue placeholder="Select strength" /></SelectTrigger>
                  <SelectContent>
                    {selectedMed.strengths.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-body-sm text-text-primary">Form</Label>
                <Select value={form} onValueChange={setForm}>
                  <SelectTrigger><SelectValue placeholder="Select form" /></SelectTrigger>
                  <SelectContent>
                    {selectedMed.forms.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-body-sm text-text-primary">Directions (Sig) *</Label>
            <Input value={sig} onChange={(e) => setSig(e.target.value)} placeholder="Take 1 tablet by mouth daily" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-body-sm text-text-primary">Quantity</Label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-body-sm text-text-primary">Refills</Label>
              <Input type="number" value={refills} onChange={(e) => setRefills(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-body-sm text-text-primary">Pharmacy</Label>
            <Select value={pharmacy} onValueChange={setPharmacy}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PHARMACIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-body-sm text-text-primary">Clinical Notes</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Start with 50mg, reassess in 4 weeks" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!patientId || !medName || !strength || !sig} className="gap-1.5">
            <Send className="h-4 w-4" />
            Send to Pharmacy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

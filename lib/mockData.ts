import mockJson from './mock-data.json';

/* ------------------------------------------------------------------ */
/*  Roles (practice-manager and clinical-supervisor removed)           */
/* ------------------------------------------------------------------ */

export type Role =
  | 'org-owner'
  | 'provider'
  | 'biller'
  | 'front-desk'
  | 'patient';

export const ROLE_LABELS: Record<Role, string> = {
  'org-owner': 'Org Owner / Admin',
  provider: 'Provider',
  biller: 'Biller',
  'front-desk': 'Front Desk',
  patient: 'Patient',
};

export const ROLE_ORDER: Role[] = [
  'org-owner',
  'provider',
  'biller',
  'front-desk',
  'patient',
];

/* ------------------------------------------------------------------ */
/*  Nav items                                                           */
/* ------------------------------------------------------------------ */

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  href?: string;
}

export const navByRole: Record<Role, NavItem[]> = {
  'org-owner': [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
    { id: 'financials', label: 'Financials', icon: 'BarChart3', href: '/financials' },
    { id: 'team', label: 'Team', icon: 'Users', href: '/team' },
    { id: 'providers', label: 'Providers', icon: 'Stethoscope', href: '/providers' },
    { id: 'billing-org', label: 'Billing', icon: 'CreditCard', href: '/billing-org' },
    { id: 'compliance', label: 'Compliance', icon: 'ShieldCheck', href: '/compliance' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
    { id: 'settings-org', label: 'Settings', icon: 'Settings', href: '/settings-org' },
  ],
  provider: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
    { id: 'schedule', label: 'My Schedule', icon: 'CalendarDays', href: '/schedule' },
    { id: 'patients', label: 'My Patients', icon: 'Users', href: '/patients' },
    { id: 'notes', label: 'Clinical Notes', icon: 'FileText', href: '/notes' },
    { id: 'treatment', label: 'Treatment Plans', icon: 'ClipboardPenLine', href: '/treatment' },
    { id: 'e-prescribe', label: 'e-Prescribe', icon: 'Pill', href: '/e-prescribe' },
    { id: 'tasks', label: 'Tasks', icon: 'ListTodo', badge: 4, href: '/tasks' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare', badge: 2, href: '/messages' },
  ],
  biller: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
    { id: 'charges', label: 'Charges', icon: 'Receipt', href: '/billing/charges' },
    { id: 'claims', label: 'Claims', icon: 'FileText', href: '/billing/claims' },
    { id: 'remittance', label: 'Remittance & Payout', icon: 'Wallet', href: '/billing/remittance' },
    { id: 'denials', label: 'Denials', icon: 'AlertTriangle', badge: 1, href: '/denials' },
    { id: 'eligibility', label: 'Eligibility', icon: 'BadgeCheck', href: '/eligibility' },
    { id: 'statements', label: 'Statements', icon: 'ReceiptText', href: '/statements' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
  ],
  'front-desk': [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
    { id: 'schedule', label: 'Schedule', icon: 'CalendarDays', href: '/schedule' },
    { id: 'check-in', label: 'Check-In', icon: 'UserCheck', href: '/check-in' },
    { id: 'patients', label: 'Patients', icon: 'Users', href: '/patients' },
    { id: 'intake', label: 'Intake', icon: 'ClipboardList', href: '/intake' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare', badge: 5, href: '/messages' },
  ],
  patient: [
    { id: 'portal', label: 'Home', icon: 'LayoutDashboard', href: '/portal' },
    { id: 'appointments', label: 'Appointments', icon: 'CalendarDays', href: '/portal/appointments' },
    { id: 'care-team', label: 'My Care Team', icon: 'Users', href: '/portal/care-team' },
    { id: 'documents', label: 'Documents', icon: 'FolderOpen', href: '/portal/documents' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare', href: '/portal/messages' },
    { id: 'billing-patient', label: 'Billing', icon: 'CreditCard', href: '/portal/billing' },
  ],
};

/* ------------------------------------------------------------------ */
/*  Organizations                                                      */
/* ------------------------------------------------------------------ */

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  plan: string;
  providerCount: number;
  practiceCount: number;
}

export const organizations: Organization[] = (mockJson as any).organizations;

/* ------------------------------------------------------------------ */
/*  Users                                                              */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  orgId: string;
  initials: string;
}

export const users: User[] = (mockJson as any).users;

/* ------------------------------------------------------------------ */
/*  Patients                                                           */
/* ------------------------------------------------------------------ */

export type PatientStatus = 'pre-admission' | 'admitted' | 'active' | 'discharged';

export type AdmissionStep =
  | 'demographics'
  | 'insurance'
  | 'eligibility'
  | 'intake-forms'
  | 'review'
  | 'admit';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  isMinor: boolean;
  guardianName?: string;
  payerId: string;
  memberId: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  groupNumber?: string;
  status?: PatientStatus;
  assignedProviderId?: string;
  admissionProgress?: AdmissionStep[];
  submittedFormIds?: string[];
  createdAt?: string;
}

export const patients: Patient[] = (mockJson as any).patients;

/* ------------------------------------------------------------------ */
/*  Team invites                                                       */
/* ------------------------------------------------------------------ */

export interface TeamInvite {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: 'pending' | 'accepted' | 'revoked';
  invitedAt: string;
}

export const teamInvites: TeamInvite[] = [
  { id: 'inv-001', email: 'jordan@harborline.org', name: 'Jordan Avery', role: 'provider', status: 'pending', invitedAt: '2026-07-10' },
  { id: 'inv-002', email: 'sam@harborline.org', name: 'Sam Patel', role: 'front-desk', status: 'pending', invitedAt: '2026-07-11' },
];

export function getPendingInvites(): TeamInvite[] {
  return teamInvites.filter((i) => i.status === 'pending');
}

/* ------------------------------------------------------------------ */
/*  Clinical notes (SOAP + transcript)                                 */
/* ------------------------------------------------------------------ */

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  sessionDate: string;
  sessionType: string;
  modality: string;
  status: 'draft' | 'signed' | 'co-signed' | 'amended';
  soap: SoapNote;
  transcript?: string;
}

export const clinicalNotes: ClinicalNote[] = (mockJson as any).clinicalNotes;

export function getNotesByPatient(patientId: string): ClinicalNote[] {
  return clinicalNotes.filter((n) => n.patientId === patientId);
}

export function getNotesByProvider(providerId: string): ClinicalNote[] {
  return clinicalNotes.filter((n) => n.providerId === providerId);
}

/* ------------------------------------------------------------------ */
/*  Prescriptions                                                      */
/* ------------------------------------------------------------------ */

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  medication: string;
  strength: string;
  form: string;
  sig: string;
  quantity: number;
  refills: number;
  pharmacy: string;
  status: 'active' | 'pending' | 'expired' | 'discontinued';
  prescribedDate: string;
  ndc: string;
  notes?: string;
}

export const prescriptions: Prescription[] = (mockJson as any).prescriptions;

export function getPrescriptionsByPatient(patientId: string): Prescription[] {
  return prescriptions.filter((p) => p.patientId === patientId);
}

/* ------------------------------------------------------------------ */
/*  Treatment plans                                                    */
/* ------------------------------------------------------------------ */

export interface TreatmentGoal {
  id: string;
  description: string;
  progress: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'met' | 'partially-met';
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  diagnosis: string;
  diagnosisDescription: string;
  startDate: string;
  reviewDate: string;
  status: 'active' | 'completed' | 'expired';
  frequency: string;
  modality: string;
  goals: TreatmentGoal[];
}

export const treatmentPlans: TreatmentPlan[] = (mockJson as any).treatmentPlans;

export function getPlansByPatient(patientId: string): TreatmentPlan[] {
  return treatmentPlans.filter((p) => p.patientId === patientId);
}

/* ------------------------------------------------------------------ */
/*  Tasks                                                              */
/* ------------------------------------------------------------------ */

export interface Task {
  id: string;
  title: string;
  description: string;
  patientId: string | null;
  patientName: string | null;
  assignedTo: string;
  assignedToName: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: 'clinical' | 'administrative' | 'billing' | 'compliance' | 'supervision';
}

export const tasks: Task[] = (mockJson as any).tasks;

export function getTasksByAssignee(userId: string): Task[] {
  return tasks.filter((t) => t.assignedTo === userId);
}

/* ------------------------------------------------------------------ */
/*  Payers (static)                                                    */
/* ------------------------------------------------------------------ */

export const PAYERS = [
  { id: 'payer-aetna', name: 'Aetna' },
  { id: 'payer-blueshield', name: 'Blue Shield of California' },
  { id: 'payer-cigna', name: 'Cigna' },
  { id: 'payer-medicaid', name: 'State Medicaid' },
  { id: 'payer-medicare', name: 'Medicare Part B' },
  { id: 'self-pay', name: 'Self-Pay / No Insurance' },
];

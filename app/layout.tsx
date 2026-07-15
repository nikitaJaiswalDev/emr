import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moonaria — Behavioral Health Platform',
  description: 'Behavioral health EHR and practice management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

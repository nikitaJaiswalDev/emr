"use client";

import { Users } from "lucide-react";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <Users className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-h1 font-bold text-text-primary">My Care Team</h1>
          <p className="text-body text-text-secondary">Your healthcare providers</p>
        </div>
      </div>
      <div className="mt-6 rounded-md border border-info/30 bg-info/5 p-4 text-body-sm text-text-secondary">
        This module is part of the Moonaria prototype. Interactive functionality will be added in a future iteration.
      </div>
    </div>
  );
}

"use client";

import { ProgressProvider } from "@/lib/progress";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}

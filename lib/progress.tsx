"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { MODULES } from "@/lib/data/mock-modules";

type ModuleProgress = {
  status: "not_started" | "in_progress" | "completed";
  stage: "watch" | "practice" | "checklist" | "quiz" | "done";
  quizScore?: number;
};

type ProgressMap = Record<string, ModuleProgress>;

type ProgressCtx = {
  progress: ProgressMap;
  updateProgress: (moduleId: string, update: Partial<ModuleProgress>) => void;
  resetProgress: () => void;
  reloadForWorker: () => void;
};

const ProgressContext = createContext<ProgressCtx | null>(null);

function getStorageKey(): string {
  try {
    const wid = localStorage.getItem("cw-worker");
    if (wid) return `cw-progress-${wid}`;
  } catch {}
  return "cw-progress";
}

function getDefaultProgress(): ProgressMap {
  const map: ProgressMap = {};
  for (const m of MODULES) {
    map[m.id] = { status: "not_started", stage: "watch" };
  }
  return map;
}

function loadProgress(): ProgressMap {
  const defaults = getDefaultProgress();
  try {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) return { ...defaults, ...JSON.parse(saved) };
  } catch {}
  return defaults;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(getDefaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const reloadForWorker = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  const updateProgress = useCallback((moduleId: string, update: Partial<ModuleProgress>) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        [moduleId]: { ...prev[moduleId], ...update },
      };
      try { localStorage.setItem(getStorageKey(), JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const defaults = getDefaultProgress();
    setProgress(defaults);
    try { localStorage.removeItem(getStorageKey()); } catch {}
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, resetProgress, reloadForWorker }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

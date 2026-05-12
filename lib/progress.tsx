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
};

const ProgressContext = createContext<ProgressCtx | null>(null);

const STORAGE_KEY = "cw-progress";

function getDefaultProgress(): ProgressMap {
  const map: ProgressMap = {};
  for (const m of MODULES) {
    if (m.status === "completed") {
      map[m.id] = { status: "completed", stage: "done" };
    } else if (m.status === "in_progress") {
      map[m.id] = { status: "in_progress", stage: "watch" };
    } else {
      map[m.id] = { status: "not_started", stage: "watch" };
    }
  }
  return map;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(getDefaultProgress);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch {}
  }, []);

  const updateProgress = useCallback((moduleId: string, update: Partial<ModuleProgress>) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        [moduleId]: { ...prev[moduleId], ...update },
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const defaults = getDefaultProgress();
    setProgress(defaults);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getModuleBySlug } from "@/lib/data/mock-modules";
import { useProgress } from "@/lib/progress";

export default function ChecklistPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();
  const { updateProgress } = useProgress();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const slug = params.slug as string;
  const m = getModuleBySlug(slug);
  if (!m || m.checklist.length === 0) {
    return <div className="p-8 text-center">No checklist available</div>;
  }

  const total = m.checklist.length;
  const doneCount = Object.values(checked).filter(Boolean).length;
  const allDone = doneCount === total;

  const handleQuiz = () => {
    updateProgress(m.id, { stage: "quiz" });
    router.push(`/modules/${slug}/quiz`);
  };

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: "#FAF7F2" }}>
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button
          onClick={() => router.push(`/modules/${slug}/practice`)}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-2"
        >
          <ChevronLeft size={18} /> {t("previous")}
        </button>
        <span className="text-sm font-bold text-brand">{doneCount}/{total}</span>
      </div>

      <div className="px-5">
        <h1 className="font-extrabold leading-tight font-display text-ink" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
          {t("checklist")}
        </h1>
        <p className="text-sm mt-1 text-ink-2">{t(m.titleKey)}</p>
      </div>

      <div className="px-5 mt-4 flex-1">
        <div className="space-y-2">
          {m.checklist.map((item) => {
            const isChecked = !!checked[item.key];
            return (
              <button
                key={item.key}
                onClick={() => setChecked({ ...checked, [item.key]: !isChecked })}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition active:scale-[0.98]"
                style={{
                  background: isChecked ? "#E6F4ED" : "#fff",
                  border: `1.5px solid ${isChecked ? "#2E8B57" : "#E7E2D8"}`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition"
                  style={{
                    background: isChecked ? "#2E8B57" : "transparent",
                    border: `2px solid ${isChecked ? "#2E8B57" : "#94A3B8"}`,
                  }}
                >
                  {isChecked && <Check size={16} color="#fff" strokeWidth={3} />}
                </div>
                <span
                  className="flex-1 text-sm font-medium text-ink"
                  style={{
                    textDecoration: isChecked ? "line-through" : "none",
                    opacity: isChecked ? 0.6 : 1,
                  }}
                >
                  {t(item.key)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pb-5 pt-3">
        <button
          onClick={handleQuiz}
          disabled={!allDone}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition font-display"
          style={{
            background: allDone ? "#4B8EC8" : "#E2E8F0",
            color: allDone ? "#fff" : "#94A3B8",
          }}
        >
          {t("startQuiz")}
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getModuleBySlug } from "@/lib/data/mock-modules";
import { ListenButton } from "@/components/worker/ListenButton";
import { useProgress } from "@/lib/progress";
import { getIcon } from "@/lib/icons";

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();
  const { updateProgress } = useProgress();
  const [idx, setIdx] = useState(0);

  const slug = params.slug as string;
  const m = getModuleBySlug(slug);
  if (!m || m.steps.length === 0) {
    return <div className="p-8 text-center">No practice steps available</div>;
  }

  const step = m.steps[idx];
  const total = m.steps.length;
  const StepIcon = getIcon(step.iconName);

  const goBack = () => {
    if (idx > 0) setIdx(idx - 1);
    else router.push(`/modules/${slug}`);
  };

  const goNext = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      updateProgress(m.id, { stage: "checklist" });
      router.push(`/modules/${slug}/checklist`);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: "#FAF7F2" }}>
      {/* Top bar */}
      <div className="px-5 pt-3 pb-3 flex items-center gap-3">
        <button
          onClick={() => router.push(`/modules/${slug}`)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}
        >
          <X size={18} color="#475467" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            {m.steps.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{ background: i <= idx ? "#4B8EC8" : "#E2E8F0" }}
              />
            ))}
          </div>
          <div className="text-[11px] font-semibold text-ink-3">
            {t("step")} {idx + 1} {t("of")} {total}
          </div>
        </div>
      </div>

      {/* Step card */}
      <div className="flex-1 px-5 pt-2 pb-4 flex flex-col">
        <div className="flex-1 rounded-3xl p-6 flex flex-col" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
          {/* Big number + visual */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-3xl font-display text-white bg-brand"
            >
              {step.id}
            </div>
            <div
              className="flex-1 aspect-square rounded-2xl flex items-center justify-center"
              style={{ background: step.iconBg, maxWidth: 120 }}
            >
              <StepIcon size={56} color="#1F2A3A" strokeWidth={1.6} />
            </div>
          </div>

          {/* Chip */}
          {step.chip && (
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: step.chip.color }}
              >
                {step.chip.label}
              </span>
            </div>
          )}

          {/* Title + body */}
          <h2 className="font-extrabold leading-tight mb-3 font-display text-ink" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
            {t(step.titleKey)}
          </h2>
          <p className="text-base leading-relaxed mb-5 text-ink-2">
            {t(step.bodyKey)}
          </p>

          {/* Audio */}
          <div className="mt-auto pt-4 border-t border-cw-line">
            <ListenButton
              text={`${t(step.titleKey)}. ${t(step.bodyKey)}`}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-5 pb-5 flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition active:scale-95"
          style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}
        >
          <ChevronLeft size={24} color="#1F2A3A" />
        </button>
        <button
          onClick={goNext}
          className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition active:scale-[0.98] font-display text-white bg-brand"
        >
          {idx === total - 1 ? t("iWillRemember") : t("nextStep")}
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

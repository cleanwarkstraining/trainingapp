"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ChevronLeft, ChevronRight, Clock, Eye, Hand, ListChecks,
  HelpCircle, Trophy, Check, AlertTriangle, FlaskConical,
  ShieldCheck, Play,
} from "lucide-react";
import { getModuleBySlug } from "@/lib/data/mock-modules";
import { ListenButton } from "@/components/worker/ListenButton";
import { InfoChip } from "@/components/worker/InfoChip";
import { ClothChip } from "@/components/worker/ClothChip";
import { useProgress } from "@/lib/progress";
import { getIcon } from "@/lib/icons";

const STAGE_META = [
  { key: "watch", iconComp: Eye },
  { key: "practice", iconComp: Hand },
  { key: "checklist", iconComp: ListChecks },
  { key: "quiz", iconComp: HelpCircle },
  { key: "done", iconComp: Trophy },
] as const;

export default function ModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();
  const { progress, updateProgress } = useProgress();

  const slug = params.slug as string;
  const m = getModuleBySlug(slug);
  if (!m) return <div className="p-8 text-center">Module not found</div>;

  const Icon = getIcon(m.iconName);
  const stage = progress[m.id]?.stage || "watch";

  const handleStageClick = (key: string) => {
    if (key === "practice") {
      updateProgress(m.id, { status: "in_progress", stage: "practice" });
      router.push(`/modules/${slug}/practice`);
    } else if (key === "checklist") {
      router.push(`/modules/${slug}/checklist`);
    } else if (key === "quiz") {
      router.push(`/modules/${slug}/quiz`);
    }
  };

  return (
    <div className="pb-8 min-h-dvh" style={{ background: "#FAF7F2" }}>
      <div className="px-5 pt-4">
        <button
          onClick={() => router.push("/modules")}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-2"
        >
          <ChevronLeft size={18} /> {t("previous")}
        </button>
      </div>

      {/* Title + meta */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}1A` }}>
            <Icon size={20} color={m.color} strokeWidth={2.2} />
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-3">
            <span className="flex items-center gap-1"><Clock size={11} /> {m.durationMin} {t("minutes")}</span>
            <span>•</span>
            <span>{m.steps.length} {t("step")}s</span>
          </div>
        </div>
        <h1 className="font-extrabold leading-tight font-display text-ink" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
          {t(m.titleKey)}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <ListenButton text={t(m.titleKey)} size="sm" />
        </div>
      </div>

      {/* Video placeholder */}
      <div className="px-5 mt-4">
        {m.videoUrl ? (
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={m.videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={t(m.titleKey)}
            />
          </div>
        ) : (
          <div
            className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              aspectRatio: "16/9",
              background: `linear-gradient(135deg, ${m.color} 0%, #1F2A3A 100%)`,
            }}
          >
            <button
              className="w-16 h-16 rounded-full flex items-center justify-center transition active:scale-90"
              style={{ background: "rgba(255,255,255,0.95)" }}
            >
              <Play size={26} color={m.color} fill={m.color} className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Quick info chips */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-2.5">
        <InfoChip icon={FlaskConical} label={t("chemicals")} value="R1 · 1:10" color="#4B8EC8" />
        <InfoChip icon={Hand} label={t("toolsNeeded")} value="3 cloths · pad" color="#F4A621" />
        <InfoChip icon={Clock} label={t("estTime")} value={`${m.durationMin} ${t("minutes")}`} color="#2E8B57" />
        <InfoChip icon={ShieldCheck} label={t("ppe")} value="Gloves · mask" color="#DC4136" />
      </div>

      {/* Cloth color reference */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl p-4" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-2.5 text-ink-3" style={{ letterSpacing: "0.08em" }}>
            {t("fmCloths")}
          </div>
          <div className="grid grid-cols-5 gap-2">
            <ClothChip color="#D9434A" label={t("qRed")} />
            <ClothChip color="#F4C842" label={t("qYellow")} />
            <ClothChip color="#3B82F6" label={t("qBlue")} />
            <ClothChip color="#5BA055" label={t("qGreen")} />
            <ClothChip color="#fff" label="—" border />
          </div>
        </div>
      </div>

      {/* Stage navigation */}
      <div className="px-5 mt-5">
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-ink-3" style={{ letterSpacing: "0.08em" }}>
          {t("trainingFlow")}
        </div>
        <div className="space-y-2">
          {STAGE_META.map((s, i) => {
            const isCurrent = s.key === stage;
            const stageIndex = STAGE_META.findIndex((x) => x.key === stage);
            const isDone = stageIndex > i;
            return (
              <button
                key={s.key}
                onClick={() => handleStageClick(s.key)}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition active:scale-[0.98] text-left"
                style={{
                  background: isCurrent ? `${m.color}1A` : "#fff",
                  border: `1.5px solid ${isCurrent ? m.color : "#E7E2D8"}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isDone ? "#2E8B57" : isCurrent ? m.color : "#F1F5F9",
                    color: isDone || isCurrent ? "#fff" : "#94A3B8",
                  }}
                >
                  {isDone ? <Check size={16} strokeWidth={3} /> : <s.iconComp size={16} strokeWidth={2.5} />}
                </div>
                <div className="flex-1 font-semibold text-sm text-ink">{t(s.key === "done" ? "done" : s.key)}</div>
                <ChevronRight size={18} color="#94A3B8" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Common mistake card */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl p-4 flex gap-3" style={{ background: "#FEF3C7", border: "1px solid #FCD34D" }}>
          <AlertTriangle size={20} color="#92400E" className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold mb-1" style={{ color: "#92400E" }}>{t("commonMistake")}</div>
            <div className="text-sm" style={{ color: "#78350F" }}>{t("mistake1")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

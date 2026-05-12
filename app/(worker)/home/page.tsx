"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Zap, BookOpen, ArrowRight, Bath, Sparkles,
  ShieldCheck, RotateCw,
} from "lucide-react";
import { MODULES } from "@/lib/data/mock-modules";
import { WORKERS } from "@/lib/data/mock-workers";
import { BottomNav } from "@/components/worker/BottomNav";
import { BadgeChip } from "@/components/worker/BadgeChip";
import { useProgress } from "@/lib/progress";
import { getIcon } from "@/lib/icons";

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations();
  const { progress } = useProgress();
  const [worker, setWorker] = useState(WORKERS[0]);

  useEffect(() => {
    const wid = localStorage.getItem("cw-worker");
    const found = WORKERS.find((w) => w.id === wid);
    if (found) setWorker(found);
  }, []);

  const completedCount = MODULES.filter(
    (m) => progress[m.id]?.status === "completed"
  ).length;
  const totalCount = MODULES.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  const inProg = MODULES.find((m) => progress[m.id]?.status === "in_progress") || MODULES[2];
  const InProgIcon = getIcon(inProg.iconName);

  return (
    <div className="pb-24" style={{ background: "#FAF7F2" }}>
      {/* Header gradient */}
      <div
        className="px-5 pt-3 pb-5"
        style={{
          background: "linear-gradient(135deg, #4B8EC8 0%, #2F6FA6 100%)",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg font-display"
              style={{ background: worker.color }}
            >
              {worker.initials}
            </div>
            <div>
              <div className="text-xs opacity-90">{t("hello")}</div>
              <div className="font-bold text-base leading-tight font-display">
                {worker.name}
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <Zap size={14} fill="#FFD700" color="#FFD700" />
            <span className="text-xs font-bold">7 {t("dayStreak")}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34" fill="none" stroke="#FFD700"
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 214} 214`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-xl text-white font-display">
              {pct}%
            </div>
          </div>
          <div className="text-white">
            <div className="text-xs opacity-90">{t("todayProgress")}</div>
            <div className="font-bold text-lg leading-tight font-display">
              {completedCount}/{totalCount} modules
            </div>
            <div className="text-xs opacity-90 mt-0.5">{t("keepLearning")}</div>
          </div>
        </div>
      </div>

      {/* Continue training card */}
      <div className="px-5 mt-5">
        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-ink-3" style={{ letterSpacing: "0.08em" }}>
          {t("continueModule")}
        </div>
        <button
          onClick={() => router.push(`/modules/${inProg.slug}`)}
          className="w-full rounded-2xl p-4 flex items-center gap-4 transition active:scale-[0.98] text-left"
          style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${inProg.color}1A` }}
          >
            <InProgIcon size={26} color={inProg.color} strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base leading-tight text-ink font-display">
              {t(inProg.titleKey)}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full bg-warm" style={{ width: "40%" }} />
              </div>
              <span className="text-xs font-semibold text-warm-dark">3/7</span>
            </div>
          </div>
          <ArrowRight size={20} color="#4B8EC8" strokeWidth={2.5} />
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => router.push("/field")}
          className="rounded-2xl p-4 text-left transition active:scale-95"
          style={{ background: "#1F2A3A", color: "#fff" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-warm">
            <Zap size={20} color="#fff" strokeWidth={2.5} fill="#fff" />
          </div>
          <div className="font-bold text-sm leading-tight font-display">{t("fieldMode")}</div>
          <div className="text-[11px] opacity-75 mt-0.5">{t("fieldModeSub")}</div>
        </button>
        <button
          onClick={() => router.push("/modules")}
          className="rounded-2xl p-4 text-left transition active:scale-95"
          style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#EEF2F7" }}>
            <BookOpen size={20} color="#4B8EC8" strokeWidth={2.2} />
          </div>
          <div className="font-bold text-sm leading-tight text-ink font-display">{t("allModules")}</div>
          <div className="text-[11px] mt-0.5 text-ink-3">{totalCount} {t("total")}</div>
        </button>
      </div>

      {/* Badges row */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-3" style={{ letterSpacing: "0.08em" }}>
            {t("badges")}
          </div>
          <span className="text-xs font-semibold text-brand">2 {t("earned")}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: "none" }}>
          <BadgeChip earned label={t("ppe")} icon={ShieldCheck} color="#2E8B57" />
          <BadgeChip earned label={t("clothCoding")} icon={Sparkles} color="#4B8EC8" />
          <BadgeChip label={t("bathroomStandard")} icon={Bath} color="#94A3B8" />
          <BadgeChip label={t("singleDisc")} icon={RotateCw} color="#94A3B8" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

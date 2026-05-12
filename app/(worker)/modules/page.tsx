"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Clock, CheckCircle2, Lock, ChevronRight } from "lucide-react";
import { MODULES } from "@/lib/data/mock-modules";
import { BottomNav } from "@/components/worker/BottomNav";
import { useProgress } from "@/lib/progress";
import { getIcon } from "@/lib/icons";

const CATEGORIES = [
  { id: "basics", labelKey: "catBasics" },
  { id: "rooms", labelKey: "catRooms" },
  { id: "machines", labelKey: "catMachines" },
  { id: "special", labelKey: "catSpecial" },
] as const;

export default function ModuleListPage() {
  const router = useRouter();
  const t = useTranslations();
  const { progress } = useProgress();

  return (
    <div className="px-5 pt-4 pb-24" style={{ background: "#FAF7F2" }}>
      <h1 className="font-extrabold mb-4 font-display text-ink" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
        {t("allModules")}
      </h1>

      {CATEGORIES.map((cat) => {
        const items = MODULES.filter((m) => m.category === cat.id);
        return (
          <div key={cat.id} className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider mb-2.5 text-ink-3" style={{ letterSpacing: "0.08em" }}>
              {t(cat.labelKey)}
            </div>
            <div className="space-y-2.5">
              {items.map((m) => {
                const status = progress[m.id]?.status === "completed"
                  ? "completed"
                  : progress[m.id]?.status === "in_progress"
                  ? "in_progress"
                  : m.status;
                const Icon = getIcon(m.iconName);

                return (
                  <button
                    key={m.id}
                    onClick={() => status !== "locked" && router.push(`/modules/${m.slug}`)}
                    disabled={status === "locked"}
                    className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-left transition active:scale-[0.98]"
                    style={{
                      background: "#fff",
                      border: "1.5px solid #E7E2D8",
                      opacity: status === "locked" ? 0.55 : 1,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${m.color}1A` }}
                    >
                      <Icon size={22} color={m.color} strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight text-ink">
                        {t(m.titleKey)}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-ink-3">
                        <Clock size={10} /> {m.durationMin} {t("minutes")}
                      </div>
                    </div>
                    {status === "completed" && (
                      <CheckCircle2 size={22} color="#2E8B57" fill="#E6F4ED" strokeWidth={2.2} />
                    )}
                    {status === "in_progress" && (
                      <div className="w-2 h-2 rounded-full bg-warm" />
                    )}
                    {status === "locked" && <Lock size={16} color="#94A3B8" />}
                    {status !== "locked" && status !== "completed" && status !== "in_progress" && (
                      <ChevronRight size={20} color="#94A3B8" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <BottomNav />
    </div>
  );
}

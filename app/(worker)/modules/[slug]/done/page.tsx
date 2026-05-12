"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bath, Star, Zap } from "lucide-react";
import { getModuleBySlug } from "@/lib/data/mock-modules";

export default function DonePage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();

  const slug = params.slug as string;
  const m = getModuleBySlug(slug);

  return (
    <div
      className="flex flex-col items-center justify-between px-6 py-10 min-h-dvh"
      style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #FFF7E6 100%)" }}
    >
      <div className="flex flex-col items-center text-center mt-6 flex-1">
        <div className="text-5xl mb-3">🎉</div>
        <div
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: "#C77F08", letterSpacing: "0.12em" }}
        >
          {t("youEarnedBadge")}
        </div>
        <h1
          className="font-extrabold leading-tight mb-1 font-display text-ink"
          style={{ fontSize: 30, letterSpacing: "-0.02em" }}
        >
          {t("quizPassed")}
        </h1>
        <p className="text-sm text-ink-2">{t("keepItUp")}</p>

        {/* Badge */}
        <div className="mt-8 relative">
          <div
            className="w-44 h-44 rounded-full flex items-center justify-center relative"
            style={{
              background: `radial-gradient(circle at 30% 30%, #4B8EC8 0%, #2F6FA6 100%)`,
              boxShadow: "0 20px 40px -10px rgba(75,142,200,0.4)",
            }}
          >
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{ background: "#fff", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <Bath size={64} color="#4B8EC8" strokeWidth={1.5} />
            </div>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-3 h-3"
                style={{
                  transform: `rotate(${deg}deg) translateY(-90px)`,
                  transformOrigin: "center",
                }}
              >
                <Star size={12} color="#F4A621" fill="#F4A621" />
              </div>
            ))}
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap text-white"
            style={{ background: "#F4A621", boxShadow: "0 4px 8px rgba(244,166,33,0.4)" }}
          >
            {m ? t("badgeBathroom") : t("done")}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 w-full">
          <div className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
            <div className="text-xs text-ink-3">{t("score")}</div>
            <div className="font-extrabold text-xl font-display text-ink">3/3</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
            <div className="text-xs text-ink-3">{t("time")}</div>
            <div className="font-extrabold text-xl font-display text-ink">11m</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
            <div className="text-xs text-ink-3">{t("dayStreak")}</div>
            <div className="font-extrabold text-xl flex items-center justify-center gap-0.5 font-display" style={{ color: "#C77F08" }}>
              7<Zap size={14} fill="#F4A621" color="#F4A621" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/home")}
        className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition active:scale-[0.98] font-display text-white bg-brand"
      >
        {t("backToHome")}
      </button>
    </div>
  );
}

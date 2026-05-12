"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ChevronLeft, Zap, Search, Play, FlaskConical,
  AlertTriangle, Sparkles, Bath, ChefHat, Droplets,
  ArrowRight,
} from "lucide-react";

function FieldCard({
  icon: Icon,
  label,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <button
      className="rounded-2xl p-4 text-left transition active:scale-95"
      style={{ background: "#1E293B", border: "1px solid #334155" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: color }}>
        <Icon size={20} color="#fff" strokeWidth={2.5} />
      </div>
      <div className="font-bold text-white text-sm leading-tight font-display">{label}</div>
      <div className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>{sub}</div>
    </button>
  );
}

export default function FieldModePage() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="flex flex-col pb-8 min-h-dvh" style={{ background: "#0F172A" }}>
      {/* Top */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={() => router.push("/home")}
            className="inline-flex items-center gap-1 text-sm font-medium opacity-80"
          >
            <ChevronLeft size={18} /> {t("previous")}
          </button>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(244,166,33,0.2)", color: "#F4A621" }}
          >
            <Zap size={10} fill="#F4A621" /> ON SITE
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-warm">
            <Zap size={24} color="#fff" fill="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              className="font-extrabold text-2xl text-white leading-tight font-display"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("fmTitle")}
            </div>
            <div className="text-xs" style={{ color: "#94A3B8" }}>
              {t("fmSub")}
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="mt-4 flex items-center gap-2 px-4 h-14 rounded-2xl"
          style={{ background: "#1E293B", border: "1.5px solid #334155" }}
        >
          <Search size={20} color="#94A3B8" />
          <input
            placeholder={t("fmSearch")}
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Quick action grid */}
      <div className="px-5 mt-2 grid grid-cols-2 gap-3">
        <FieldCard icon={Play} label={t("fmRefresh")} sub="Bathroom · Kitchen" color="#F4A621" />
        <FieldCard icon={FlaskConical} label={t("fmRatios")} sub="R1 R2 R3 R6" color="#4B8EC8" />
        <FieldCard icon={AlertTriangle} label={t("fmSafety")} sub="3 alerts" color="#DC4136" />
        <FieldCard icon={Sparkles} label={t("fmCloths")} sub="5 colors" color="#2E8B57" />
      </div>

      {/* Cloth code reference — always-visible */}
      <div className="px-5 mt-5">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-2.5"
          style={{ color: "#64748B", letterSpacing: "0.12em" }}
        >
          {t("fmCloths")}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { c: "#D9434A", l: t("qRed"), u: t("redCloth") },
            { c: "#F4C842", l: t("qYellow"), u: t("yellowCloth") },
            { c: "#3B82F6", l: t("qBlue"), u: t("blueCloth") },
            { c: "#5BA055", l: t("qGreen"), u: t("greenCloth") },
            { c: "#fff", l: "—", u: t("whiteCloth") },
          ].map((x, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-xl"
                style={{
                  background: x.c,
                  border: x.c === "#fff" ? "1.5px solid #475569" : "none",
                }}
              />
              <div className="text-[10px] font-bold text-white text-center leading-tight">
                {x.l}
              </div>
              <div className="text-[9px] text-center leading-tight" style={{ color: "#94A3B8" }}>
                {x.u}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent on site */}
      <div className="px-5 mt-6">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-2.5"
          style={{ color: "#64748B", letterSpacing: "0.12em" }}
        >
          {t("fmRecent")}
        </div>
        <div className="space-y-2">
          {[
            { ic: Bath, l: t("bathroomStandard"), time: "2m" },
            { ic: ChefHat, l: t("kitchenStandard"), time: "15m" },
            { ic: Droplets, l: t("descaling"), time: "1h" },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition active:scale-[0.98]"
              style={{ background: "#1E293B", border: "1px solid #334155" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "#0F172A" }}
              >
                <item.ic size={18} color="#F4A621" strokeWidth={2.2} />
              </div>
              <div className="flex-1 font-semibold text-sm text-white">{item.l}</div>
              <div className="text-xs" style={{ color: "#64748B" }}>{item.time}</div>
              <ArrowRight size={16} color="#94A3B8" />
            </button>
          ))}
        </div>
      </div>

      {/* QR scan button — stub for Phase 1 */}
      <div className="px-5 mt-6">
        <button
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition active:scale-[0.98] font-display text-white bg-warm"
        >
          {t("scanQR")}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Languages, Volume2, Settings, X, ChevronRight } from "lucide-react";
import { WORKERS } from "@/lib/data/mock-workers";
import { LANGS, LANG_META } from "@/lib/i18n/config";
import { BottomNav } from "@/components/worker/BottomNav";
import { Stat } from "@/components/worker/Stat";
import { speak, hasTTSSupport } from "@/lib/i18n/speech";
import { useProgress } from "@/lib/progress";
import { MODULES } from "@/lib/data/mock-modules";

function Row({
  icon: Icon,
  label,
  value,
  onClick,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 transition active:bg-slate-50 text-left"
      style={{ borderBottom: "1px solid #E7E2D8" }}
    >
      <Icon size={18} color={danger ? "#DC4136" : "#475467"} />
      <span className="flex-1 text-sm font-semibold" style={{ color: danger ? "#DC4136" : "#1F2A3A" }}>
        {label}
      </span>
      {value && <span className="text-xs text-ink-3">{value}</span>}
      {!danger && <ChevronRight size={16} color="#94A3B8" />}
    </button>
  );
}

function DebugStrip() {
  const locale = useLocale();
  const [cookieVal, setCookieVal] = useState("?");
  const [localStorageVal, setLocalStorageVal] = useState("?");
  const [pathname, setPathname] = useState("?");

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const langCookie = cookies.find((c) => c.startsWith("lang="));
    setCookieVal(langCookie ? langCookie.split("=")[1] : "(not set)");
    try { setLocalStorageVal(localStorage.getItem("cw-locale") || "(not set)"); }
    catch { setLocalStorageVal("(error)"); }
    setPathname(window.location.pathname);
  }, [locale]);

  return (
    <div style={{
      background: "#FEF3C7",
      border: "2px solid #F4A621",
      borderRadius: 8,
      padding: 12,
      margin: "12px 0",
      fontFamily: "monospace",
      fontSize: 11,
      lineHeight: 1.6,
      color: "#7A4A00",
    }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>DEBUG STRIP (remove after fix)</div>
      <div>useLocale(): <strong>{locale}</strong></div>
      <div>Cookie lang: <strong>{cookieVal}</strong></div>
      <div>localStorage cw-locale: <strong>{localStorageVal}</strong></div>
      <div>Path: <strong>{pathname}</strong></div>
    </div>
  );
}

export default function MePage() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const { progress } = useProgress();
  const [worker, setWorker] = useState(WORKERS[0]);
  const [showLangPicker, setShowLangPicker] = useState(false);

  useEffect(() => {
    const wid = localStorage.getItem("cw-worker");
    const found = WORKERS.find((w) => w.id === wid);
    if (found) setWorker(found);
  }, []);

  const switchLang = (lang: string) => {
    console.log("[LangSwitch] START", { from: currentLocale, to: lang });
    console.log("[LangSwitch] cookie before:", document.cookie);

    if (lang === currentLocale) {
      console.log("[LangSwitch] same locale, skipping");
      setShowLangPicker(false);
      return;
    }

    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `lang=${lang}; path=/; max-age=${oneYear}; SameSite=Lax`;

    console.log("[LangSwitch] cookie after write:", document.cookie);

    try { localStorage.setItem("cw-locale", lang); }
    catch (e) { console.error("[LangSwitch] localStorage error", e); }

    console.log("[LangSwitch] navigating to", window.location.pathname);
    window.location.assign(window.location.pathname);
  };

  const logout = () => {
    localStorage.removeItem("cw-worker");
    localStorage.removeItem("cw-locale");
    document.cookie = "lang=; path=/; max-age=0; SameSite=Lax";
    window.location.assign("/");
  };

  const testAudio = () => {
    if (hasTTSSupport(currentLocale)) {
      speak({ text: t("welcome"), lang: currentLocale });
    }
  };

  const langMeta = LANG_META[currentLocale as keyof typeof LANG_META];
  const completedCount = MODULES.filter((m) => progress[m.id]?.status === "completed").length;

  return (
    <div className="px-5 pt-5 pb-24 min-h-dvh" style={{ background: "#FAF7F2" }}>
      <DebugStrip />
      <div className="flex flex-col items-center text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-4xl mb-3 font-display"
          style={{ background: worker.color, color: "#fff" }}
        >
          {worker.initials}
        </div>
        <div className="font-extrabold text-2xl font-display text-ink">{worker.name}</div>
        <div className="text-sm text-ink-2">{worker.role}</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <Stat label={t("completed")} value={String(completedCount)} color="#2E8B57" />
        <Stat label={t("dayStreak")} value="7" color="#F4A621" />
        <Stat label={t("badges")} value={String(completedCount)} color="#4B8EC8" />
      </div>

      <div className="mt-6 rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
        <Row
          icon={Languages}
          label={t("chooseLang")}
          value={langMeta?.native || "English"}
          onClick={() => setShowLangPicker(true)}
        />
        <Row icon={Volume2} label={t("audioTest")} value={t("listen")} onClick={testAudio} />
        <Row icon={Settings} label={t("settings")} />
        <Row icon={X} label={t("logOut")} onClick={logout} danger />
      </div>

      <div className="mt-6 text-center text-xs text-ink-3">
        Clean Warks · v1.0 · {t("online")}
      </div>

      {/* Language picker modal */}
      {showLangPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-5 pb-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg font-display text-ink">{t("chooseLang")}</h2>
              <button onClick={() => setShowLangPicker(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F1F5F9" }}>
                <X size={16} color="#475467" />
              </button>
            </div>
            <div className="space-y-2">
              {LANGS.map((lang) => {
                const meta = LANG_META[lang];
                const isActive = lang === currentLocale;
                return (
                  <button
                    key={lang}
                    onClick={() => switchLang(lang)}
                    className="w-full flex items-center justify-between p-3 rounded-xl transition"
                    style={{
                      background: isActive ? "#468dcb1A" : "#fff",
                      border: `1.5px solid ${isActive ? "#468dcb" : "#E7E2D8"}`,
                    }}
                  >
                    <div>
                      <div className="font-bold text-sm text-ink">{meta.native}</div>
                      <div className="text-xs text-ink-3">{meta.name}</div>
                    </div>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#468dcb" }}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

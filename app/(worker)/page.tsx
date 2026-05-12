"use client";

import { useRouter } from "next/navigation";
import { Volume2, ChevronRight, Sparkles } from "lucide-react";
import { LANGS, LANG_META, FONT_CLASS_BY_LANG } from "@/lib/i18n/config";
import { speak, hasTTSSupport } from "@/lib/i18n/speech";

export default function LanguagePickerPage() {
  const router = useRouter();

  const pickLang = (lang: string) => {
    localStorage.setItem("cw-lang", lang);
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
    router.push("/login");
  };

  const playWelcome = (lang: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const meta = LANG_META[lang as keyof typeof LANG_META];
    if (!meta) return;
    const welcomeTexts: Record<string, string> = {
      en: "Welcome to Clean Warks",
      hi: "क्लीन वार्क्स में स्वागत है",
      ml: "ക്ലീൻ വാർക്സിലേക്ക് സ്വാഗതം",
      ta: "Welcome to Clean Warks",
      bn: "Welcome to Clean Warks",
      ne: "Welcome to Clean Warks",
      as: "Welcome to Clean Warks",
      or: "Welcome to Clean Warks",
    };
    const supported = hasTTSSupport(lang);
    if (!supported) return;
    speak({ text: welcomeTexts[lang] || welcomeTexts.en, lang });
  };

  return (
    <div className="px-6 pt-6 pb-8 min-h-dvh" style={{ background: "#FAF7F2" }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-brand">
          <Sparkles size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-base tracking-tight font-display text-ink">
          Clean Warks
        </span>
      </div>

      <h1 className="font-extrabold leading-[1.1] mt-6 font-display text-ink" style={{ fontSize: 32, letterSpacing: "-0.03em" }}>
        Welcome.<br />
        <span className="text-brand">स्वागत.</span>{" "}
        <span className="text-warm">സ്വാഗതം.</span>
      </h1>
      <p className="mt-3 text-sm text-ink-2">
        Choose your language to begin. You can change it anytime.
      </p>

      <div className="mt-7 grid gap-3">
        {LANGS.map((lang) => {
          const meta = LANG_META[lang];
          const fontClass = FONT_CLASS_BY_LANG[lang];
          const ttsAvailable = !["ml", "as", "or"].includes(lang);

          return (
            <button
              key={lang}
              onClick={() => pickLang(lang)}
              className="flex items-center justify-between w-full rounded-2xl px-5 py-4 transition active:scale-[0.98]"
              style={{
                background: "#fff",
                border: "1.5px solid #E7E2D8",
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
              }}
            >
              <div className="text-left">
                <div className={`font-bold text-lg leading-tight text-ink ${fontClass}`}>
                  {meta.native}
                </div>
                <div className="text-xs mt-0.5 text-ink-3">{meta.name}</div>
              </div>
              <div className="flex items-center gap-2">
                {ttsAvailable ? (
                  <span
                    onClick={(e) => playWelcome(lang, e)}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "#F1F5F9" }}
                  >
                    <Volume2 size={16} color="#475467" />
                  </span>
                ) : (
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-40"
                    style={{ background: "#F1F5F9" }}
                    title="Audio coming soon"
                  >
                    <Volume2 size={16} color="#94A3B8" />
                  </span>
                )}
                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-brand">
                  <ChevronRight size={20} color="#fff" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-8 rounded-2xl px-4 py-3 flex items-start gap-2"
        style={{ background: "#FFF7E6", border: "1px solid #FFE2A8" }}
      >
        <Volume2 size={16} color="#C77F08" className="mt-0.5 flex-shrink-0" />
        <p className="text-xs leading-relaxed" style={{ color: "#7A4A00" }}>
          Tap the speaker icon on any screen to listen in your language.
        </p>
      </div>
    </div>
  );
}

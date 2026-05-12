"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speak, stopSpeaking, hasTTSSupport } from "@/lib/i18n/speech";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  text: string;
  audioUrl?: string;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-14 px-5 text-base gap-2.5",
};

const ICON_SIZE = { sm: 14, md: 18, lg: 22 };

export function ListenButton({ text, audioUrl, size = "md" }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const [speaking, setSpeaking] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    if (!audioUrl && !hasTTSSupport(locale)) setUnsupported(true);
    return () => stopSpeaking();
  }, [locale, audioUrl]);

  const handleClick = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    try {
      await speak({ text, lang: locale, audioUrl });
    } finally {
      setSpeaking(false);
    }
  };

  if (unsupported) {
    return (
      <button
        disabled
        className={`inline-flex items-center rounded-full font-semibold opacity-50 ${SIZES[size]}`}
        style={{
          background: "#F1F5F9",
          color: "#94A3B8",
          border: "1.5px solid #E2E8F0",
        }}
      >
        <VolumeX size={ICON_SIZE[size]} />
        <span>{t("audioComingSoon")}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center rounded-full font-semibold transition active:scale-95 ${SIZES[size]}`}
      style={{
        background: speaking ? "#F4A621" : "#F1F5F9",
        color: speaking ? "#fff" : "#1F2A3A",
        border: `1.5px solid ${speaking ? "#F4A621" : "#E2E8F0"}`,
      }}
    >
      {speaking ? (
        <VolumeX size={ICON_SIZE[size]} />
      ) : (
        <Volume2 size={ICON_SIZE[size]} />
      )}
      <span>{speaking ? t("listening") : t("listen")}</span>
    </button>
  );
}

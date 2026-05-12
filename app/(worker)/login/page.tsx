"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, Lock } from "lucide-react";
import { WORKERS } from "@/lib/data/mock-workers";

export default function ProfilePickerPage() {
  const router = useRouter();
  const t = useTranslations();

  const pickWorker = (workerId: string) => {
    localStorage.setItem("cw-worker", workerId);
    router.push("/login/pin");
  };

  return (
    <div className="px-6 pt-4 pb-8 min-h-dvh" style={{ background: "#FAF7F2" }}>
      <button
        onClick={() => router.push("/")}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-ink-2"
      >
        <ChevronLeft size={18} /> {t("previous")}
      </button>

      <h1
        className="font-extrabold leading-tight font-display text-ink"
        style={{ fontSize: 26, letterSpacing: "-0.02em" }}
      >
        {t("tapYourFace")}
      </h1>
      <p className="mt-2 text-sm text-ink-2">{t("askSupervisor")}</p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {WORKERS.map((w) => (
          <button
            key={w.id}
            onClick={() => pickWorker(w.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl transition active:scale-95"
            style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl font-display"
              style={{ background: w.color, color: "#fff" }}
            >
              {w.initials}
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold leading-tight text-ink">{w.name}</div>
              <div className="text-[10px] mt-0.5 text-ink-3">{w.role}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-3">
        <Lock size={12} /> {t("secure")}
      </div>
    </div>
  );
}

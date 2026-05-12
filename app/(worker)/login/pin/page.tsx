"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { WORKERS } from "@/lib/data/mock-workers";

const CORRECT_PIN = "1234";

export default function PinPage() {
  const router = useRouter();
  const t = useTranslations();
  const [pin, setPin] = useState("");
  const [worker, setWorker] = useState(WORKERS[0]);

  useEffect(() => {
    const wid = localStorage.getItem("cw-worker");
    const found = WORKERS.find((w) => w.id === wid);
    if (found) setWorker(found);
  }, []);

  const wrong = pin.length === 4 && pin !== CORRECT_PIN;

  useEffect(() => {
    if (pin.length === 4 && pin === CORRECT_PIN) {
      const timer = setTimeout(() => router.push("/home"), 350);
      return () => clearTimeout(timer);
    }
  }, [pin, router]);

  const press = (n: string) => {
    if (pin.length < 4) setPin(pin + n);
  };
  const back = () => setPin(pin.slice(0, -1));

  return (
    <div className="px-6 pt-4 pb-8 flex flex-col min-h-dvh" style={{ background: "#FAF7F2" }}>
      <button
        onClick={() => router.push("/login")}
        className="mb-2 inline-flex items-center gap-1 text-sm font-medium self-start text-ink-2"
      >
        <ChevronLeft size={18} /> {t("previous")}
      </button>

      <div className="flex flex-col items-center mt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-3 font-display"
          style={{ background: worker.color, color: "#fff" }}
        >
          {worker.initials}
        </div>
        <div className="font-bold text-xl font-display text-ink">
          {t("hello")}, {worker.name}
        </div>
        <div className="text-sm mt-1 text-ink-2">{t("enterPin")}</div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-12 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition font-display"
            style={{
              background: "#fff",
              border: `2px solid ${wrong ? "#DC4136" : pin[i] ? "#4B8EC8" : "#E7E2D8"}`,
              color: "#1F2A3A",
            }}
          >
            {pin[i] ? "•" : ""}
          </div>
        ))}
      </div>

      {wrong && (
        <div className="text-center mt-3 text-sm font-semibold" style={{ color: "#DC4136" }}>
          {t("tryAgain")}
        </div>
      )}
      <div className="text-center mt-2 text-xs text-ink-3">
        {t("demoPin")}: <span className="font-mono font-bold">1234</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
          <button
            key={n}
            onClick={() => press(n)}
            className="h-16 rounded-2xl text-2xl font-bold transition active:scale-95 font-display"
            style={{ background: "#fff", color: "#1F2A3A", border: "1.5px solid #E7E2D8" }}
          >
            {n}
          </button>
        ))}
        <div />
        <button
          onClick={() => press("0")}
          className="h-16 rounded-2xl text-2xl font-bold transition active:scale-95 font-display"
          style={{ background: "#fff", color: "#1F2A3A", border: "1.5px solid #E7E2D8" }}
        >
          0
        </button>
        <button
          onClick={back}
          className="h-16 rounded-2xl flex items-center justify-center transition active:scale-95"
          style={{ background: "transparent", color: "#475467" }}
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
}

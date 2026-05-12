"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, CheckCircle2, AlertTriangle, Bath } from "lucide-react";
import { getModuleBySlug } from "@/lib/data/mock-modules";
import { ListenButton } from "@/components/worker/ListenButton";
import { useProgress } from "@/lib/progress";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();
  const { updateProgress } = useProgress();
  const [qIdx, setQIdx] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const slug = params.slug as string;
  const m = getModuleBySlug(slug);
  if (!m || m.quiz.length === 0) {
    return <div className="p-8 text-center">No quiz available</div>;
  }

  const question = m.quiz[qIdx];
  const totalQ = m.quiz.length;
  const isCorrect = pick === question.correctValue;

  const handleSubmit = () => {
    setSubmitted(true);
    if (isCorrect) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      setTimeout(() => {
        if (qIdx < totalQ - 1) {
          setQIdx(qIdx + 1);
          setPick(null);
          setSubmitted(false);
        } else {
          updateProgress(m.id, { status: "completed", stage: "done", quizScore: newCount });
          router.push(`/modules/${slug}/done`);
        }
      }, 1100);
    }
  };

  const handleRetry = () => {
    setPick(null);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: "#FAF7F2" }}>
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button
          onClick={() => router.push(`/modules/${slug}/checklist`)}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-2"
        >
          <ChevronLeft size={18} /> {t("previous")}
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full text-white bg-brand">
          {t("quizQuestion")} {qIdx + 1}/{totalQ}
        </span>
      </div>

      <div className="px-5 mt-2">
        <h1 className="font-extrabold leading-tight font-display text-ink" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
          {t(question.questionKey)}
        </h1>
        <div className="mt-3">
          <ListenButton text={t(question.questionKey)} size="sm" />
        </div>
      </div>

      {/* Visual context for Q1 */}
      {qIdx === 0 && (
        <div className="px-5 mt-5">
          <div className="rounded-2xl p-6 flex items-center justify-center" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
            <div className="relative">
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center" style={{ background: "#EEF4FA" }}>
                <Bath size={64} color="#4B8EC8" strokeWidth={1.5} />
              </div>
              <div
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: "#F4A621", border: "3px solid #fff" }}
              >
                ?
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3 flex-1">
        {question.options.map((o) => {
          const isPicked = pick === o.id;
          const isRight = submitted && o.id === question.correctValue;
          const isWrong = submitted && isPicked && o.id !== question.correctValue;

          return (
            <button
              key={o.id}
              onClick={() => !submitted && setPick(o.id)}
              className="rounded-2xl p-4 flex flex-col items-center gap-3 transition active:scale-95"
              style={{
                background: isRight ? "#E6F4ED" : isWrong ? "#FBEAE9" : "#fff",
                border: `2px solid ${isRight ? "#2E8B57" : isWrong ? "#DC4136" : isPicked ? "#4B8EC8" : "#E7E2D8"}`,
              }}
            >
              {o.color ? (
                <div
                  className="w-20 h-20 rounded-2xl"
                  style={{
                    background: o.color,
                    border: o.color === "#F4C842" ? "1.5px solid #E7E2D8" : "none",
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "#F1F5F9" }}>
                  <span className="text-2xl font-bold font-display text-ink">{t(o.labelKey).charAt(0)}</span>
                </div>
              )}
              <div className="font-bold text-sm font-display text-ink">{t(o.labelKey)}</div>
            </button>
          );
        })}
      </div>

      {/* Result + submit */}
      <div className="px-5 pb-5 pt-3">
        {submitted && isCorrect && (
          <div className="mb-3 rounded-2xl p-3 flex items-center gap-2" style={{ background: "#E6F4ED", border: "1.5px solid #2E8B57" }}>
            <CheckCircle2 size={20} color="#2E8B57" fill="#fff" />
            <span className="font-bold text-sm" style={{ color: "#2E8B57" }}>{t("correct")}</span>
          </div>
        )}
        {submitted && !isCorrect && (
          <div className="mb-3 rounded-2xl p-3 flex items-center gap-2" style={{ background: "#FBEAE9", border: "1.5px solid #DC4136" }}>
            <AlertTriangle size={20} color="#DC4136" />
            <span className="font-bold text-sm" style={{ color: "#DC4136" }}>{t("tryAgain")}</span>
          </div>
        )}
        <button
          onClick={() => submitted && !isCorrect ? handleRetry() : handleSubmit()}
          disabled={!pick}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition font-display"
          style={{
            background: !pick ? "#E2E8F0" : submitted && !isCorrect ? "#F4A621" : "#4B8EC8",
            color: !pick ? "#94A3B8" : "#fff",
          }}
        >
          {submitted && !isCorrect ? t("tryAgain") : t("submit")}
        </button>
      </div>
    </div>
  );
}

export const BCP47: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ml: "ml-IN",
  ta: "ta-IN",
  bn: "bn-IN",
  ne: "ne-NP",
  as: "as-IN",
  or: "or-IN",
};

const TTS_BLOCKLIST = new Set(["ml", "as", "or"]);

export function hasTTSSupport(lang: string): boolean {
  if (typeof window === "undefined") return false;
  if (TTS_BLOCKLIST.has(lang)) return false;
  if (!("speechSynthesis" in window)) return false;
  return true;
}

export async function speak(opts: {
  text: string;
  lang: string;
  audioUrl?: string;
}): Promise<void> {
  if (opts.audioUrl) {
    const audio = new Audio(opts.audioUrl);
    await audio.play();
    return new Promise<void>((resolve) => {
      audio.onended = () => resolve();
    });
  }

  if (!hasTTSSupport(opts.lang)) return;

  return new Promise<void>((resolve) => {
    const u = new SpeechSynthesisUtterance(opts.text);
    u.lang = BCP47[opts.lang] ?? "en-IN";
    u.rate = 0.92;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  });
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    speechSynthesis.cancel();
  }
}

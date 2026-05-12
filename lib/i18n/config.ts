export const LANGS = ["en", "hi", "ml", "ta", "bn", "ne", "as", "or"] as const;
export type LangCode = (typeof LANGS)[number];

export const LANG_META: Record<LangCode, { name: string; native: string; speech: string }> = {
  en: { name: "English", native: "English", speech: "en-IN" },
  hi: { name: "Hindi", native: "हिन्दी", speech: "hi-IN" },
  ml: { name: "Malayalam", native: "മലയാളം", speech: "ml-IN" },
  ta: { name: "Tamil", native: "தமிழ்", speech: "ta-IN" },
  bn: { name: "Bengali", native: "বাংলা", speech: "bn-IN" },
  ne: { name: "Nepali", native: "नेपाली", speech: "ne-NP" },
  as: { name: "Assamese", native: "অসমীয়া", speech: "as-IN" },
  or: { name: "Odia", native: "ଓଡ଼ିଆ", speech: "or-IN" },
};

export const BCP47_MAP: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ml: "ml-IN",
  ta: "ta-IN",
  bn: "bn-IN",
  ne: "ne-NP",
  as: "as-IN",
  or: "or-IN",
};

export const FONT_CLASS_BY_LANG: Record<LangCode, string> = {
  en: "font-body",
  hi: "font-hindi",
  ml: "font-malayalam",
  ta: "font-tamil",
  bn: "font-bengali",
  ne: "font-hindi",
  as: "font-bengali",
  or: "font-odia",
};

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import en from "./lib/i18n/messages/en.json";
import hi from "./lib/i18n/messages/hi.json";
import ml from "./lib/i18n/messages/ml.json";
import ta from "./lib/i18n/messages/ta.json";
import bn from "./lib/i18n/messages/bn.json";
import ne from "./lib/i18n/messages/ne.json";
import as_ from "./lib/i18n/messages/as.json";
import or_ from "./lib/i18n/messages/or.json";

const SUPPORTED_LOCALES = ["en", "hi", "ml", "ta", "bn", "ne", "as", "or"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const MESSAGE_MAP: Record<Locale, Record<string, string>> = {
  en,
  hi,
  ml,
  ta,
  bn,
  ne,
  as: as_,
  or: or_,
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("lang")?.value;
  const locale: Locale = SUPPORTED_LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : "en";

  // Merge English as base so missing keys fall back to English
  const messages = { ...en, ...MESSAGE_MAP[locale] };

  return { locale, messages };
});

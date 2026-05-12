import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "en";

  let messages;
  try {
    messages = (await import(`./lib/i18n/messages/${locale}.json`)).default;
  } catch {
    messages = (await import("./lib/i18n/messages/en.json")).default;
  }

  const enMessages = (await import("./lib/i18n/messages/en.json")).default;
  messages = { ...enMessages, ...messages };

  return { locale, messages };
});

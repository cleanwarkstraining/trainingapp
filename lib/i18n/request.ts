import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "en";

  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch {
    messages = (await import("./messages/en.json")).default;
  }

  const enMessages = (await import("./messages/en.json")).default;
  messages = { ...enMessages, ...messages };

  return { locale, messages };
});
